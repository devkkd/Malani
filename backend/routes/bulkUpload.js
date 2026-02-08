  import express from 'express';
import multer from 'multer';
import Papa from 'papaparse';
import Product from '../models/Product.js';
import Technique from '../models/Technique.js';
import Season from '../models/Season.js';
import { uploadToCloudflare } from './upload.js';

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Step 1: Bulk upload images to Cloudflare (OPTIONAL)
router.post('/images', upload.array('images', 100), async (req, res) => {
  try {
    // Allow empty image uploads
    if (!req.files || req.files.length === 0) {
      return res.json({ 
        success: true, 
        message: 'No images provided - you can upload CSV without images',
        data: {
          uploaded: [],
          failed: [],
          total: 0,
          successCount: 0,
          failedCount: 0
        }
      });
    }

    const imageMapping = [];
    const errors = [];

    // Upload each image to Cloudflare
    for (const file of req.files) {
      try {
        const result = await uploadToCloudflare(file.buffer, file.originalname);
        
        // Use Cloudflare's flexible variants for faster loading
        // Format: https://imagedelivery.net/{account_hash}/{image_id}/{variant}
        const baseUrl = result.url;
        const optimizedUrl = baseUrl.includes('imagedelivery.net') 
          ? `${baseUrl}/public` // Use 'public' variant for optimized delivery
          : baseUrl;
        
        imageMapping.push({
          filename: file.originalname,
          url: optimizedUrl,
          originalUrl: baseUrl,
          size: file.size
        });
      } catch (error) {
        errors.push({
          filename: file.originalname,
          error: error.message
        });
      }
    }

    res.json({
      success: true,
      message: `Uploaded ${imageMapping.length} images successfully`,
      data: {
        uploaded: imageMapping,
        failed: errors,
        total: req.files.length,
        successCount: imageMapping.length,
        failedCount: errors.length
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Step 2: Parse and validate CSV
router.post('/parse-csv', upload.single('csv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No CSV file provided' 
      });
    }

    const imageMapping = JSON.parse(req.body.imageMapping || '{}');
    const csvContent = req.file.buffer.toString('utf-8');

    // Parse CSV
    const parseResult = Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim()
    });

    if (parseResult.errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'CSV parsing errors',
        errors: parseResult.errors
      });
    }

    const products = [];
    const errors = [];

    // Helper function to auto-match images by model number
    const autoMatchImages = (modelNumber) => {
      if (!modelNumber) return [];
      
      const matched = [];
      const modelPrefix = modelNumber.toLowerCase();
      
      Object.keys(imageMapping).forEach(filename => {
        const filenameLower = filename.toLowerCase();
        // Match if filename starts with model number
        if (filenameLower.startsWith(modelPrefix) || 
            filenameLower.includes(modelPrefix)) {
          matched.push(filename);
        }
      });
      
      return matched.sort(); // Sort to maintain consistent order
    };

    // Validate and transform each row
    for (let i = 0; i < parseResult.data.length; i++) {
      const row = parseResult.data[i];
      const rowNumber = i + 2; // +2 because of header and 0-index

      try {
        // Validate required fields
        if (!row.name || !row.technique) {
          throw new Error('Missing required fields: name and technique');
        }

        // Process images - HYBRID APPROACH (OPTIONAL)
        let imageFilenames = [];
        let images = [];
        
        // Option 1: Manual - Check if images column exists and has data
        if (row.images && row.images.trim()) {
          imageFilenames = row.images.split(',').map(f => f.trim()).filter(f => f);
          
          // Check if it's a URL or filename
          images = imageFilenames.map((item, index) => {
            let imageUrl;
            
            // Check if it's already a full URL
            if (item.startsWith('http://') || item.startsWith('https://')) {
              imageUrl = item;
            } 
            // Check if it's in the uploaded image mapping
            else if (imageMapping[item]) {
              imageUrl = imageMapping[item];
            }
            // If not found in mapping and not a URL, throw error
            else if (Object.keys(imageMapping).length > 0) {
              throw new Error(`Image not found in uploaded images: ${item}`);
            }
            // No images were uploaded, skip this product
            else {
              return null;
            }
            
            return {
              url: imageUrl,
              alt: row.name,
              isPrimary: index === 0 // First image is primary
            };
          }).filter(img => img !== null);
        } 
        // Option 2: Auto-match - Use model number to find images
        else if (row.modelNumber && row.modelNumber.trim() && Object.keys(imageMapping).length > 0) {
          imageFilenames = autoMatchImages(row.modelNumber.trim());
          
          if (imageFilenames.length > 0) {
            images = imageFilenames.map((filename, index) => ({
              url: imageMapping[filename],
              alt: row.name,
              isPrimary: index === 0
            }));
          }
        }
        
        // Images are now optional - product can be created without images

        // Process sizes (comma separated)
        const sizes = row.sizes ? row.sizes.split(',').map(s => ({
          size: s.trim(),
          available: true
        })) : [];

        // Process features (comma separated)
        const features = row.features ? row.features.split(',').map(f => f.trim()) : [];

        // Process customization options (comma separated)
        const customizationOptions = row.customizationOptions ? 
          row.customizationOptions.split(',').map(o => o.trim()) : [];

        // Create product object
        const product = {
          name: row.name.trim(),
          slug: row.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          modelNumber: row.modelNumber?.trim() || undefined,
          brandName: row.brandName?.trim() || undefined,
          technique: row.technique.trim(), // Will be converted to ID later
          season: row.season?.trim() || undefined, // Will be converted to ID later (optional)
          images,
          sizes,
          specifications: {
            material: row.material?.trim() || undefined,
            fabric: row.fabric?.trim() || undefined,
            pattern: row.pattern?.trim() || undefined,
            style: row.style?.trim() || undefined,
            shape: row.shape?.trim() || undefined,
            use: row.use?.trim() || undefined,
            closureType: row.closureType?.trim() || undefined,
            colorTechnique: row.colorTechnique?.trim() || undefined,
            placeOfOrigin: row.placeOfOrigin?.trim() || undefined
          },
          features,
          customization: {
            available: row.customizationAvailable !== 'false' && row.customizationAvailable !== 'FALSE',
            options: customizationOptions
          },
          oemService: row.oemService || 'Available',
          description: row.description?.trim() || undefined,
          inStock: row.inStock !== 'false' && row.inStock !== 'FALSE',
          featured: row.featured === 'true' || row.featured === 'TRUE',
          active: true,
          rowNumber,
          imageCount: images.length,
          matchedBy: images.length === 0 ? 'none' : (row.images && row.images.trim() ? 'manual' : 'auto')
        };

        products.push(product);
      } catch (error) {
        errors.push({
          row: rowNumber,
          data: row,
          error: error.message
        });
      }
    }

    res.json({
      success: true,
      message: `Parsed ${products.length} products successfully`,
      data: {
        products,
        errors,
        total: parseResult.data.length,
        validCount: products.length,
        errorCount: errors.length
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Step 3: Create products in bulk
router.post('/create-products', async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No products provided'
      });
    }

    // Get all techniques and seasons for mapping
    const techniques = await Technique.find();
    const seasons = await Season.find();

    const techniqueMap = {};
    techniques.forEach(t => {
      techniqueMap[t.name.toLowerCase()] = t._id;
    });

    const seasonMap = {};
    seasons.forEach(s => {
      seasonMap[s.name.toLowerCase()] = s._id;
    });

    const created = [];
    const errors = [];

    // Create each product
    for (const productData of products) {
      try {
        // Map technique name to ID
        const techniqueName = productData.technique.toLowerCase();
        const techniqueId = techniqueMap[techniqueName];
        
        if (!techniqueId) {
          throw new Error(`Technique not found: ${productData.technique}`);
        }

        productData.technique = techniqueId;

        // Map season name to ID (optional)
        if (productData.season && productData.season.trim() !== '') {
          const seasonName = productData.season.toLowerCase().trim();
          const seasonId = seasonMap[seasonName];
          if (seasonId) {
            productData.season = seasonId;
          } else {
            delete productData.season; // Remove if not found
          }
        } else {
          // Remove empty season field
          delete productData.season;
        }

        // Remove rowNumber before saving
        delete productData.rowNumber;
        delete productData.imageCount;
        delete productData.matchedBy;

        // Clean up undefined values to prevent validation errors
        Object.keys(productData).forEach(key => {
          if (productData[key] === undefined || productData[key] === '') {
            delete productData[key];
          }
        });

        // Clean up specifications object
        if (productData.specifications) {
          Object.keys(productData.specifications).forEach(key => {
            if (productData.specifications[key] === undefined || productData.specifications[key] === '') {
              delete productData.specifications[key];
            }
          });
        }

        // Create product
        const product = await Product.create(productData);
        created.push({
          id: product._id,
          name: product.name,
          slug: product.slug
        });
      } catch (error) {
        errors.push({
          product: productData.name,
          row: productData.rowNumber,
          error: error.message
        });
      }
    }

    res.json({
      success: true,
      message: `Created ${created.length} products successfully`,
      data: {
        created,
        errors,
        total: products.length,
        successCount: created.length,
        errorCount: errors.length
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Download CSV template
router.get('/template', (req, res) => {
  const template = `name,modelNumber,brandName,technique,season,material,fabric,pattern,style,shape,use,closureType,colorTechnique,placeOfOrigin,description,images,sizes,features,customizationOptions,customizationAvailable,oemService,inStock,featured
"Handwoven Cotton Cushion Cover","MC-001","Malani","Block Printing","Summer","Cotton","100% Cotton","Floral","Traditional","Square","Home Decor","Zipper","Natural Dyes","Jaipur, India","Beautiful handwoven cushion cover with traditional block printing","MC-001-1.jpg,MC-001-2.jpg","12x12,16x16,18x18","Handmade,Eco-friendly,Washable","Color,Size,Design","TRUE","Available","TRUE","TRUE"
"Embroidered Silk Table Runner","MC-002","Malani","Hand Embroidery","Winter","Silk","Pure Silk","Geometric","Modern","Rectangle","Table Decor","","Hand Embroidery","Jaipur, India","Elegant silk table runner with intricate hand embroidery","MC-002-1.jpg,MC-002-2.jpg,MC-002-3.jpg","14x72,16x90","Handmade,Premium Quality","Color,Length","TRUE","Available","TRUE","FALSE"
"Cotton Throw Pillow","MC-003","Malani","Weaving","","Cotton","Cotton Blend","Plain","Casual","Square","Home","Zipper","Natural","India","Comfortable cotton throw pillow","","18x18,20x20","Soft,Durable","Color","TRUE","Available","TRUE","FALSE"`;

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=product-upload-template.csv');
  res.send(template);
});

export default router;

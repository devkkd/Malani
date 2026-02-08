import express from 'express';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { protect } from '../middleware/auth.js';
import crypto from 'crypto';

const router = express.Router();

// Initialize R2 Client
const getR2Client = () => {
  return new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
    },
  });
};

// Test Cloudflare R2 connection
router.get('/test-r2', protect, async (req, res) => {
  try {
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const r2AccessKey = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
    const r2SecretKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
    const r2Bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME;
    const r2PublicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;

    res.json({
      success: true,
      message: 'Cloudflare R2 credentials configured',
      config: {
        accountId: accountId ? 'Set ✓' : 'Missing ✗',
        r2AccessKey: r2AccessKey ? 'Set ✓' : 'Missing ✗',
        r2SecretKey: r2SecretKey ? 'Set ✓' : 'Missing ✗',
        r2Bucket: r2Bucket || 'Missing',
        r2PublicUrl: r2PublicUrl || 'Missing'
      }
    });

  } catch (error) {
    res.json({
      success: false,
      message: 'Configuration check failed',
      error: error.message
    });
  }
});

// Helper function to upload buffer to Cloudflare R2
export const uploadToCloudflare = async (buffer, originalFilename) => {
  const r2Bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME;
  const r2PublicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;

  if (!r2Bucket || !r2PublicUrl) {
    throw new Error('Cloudflare R2 not configured');
  }

  // Generate unique filename
  const imageId = crypto.randomBytes(16).toString('hex');
  const ext = originalFilename.split('.').pop() || 'jpg';
  const filename = `products/${imageId}.${ext}`;

  // Upload to R2 with optimized caching headers
  const r2Client = getR2Client();
  const uploadCommand = new PutObjectCommand({
    Bucket: r2Bucket,
    Key: filename,
    Body: buffer,
    ContentType: `image/${ext}`,
    CacheControl: 'public, max-age=31536000, immutable', // 1 year cache
    Metadata: {
      'original-name': originalFilename
    }
  });

  await r2Client.send(uploadCommand);

  // Construct public URL
  const imageUrl = `${r2PublicUrl}/${filename}`;

  return {
    id: imageId,
    url: imageUrl,
    filename: originalFilename
  };
};

// Upload image to Cloudflare R2
router.post('/image', protect, async (req, res) => {
  try {
    const { image } = req.body; // Base64 image data
    
    console.log('📤 Upload request received');
    
    if (!image) {
      console.log('❌ No image data provided');
      return res.status(400).json({ 
        success: false, 
        message: 'Image data is required' 
      });
    }

    // Check R2 credentials
    const r2Bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME;
    const r2PublicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;

    console.log('🔑 R2 Bucket:', r2Bucket ? 'Set ✓' : 'Missing ✗');
    console.log('🔑 R2 Public URL:', r2PublicUrl ? 'Set ✓' : 'Missing ✗');

    if (!r2Bucket || !r2PublicUrl) {
      console.log('❌ R2 credentials missing');
      return res.status(500).json({ 
        success: false, 
        message: 'Cloudflare R2 not configured. Please check .env file' 
      });
    }

    // Convert base64 to buffer
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    console.log('📦 Buffer size:', buffer.length, 'bytes');

    // Generate unique filename
    const imageId = crypto.randomBytes(16).toString('hex');
    const filename = `products/${imageId}.jpg`;

    console.log('☁️  Uploading to Cloudflare R2...');

    // Upload to R2 with optimized caching headers
    const r2Client = getR2Client();
    const uploadCommand = new PutObjectCommand({
      Bucket: r2Bucket,
      Key: filename,
      Body: buffer,
      ContentType: 'image/jpeg',
      CacheControl: 'public, max-age=31536000, immutable', // 1 year cache
    });

    await r2Client.send(uploadCommand);

    console.log('✅ Upload successful!');

    // Construct public URL
    const imageUrl = `${r2PublicUrl}/${filename}`;

    // Return the image URL
    res.json({
      success: true,
      data: {
        id: imageId,
        url: imageUrl,
        thumbnail: imageUrl // R2 doesn't auto-generate thumbnails, use same URL
      }
    });

  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during upload',
      error: error.message 
    });
  }
});

// Delete image from Cloudflare R2
router.delete('/image/:imageId', protect, async (req, res) => {
  try {
    const { imageId } = req.params;
    const r2Bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME;
    
    const filename = `products/${imageId}.jpg`;

    const r2Client = getR2Client();
    const deleteCommand = new DeleteObjectCommand({
      Bucket: r2Bucket,
      Key: filename,
    });

    await r2Client.send(deleteCommand);

    res.json({ success: true, message: 'Image deleted successfully' });

  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during deletion',
      error: error.message
    });
  }
});

export default router;

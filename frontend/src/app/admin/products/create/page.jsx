"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [techniques, setTechniques] = useState([]);
  const [seasons, setSeasons] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    modelNumber: '',
    brandName: 'Malani Impex Inc',
    technique: '',
    season: '',
    description: '',
    
    // Images
    images: [{ url: '', alt: '', isPrimary: true }],
    
    // Pricing Tiers
    pricingTiers: [
      { minQuantity: 100, maxQuantity: 299, pricePerUnit: 0, label: '' }
    ],
    
    // Sizes
    sizes: [
      { size: '', dimensions: '', available: true }
    ],
    
    // Specifications
    specifications: {
      material: '',
      fabric: '',
      pattern: '',
      style: '',
      shape: '',
      use: '',
      closureType: '',
      colorTechnique: '',
      placeOfOrigin: 'India'
    },
    
    // Features
    features: [''],
    
    // Customization
    customization: {
      available: true,
      options: [''],
      bulkOrdersWithDesign: true
    },
    
    // OEM Service
    oemService: 'Available',
    
    // Craft Details
    craftDetails: {
      process: '',
      technique: '',
      timeToCreate: '',
      artisanInfo: ''
    },
    
    // Status
    inStock: true,
    featured: false,
    active: true
  });

  useEffect(() => {
    fetchTechniquesAndSeasons();
  }, []);

  const fetchTechniquesAndSeasons = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const headers = { 'Authorization': `Bearer ${token}` };
      
      const [techRes, seasonRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/techniques`, { headers }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/seasons`, { headers })
      ]);

      const techData = await techRes.json();
      const seasonData = await seasonRes.json();

      if (techData.success) setTechniques(techData.data);
      if (seasonData.success) setSeasons(seasonData.data);
    } catch (error) {
      toast.error('Failed to load data');
    }
  };

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      
      // Clean up data
      const submitData = {
        ...formData,
        season: formData.season || null,
        features: formData.features.filter(f => f.trim()),
        customization: {
          ...formData.customization,
          options: formData.customization.options.filter(o => o.trim())
        }
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(submitData)
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Product created successfully!');
        router.push('/admin/products');
      } else {
        toast.error(data.message || 'Failed to create product');
        console.error('Error details:', data);
      }
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Helper functions for dynamic fields
  const addImage = () => {
    setFormData({
      ...formData,
      images: [...formData.images, { url: '', alt: '', isPrimary: false }]
    });
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const addPricingTier = () => {
    setFormData({
      ...formData,
      pricingTiers: [...formData.pricingTiers, { minQuantity: 0, maxQuantity: 0, pricePerUnit: 0, label: '' }]
    });
  };

  const removePricingTier = (index) => {
    setFormData({
      ...formData,
      pricingTiers: formData.pricingTiers.filter((_, i) => i !== index)
    });
  };

  const addSize = () => {
    setFormData({
      ...formData,
      sizes: [...formData.sizes, { size: '', dimensions: '', available: true }]
    });
  };

  const removeSize = (index) => {
    setFormData({
      ...formData,
      sizes: formData.sizes.filter((_, i) => i !== index)
    });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };

  const removeFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const addCustomizationOption = () => {
    setFormData({
      ...formData,
      customization: {
        ...formData.customization,
        options: [...formData.customization.options, '']
      }
    });
  };

  const removeCustomizationOption = (index) => {
    setFormData({
      ...formData,
      customization: {
        ...formData.customization,
        options: formData.customization.options.filter((_, i) => i !== index)
      }
    });
  };

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-[#666141] hover:text-[#555135] mb-4"
        >
          <ArrowLeft size={20} />
          Back to Products
        </Link>
        <h1 className="text-3xl font-normal text-[#666141] mb-2">Create New Product</h1>
        <p className="text-gray-600">Add a new product to your catalog</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({
                  ...formData,
                  name: e.target.value,
                  slug: generateSlug(e.target.value)
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                placeholder="e.g., Hand Block Printed Cotton Cushion Cover"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                placeholder="e.g., hand-block-printed-cotton-cushion-cover"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model Number
              </label>
              <input
                type="text"
                value={formData.modelNumber}
                onChange={(e) => setFormData({ ...formData, modelNumber: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                placeholder="e.g., HBCP-001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand Name
              </label>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technique * (Mandatory)
              </label>
              <select
                required
                value={formData.technique}
                onChange={(e) => setFormData({ ...formData, technique: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
              >
                <option value="">Select Technique</option>
                {techniques.map(tech => (
                  <option key={tech._id} value={tech._id}>{tech.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Season (Optional)
              </label>
              <select
                value={formData.season}
                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
              >
                <option value="">No Season</option>
                {seasons.map(season => (
                  <option key={season._id} value={season._id}>{season.name}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                placeholder="Detailed product description..."
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-gray-900">Product Images</h2>
            <button
              type="button"
              onClick={addImage}
              className="flex items-center gap-2 text-sm text-[#666141] hover:text-[#555135]"
            >
              <Plus size={16} />
              Add Image
            </button>
          </div>

          {formData.images.map((image, index) => (
            <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">
                  Image {index + 1} {image.isPrimary && <span className="text-[#666141]">(Primary)</span>}
                </h3>
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {/* Image Upload Component */}
                <ImageUpload
                  existingUrl={image.url}
                  onUploadComplete={(url) => {
                    const newImages = [...formData.images];
                    newImages[index].url = url;
                    setFormData({ ...formData, images: newImages });
                  }}
                />

                {/* Alt Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={image.alt}
                    onChange={(e) => {
                      const newImages = [...formData.images];
                      newImages[index].alt = e.target.value;
                      setFormData({ ...formData, images: newImages });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                    placeholder="Describe the image for accessibility"
                  />
                </div>

                {/* Primary Image Checkbox */}
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={image.isPrimary}
                    onChange={(e) => {
                      const newImages = formData.images.map((img, i) => ({
                        ...img,
                        isPrimary: i === index ? e.target.checked : false
                      }));
                      setFormData({ ...formData, images: newImages });
                    }}
                    className="w-4 h-4 text-[#666141] border-gray-300 rounded focus:ring-[#666141]"
                  />
                  <span className="text-sm text-gray-700">Set as Primary Image</span>
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Tiers */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-gray-900">B2B Pricing Tiers</h2>
            <button
              type="button"
              onClick={addPricingTier}
              className="flex items-center gap-2 text-sm text-[#666141] hover:text-[#555135]"
            >
              <Plus size={16} />
              Add Tier
            </button>
          </div>

          {formData.pricingTiers.map((tier, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
              <input
                type="number"
                value={tier.minQuantity}
                onChange={(e) => {
                  const newTiers = [...formData.pricingTiers];
                  newTiers[index].minQuantity = parseInt(e.target.value);
                  setFormData({ ...formData, pricingTiers: newTiers });
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                placeholder="Min Qty"
              />
              <input
                type="number"
                value={tier.maxQuantity}
                onChange={(e) => {
                  const newTiers = [...formData.pricingTiers];
                  newTiers[index].maxQuantity = parseInt(e.target.value);
                  setFormData({ ...formData, pricingTiers: newTiers });
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                placeholder="Max Qty"
              />
              <input
                type="number"
                value={tier.pricePerUnit}
                onChange={(e) => {
                  const newTiers = [...formData.pricingTiers];
                  newTiers[index].pricePerUnit = parseFloat(e.target.value);
                  setFormData({ ...formData, pricingTiers: newTiers });
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                placeholder="Price/Unit"
              />
              <input
                type="text"
                value={tier.label}
                onChange={(e) => {
                  const newTiers = [...formData.pricingTiers];
                  newTiers[index].label = e.target.value;
                  setFormData({ ...formData, pricingTiers: newTiers });
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                placeholder="Label"
              />
              {formData.pricingTiers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePricingTier(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Sizes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-gray-900">Available Sizes</h2>
            <button
              type="button"
              onClick={addSize}
              className="flex items-center gap-2 text-sm text-[#666141] hover:text-[#555135]"
            >
              <Plus size={16} />
              Add Size
            </button>
          </div>

          {formData.sizes.map((size, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
              <input
                type="text"
                value={size.size}
                onChange={(e) => {
                  const newSizes = [...formData.sizes];
                  newSizes[index].size = e.target.value;
                  setFormData({ ...formData, sizes: newSizes });
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                placeholder='e.g., 12" x 12"'
              />
              <input
                type="text"
                value={size.dimensions}
                onChange={(e) => {
                  const newSizes = [...formData.sizes];
                  newSizes[index].dimensions = e.target.value;
                  setFormData({ ...formData, sizes: newSizes });
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                placeholder="30cm x 30cm"
              />
              <label className="flex items-center gap-2 px-4">
                <input
                  type="checkbox"
                  checked={size.available}
                  onChange={(e) => {
                    const newSizes = [...formData.sizes];
                    newSizes[index].available = e.target.checked;
                    setFormData({ ...formData, sizes: newSizes });
                  }}
                  className="w-4 h-4 text-[#666141] border-gray-300 rounded focus:ring-[#666141]"
                />
                <span className="text-sm text-gray-700">Available</span>
              </label>
              {formData.sizes.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSize(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Specifications */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Product Specifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
              <input
                type="text"
                value={formData.specifications.material}
                onChange={(e) => setFormData({
                  ...formData,
                  specifications: { ...formData.specifications, material: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                placeholder="e.g., Cotton"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fabric</label>
              <input
                type="text"
                value={formData.specifications.fabric}
                onChange={(e) => setFormData({
                  ...formData,
                  specifications: { ...formData.specifications, fabric: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                placeholder="e.g., 100% Cotton"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pattern</label>
              <input
                type="text"
                value={formData.specifications.pattern}
                onChange={(e) => setFormData({
                  ...formData,
                  specifications: { ...formData.specifications, pattern: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                placeholder="e.g., Floral, Geometric"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
              <input
                type="text"
                value={formData.specifications.style}
                onChange={(e) => setFormData({
                  ...formData,
                  specifications: { ...formData.specifications, style: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                placeholder="e.g., Traditional, Modern"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Shape</label>
              <input
                type="text"
                value={formData.specifications.shape}
                onChange={(e) => setFormData({
                  ...formData,
                  specifications: { ...formData.specifications, shape: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                placeholder="e.g., Square, Rectangle"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Use</label>
              <input
                type="text"
                value={formData.specifications.use}
                onChange={(e) => setFormData({
                  ...formData,
                  specifications: { ...formData.specifications, use: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                placeholder="e.g., Home Decoration"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Closure Type</label>
              <input
                type="text"
                value={formData.specifications.closureType}
                onChange={(e) => setFormData({
                  ...formData,
                  specifications: { ...formData.specifications, closureType: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                placeholder="e.g., Zipper, Button"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color Technique</label>
              <input
                type="text"
                value={formData.specifications.colorTechnique}
                onChange={(e) => setFormData({
                  ...formData,
                  specifications: { ...formData.specifications, colorTechnique: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                placeholder="e.g., Natural Dyes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Place of Origin</label>
              <input
                type="text"
                value={formData.specifications.placeOfOrigin}
                onChange={(e) => setFormData({
                  ...formData,
                  specifications: { ...formData.specifications, placeOfOrigin: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-gray-900">Product Features</h2>
            <button
              type="button"
              onClick={addFeature}
              className="flex items-center gap-2 text-sm text-[#666141] hover:text-[#555135]"
            >
              <Plus size={16} />
              Add Feature
            </button>
          </div>

          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-2 mb-3">
              <input
                type="text"
                value={feature}
                onChange={(e) => {
                  const newFeatures = [...formData.features];
                  newFeatures[index] = e.target.value;
                  setFormData({ ...formData, features: newFeatures });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                placeholder="e.g., Eco-friendly, Handmade"
              />
              {formData.features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Customization Options */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Customization Options</h2>
          
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.customization.available}
                onChange={(e) => setFormData({
                  ...formData,
                  customization: { ...formData.customization, available: e.target.checked }
                })}
                className="w-4 h-4 text-[#666141] border-gray-300 rounded focus:ring-[#666141]"
              />
              <span className="text-sm text-gray-700">Customization Available</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.customization.bulkOrdersWithDesign}
                onChange={(e) => setFormData({
                  ...formData,
                  customization: { ...formData.customization, bulkOrdersWithDesign: e.target.checked }
                })}
                className="w-4 h-4 text-[#666141] border-gray-300 rounded focus:ring-[#666141]"
              />
              <span className="text-sm text-gray-700">Bulk Orders with Custom Design</span>
            </label>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Customization Options</label>
                <button
                  type="button"
                  onClick={addCustomizationOption}
                  className="text-sm text-[#666141] hover:text-[#555135]"
                >
                  <Plus size={16} className="inline" /> Add Option
                </button>
              </div>

              {formData.customization.options.map((option, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...formData.customization.options];
                      newOptions[index] = e.target.value;
                      setFormData({
                        ...formData,
                        customization: { ...formData.customization, options: newOptions }
                      });
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                    placeholder="e.g., Custom Size, Custom Color"
                  />
                  {formData.customization.options.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCustomizationOption(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Craft Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Craft Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Process</label>
              <input
                type="text"
                value={formData.craftDetails.process}
                onChange={(e) => setFormData({
                  ...formData,
                  craftDetails: { ...formData.craftDetails, process: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                placeholder="e.g., Hand Block Printing"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Technique</label>
              <input
                type="text"
                value={formData.craftDetails.technique}
                onChange={(e) => setFormData({
                  ...formData,
                  craftDetails: { ...formData.craftDetails, technique: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                placeholder="e.g., Traditional Wooden Blocks"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time to Create</label>
              <input
                type="text"
                value={formData.craftDetails.timeToCreate}
                onChange={(e) => setFormData({
                  ...formData,
                  craftDetails: { ...formData.craftDetails, timeToCreate: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                placeholder="e.g., 2-3 days"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Artisan Info</label>
              <input
                type="text"
                value={formData.craftDetails.artisanInfo}
                onChange={(e) => setFormData({
                  ...formData,
                  craftDetails: { ...formData.craftDetails, artisanInfo: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                placeholder="e.g., Made by skilled artisans"
              />
            </div>
          </div>
        </div>

        {/* OEM Service & Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Additional Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">OEM Service</label>
              <select
                value={formData.oemService}
                onChange={(e) => setFormData({ ...formData, oemService: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
              >
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
                <option value="Customizable">Customizable</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-4 h-4 text-[#666141] border-gray-300 rounded focus:ring-[#666141]"
                />
                <span className="text-sm text-gray-700">In Stock</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-[#666141] border-gray-300 rounded focus:ring-[#666141]"
                />
                <span className="text-sm text-gray-700">Featured Product</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 text-[#666141] border-gray-300 rounded focus:ring-[#666141]"
                />
                <span className="text-sm text-gray-700">Active</span>
              </label>
            </div>
          </div>
        </div>
        
        {/* Submit Buttons */}
        <div className="flex gap-4">
          <Link
            href="/admin/products"
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-[#666141] text-white rounded-lg hover:bg-[#555135] transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}

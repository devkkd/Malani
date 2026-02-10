"use client";
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageUpload from '@/components/admin/ImageUpload';

export default function SeasonsPage() {
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingSeason, setEditingSeason] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    title: '',
    subtitle: '',
    description: '',
    homeImage: { url: '', alt: '' },
    iconImage: { url: '', alt: '' },
    icon: '', // Deprecated but keeping for backward compatibility
    features: [
      { heading: 'Premium Materials', items: [''] },
      { heading: 'Featured Techniques', items: [''] },
      { heading: 'Signature Color Palette', items: [''] },
      { heading: 'Perfect For', items: [''] }
    ],
    displayOrder: 0,
    active: true
  });

  useEffect(() => {
    fetchSeasons();
  }, []);

  const fetchSeasons = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seasons`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setSeasons(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch seasons');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    console.log('📤 Submitting form data:', formData);
    
    try {
      const url = editingSeason 
        ? `${process.env.NEXT_PUBLIC_API_URL}/seasons/${editingSeason._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/seasons`;
      
      const response = await fetch(url, {
        method: editingSeason ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log('📥 Server response:', data);
      
      if (data.success) {
        toast.success(editingSeason ? 'Season updated!' : 'Season created!');
        setShowModal(false);
        resetForm();
        fetchSeasons();
      } else {
        toast.error(data.message || 'Operation failed');
      }
    } catch (error) {
      console.error('❌ Submit error:', error);
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this season?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seasons/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Season deleted!');
        fetchSeasons();
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleEdit = (season) => {
    setEditingSeason(season);
    console.log('📝 Editing season:', season);
    
    setFormData({
      name: season.name,
      slug: season.slug,
      title: season.title || '',
      subtitle: season.subtitle || '',
      description: season.description || '',
      homeImage: season.homeImage || { url: '', alt: '' },
      iconImage: season.iconImage || { url: '', alt: '' },
      icon: season.icon || '',
      features: season.features?.length > 0 ? season.features : [
        { heading: 'Premium Materials', items: [''] },
        { heading: 'Featured Techniques', items: [''] },
        { heading: 'Signature Color Palette', items: [''] },
        { heading: 'Perfect For', items: [''] }
      ],
      displayOrder: season.displayOrder,
      active: season.active
    });
    
    console.log('📋 Form data set with images:', {
      homeImage: season.homeImage || { url: '', alt: '' },
      iconImage: season.iconImage || { url: '', alt: '' }
    });
    
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ 
      name: '', 
      slug: '', 
      title: '',
      subtitle: '',
      description: '',
      homeImage: { url: '', alt: '' },
      iconImage: { url: '', alt: '' },
      icon: '',
      features: [
        { heading: 'Premium Materials', items: [''] },
        { heading: 'Featured Techniques', items: [''] },
        { heading: 'Signature Color Palette', items: [''] },
        { heading: 'Perfect For', items: [''] }
      ],
      displayOrder: 0, 
      active: true 
    });
    setEditingSeason(null);
  };

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const filteredSeasons = seasons.filter(season =>
    season?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#666141] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-normal text-[#666141] mb-2">Seasons Management</h1>
          <p className="text-gray-600">Manage seasonal collections</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center gap-2 bg-[#666141] text-white px-6 py-3 rounded-lg hover:bg-[#555135] transition-colors"
        >
          <Plus size={20} />
          Add Season
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search seasons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Seasons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSeasons.map((season) => (
          <div
            key={season._id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            {/* Images Preview */}
            {(season.homeImage?.url || season.iconImage?.url) && (
              <div className="mb-4 flex gap-2">
                {season.homeImage?.url && (
                  <div className="relative w-20 h-20 rounded overflow-hidden border border-gray-200">
                    <img 
                      src={season.homeImage.url} 
                      alt="Home" 
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] text-center py-0.5">
                      Home
                    </span>
                  </div>
                )}
                {season.iconImage?.url && (
                  <div className="relative w-20 h-20 rounded overflow-hidden border border-gray-200">
                    <img 
                      src={season.iconImage.url} 
                      alt="Icon" 
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] text-center py-0.5">
                      Icon
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-medium text-gray-900 mb-1">{season.name}</h3>
                <p className="text-sm text-gray-500">/{season.slug}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                season.active 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {season.active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="mb-4 pb-4 border-b border-gray-100">
              <p className="text-sm text-gray-600">
                Display Order: <span className="font-medium text-gray-900">{season.displayOrder}</span>
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(season)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#E9E4B5] text-[#666141] rounded-lg hover:bg-[#d9d4a5] transition-colors"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(season._id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSeasons.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No seasons found</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 overflow-y-auto">
          <div className="min-h-screen w-full flex items-start justify-center p-4 py-8">
            <div className="bg-white rounded-lg max-w-4xl w-full shadow-2xl">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-white rounded-t-lg">
                <h2 className="text-2xl font-medium text-[#666141]">
                  {editingSeason ? 'Edit Season' : 'Add New Season'}
                </h2>
              </div>

              {/* Scrollable Content */}
              <div className="px-6 py-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                <form id="season-form" onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Season Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ 
                            ...formData, 
                            name: e.target.value,
                            slug: generateSlug(e.target.value)
                          });
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                        placeholder="e.g., Summer Collection"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                        placeholder="e.g., summer"
                      />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                        placeholder="e.g., Summer Collection"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                        placeholder="e.g., Light & Breezy"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                      placeholder="Detailed description..."
                    />
                  </div>

                  {/* Icon Upload */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Season Images</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Home Image */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Home Page Image *
                        </label>
                        <p className="text-xs text-gray-500 mb-2">This image will be displayed on the home page</p>
                        <ImageUpload
                          existingUrl={formData.homeImage?.url || ''}
                          onUploadComplete={(url) => {
                            console.log('🖼️ Home image uploaded:', url);
                            setFormData({ 
                              ...formData, 
                              homeImage: { 
                                url: url, 
                                alt: formData.homeImage?.alt || '' 
                              } 
                            });
                          }}
                        />
                        <input
                          type="text"
                          value={formData.homeImage?.alt || ''}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            homeImage: { 
                              url: formData.homeImage?.url || '', 
                              alt: e.target.value 
                            } 
                          })}
                          className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                          placeholder="Image alt text"
                        />
                      </div>

                      {/* Icon Image */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Icon Image
                        </label>
                        <p className="text-xs text-gray-500 mb-2">This icon will be used in other places</p>
                        <ImageUpload
                          existingUrl={formData.iconImage?.url || ''}
                          onUploadComplete={(url) => {
                            console.log('🎯 Icon image uploaded:', url);
                            setFormData({ 
                              ...formData, 
                              iconImage: { 
                                url: url, 
                                alt: formData.iconImage?.alt || '' 
                              } 
                            });
                          }}
                        />
                        <input
                          type="text"
                          value={formData.iconImage?.alt || ''}
                          onChange={(e) => setFormData({ 
                            ...formData, 
                            iconImage: { 
                              url: formData.iconImage?.url || '', 
                              alt: e.target.value 
                            } 
                          })}
                          className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                          placeholder="Icon alt text"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Features Section */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Season Features</h3>
                    <div className="space-y-6">
                      {formData.features.map((feature, featureIdx) => (
                        <div key={featureIdx} className="bg-gray-50 p-4 rounded-lg">
                          <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {feature.heading}
                            </label>
                          </div>
                          <div className="space-y-2">
                            {feature.items.map((item, itemIdx) => (
                              <div key={itemIdx} className="flex gap-2">
                                <input
                                  type="text"
                                  value={item}
                                  onChange={(e) => {
                                    const newFeatures = [...formData.features];
                                    newFeatures[featureIdx].items[itemIdx] = e.target.value;
                                    setFormData({ ...formData, features: newFeatures });
                                  }}
                                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                                  placeholder={`Item ${itemIdx + 1}`}
                                />
                                {feature.items.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newFeatures = [...formData.features];
                                      newFeatures[featureIdx].items = newFeatures[featureIdx].items.filter((_, i) => i !== itemIdx);
                                      setFormData({ ...formData, features: newFeatures });
                                    }}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                  >
                                    <X size={20} />
                                  </button>
                                )}
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => {
                                const newFeatures = [...formData.features];
                                newFeatures[featureIdx].items.push('');
                                setFormData({ ...formData, features: newFeatures });
                              }}
                              className="text-sm text-[#666141] hover:text-[#555135] flex items-center gap-1"
                            >
                              <Plus size={16} />
                              Add Item
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Display Order & Active */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Display Order
                      </label>
                      <input
                        type="number"
                        value={formData.displayOrder}
                        onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                      />
                    </div>

                    <div className="flex items-end">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="active"
                          checked={formData.active}
                          onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                          className="w-4 h-4 text-[#666141] border-gray-300 rounded focus:ring-[#666141]"
                        />
                        <label htmlFor="active" className="text-sm font-medium text-gray-700">
                          Active
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => { setShowModal(false); resetForm(); }}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-[#666141] text-white rounded-lg hover:bg-[#555135] transition-colors"
                    >
                      {editingSeason ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

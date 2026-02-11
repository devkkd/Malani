"use client";
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';
import toast from 'react-hot-toast';
import ImageUpload from '@/components/admin/ImageUpload';

export default function TechniquesPage() {
  const [techniques, setTechniques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTechnique, setEditingTechnique] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    title: '',
    description: '',
    meticulousProcess: [''],
    timeInvestment: '',
    masterArtisans: '',
    images: [{ url: '', alt: '' }, { url: '', alt: '' }],
    displayOrder: 0,
    active: true
  });

  useEffect(() => {
    fetchTechniques();
  }, []);

  const fetchTechniques = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/techniques`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setTechniques(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch techniques');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    try {
      // Clean up empty process steps
      const cleanedData = {
        ...formData,
        meticulousProcess: formData.meticulousProcess.filter(step => step && step.trim()),
        images: formData.images.filter(img => img.url) // Only send images with URLs
      };

      const url = editingTechnique 
        ? `${process.env.NEXT_PUBLIC_API_URL}/techniques/${editingTechnique._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/techniques`;
      
      const response = await fetch(url, {
        method: editingTechnique ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cleanedData)
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success(editingTechnique ? 'Technique updated!' : 'Technique created!');
        setShowModal(false);
        resetForm();
        fetchTechniques();
      } else {
        console.error('❌ Error:', data);
        toast.error(data.message || 'Operation failed');
      }
    } catch (error) {
      console.error('❌ Submit error:', error);
      toast.error('Something went wrong: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this technique?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/techniques/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Technique deleted!');
        fetchTechniques();
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleEdit = (technique) => {
    setEditingTechnique(technique);
    setFormData({
      name: technique.name,
      slug: technique.slug,
      title: technique.title || '',
      description: technique.description || '',
      meticulousProcess: technique.meticulousProcess?.length > 0 ? technique.meticulousProcess : [''],
      timeInvestment: technique.timeInvestment || '',
      masterArtisans: technique.masterArtisans || '',
      images: technique.images?.length > 0 ? technique.images : [{ url: '', alt: '' }, { url: '', alt: '' }],
      displayOrder: technique.displayOrder,
      active: technique.active
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ 
      name: '', 
      slug: '', 
      title: '',
      description: '',
      meticulousProcess: [''],
      timeInvestment: '',
      masterArtisans: '',
      images: [{ url: '', alt: '' }, { url: '', alt: '' }],
      displayOrder: 0, 
      active: true 
    });
    setEditingTechnique(null);
  };

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const addProcessStep = () => {
    setFormData({
      ...formData,
      meticulousProcess: [...formData.meticulousProcess, '']
    });
  };

  const removeProcessStep = (index) => {
    setFormData({
      ...formData,
      meticulousProcess: formData.meticulousProcess.filter((_, i) => i !== index)
    });
  };

  const updateProcessStep = (index, value) => {
    const newProcess = [...formData.meticulousProcess];
    newProcess[index] = value;
    setFormData({ ...formData, meticulousProcess: newProcess });
  };

  const filteredTechniques = techniques.filter(tech =>
    tech?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#666141] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 ">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-normal text-[#666141] mb-2">Techniques Management</h1>
          <p className="text-gray-600">Manage weaving and printing techniques</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center gap-2 bg-[#666141] text-white px-6 py-3 rounded-lg hover:bg-[#555135] transition-colors"
        >
          <Plus size={20} />
          Add Technique
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search techniques..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Techniques Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTechniques.map((technique) => (
          <div
            key={technique._id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-medium text-gray-900 mb-1">{technique.name}</h3>
                <p className="text-sm text-gray-500">/{technique.slug}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                technique.active 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {technique.active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="mb-4 pb-4 border-b border-gray-100">
              <p className="text-sm text-gray-600">
                Display Order: <span className="font-medium text-gray-900">{technique.displayOrder}</span>
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(technique)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#E9E4B5] text-[#666141] rounded-lg hover:bg-[#d9d4a5] transition-colors"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(technique._id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTechniques.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No techniques found</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 overflow-y-auto">
          <div className="min-h-screen w-full flex items-start justify-center p-4 py-8">
            <div className="bg-white rounded-lg max-w-4xl w-full shadow-2xl">
              {/* Header - Fixed */}
              <div className="px-6 py-4 border-b border-gray-200 bg-white rounded-t-lg">
                <h2 className="text-2xl font-medium text-[#666141]">
                  {editingTechnique ? 'Edit Technique' : 'Add New Technique'}
                </h2>
              </div>

              {/* Scrollable Content */}
              <div className="px-6 py-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                <form id="technique-form" onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Technique Name *
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
                    placeholder="e.g., Hand Block Printed"
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
                    placeholder="e.g., hand-block-printed"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                  placeholder="e.g., Traditional Hand Block Printing"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                  placeholder="Detailed description of the technique..."
                />
              </div>

              {/* Meticulous Process */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Meticulous Process Steps
                  </label>
                  <button
                    type="button"
                    onClick={addProcessStep}
                    className="text-sm text-[#666141] hover:text-[#555135] flex items-center gap-1"
                  >
                    <Plus size={16} />
                    Add Step
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.meticulousProcess.map((step, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={step}
                        onChange={(e) => updateProcessStep(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                        placeholder={`Step ${index + 1}`}
                      />
                      {formData.meticulousProcess.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeProcessStep(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <X size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Investment & Master Artisans */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Investment
                  </label>
                  <input
                    type="text"
                    value={formData.timeInvestment}
                    onChange={(e) => setFormData({ ...formData, timeInvestment: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                    placeholder="e.g., 2-3 days per piece"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Master Artisans
                  </label>
                  <input
                    type="text"
                    value={formData.masterArtisans}
                    onChange={(e) => setFormData({ ...formData, masterArtisans: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                    placeholder="e.g., 50+ skilled artisans"
                  />
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Images (2 images)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="space-y-2">
                      <p className="text-sm text-gray-600">Image {index + 1}</p>
                      <ImageUpload
                        existingUrl={image.url}
                        onUploadComplete={(url) => {
                          const newImages = [...formData.images];
                          newImages[index].url = url;
                          setFormData({ ...formData, images: newImages });
                        }}
                      />
                      <input
                        type="text"
                        value={image.alt}
                        onChange={(e) => {
                          const newImages = [...formData.images];
                          newImages[index].alt = e.target.value;
                          setFormData({ ...formData, images: newImages });
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#666141] focus:border-transparent outline-none"
                        placeholder="Alt text"
                      />
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
                  {editingTechnique ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
              </div>

              {/* Footer with Buttons - Fixed */}
              {/* <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); resetForm(); }}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    form="technique-form"
                    className="flex-1 px-4 py-3 bg-[#666141] text-white rounded-lg hover:bg-[#555135] transition-colors font-medium"
                  >
                    {editingTechnique ? 'Update Technique' : 'Create Technique'}
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { useState, useRef } from 'react';
import { Upload, X, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function ImageUpload({ onUploadComplete, existingUrl = null }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(existingUrl);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size must be less than 10MB');
      return;
    }

    setUploading(true);

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        const base64Image = reader.result;
        
        // Show preview immediately
        setPreview(base64Image);

        // Upload to Cloudflare
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ image: base64Image })
        });

        const data = await response.json();

        if (data.success) {
          toast.success('Image uploaded successfully!');
          setPreview(data.data.url);
          onUploadComplete(data.data.url);
        } else {
          toast.error(data.message || 'Upload failed');
          setPreview(null);
        }
      };

      reader.onerror = () => {
        toast.error('Failed to read file');
        setUploading(false);
      };

    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onUploadComplete('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      {!preview && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#666141] transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />
          
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex flex-col items-center justify-center space-y-2 text-gray-600 hover:text-[#666141] transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader className="animate-spin" size={40} />
                <span className="text-sm">Uploading...</span>
              </>
            ) : (
              <>
                <Upload size={40} />
                <span className="text-sm font-medium">Click to upload image</span>
                <span className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative border border-gray-200 rounded-lg p-4">
          <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
          
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X size={16} />
          </button>

          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
              <Loader className="animate-spin text-white" size={32} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

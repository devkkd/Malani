"use client";
import { useState } from 'react';
import { Upload, Download, FileText, CheckCircle, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function BulkUploadPage() {
  const [imageFiles, setImageFiles] = useState([]);
  const [imageMapping, setImageMapping] = useState({});
  const [uploadingImages, setUploadingImages] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [parsedProducts, setParsedProducts] = useState([]);
  const [parsingCsv, setParsingCsv] = useState(false);
  const [creatingProducts, setCreatingProducts] = useState(false);
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Handle image selection
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  // Upload images to Cloudflare (OPTIONAL)
  const handleUploadImages = async () => {
    setUploadingImages(true);
    const formData = new FormData();
    
    if (imageFiles.length > 0) {
      imageFiles.forEach(file => {
        formData.append('images', file);
      });
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/bulk-upload/images`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        const mapping = {};
        response.data.data.uploaded.forEach(img => {
          mapping[img.filename] = img.url;
        });
        setImageMapping(mapping);
        
        if (response.data.data.successCount > 0) {
          toast.success(`${response.data.data.successCount} images uploaded!`);
        } else {
          toast.success('Ready to upload CSV (no images)');
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload images');
    } finally {
      setUploadingImages(false);
    }
  };

  // Handle CSV selection
  const handleCsvSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
    } else {
      toast.error('Please select a valid CSV file');
    }
  };

  // Parse and create products in one step
  const handleUploadCsv = async () => {
    if (!csvFile) {
      toast.error('Please select a CSV file first');
      return;
    }

    setParsingCsv(true);
    const formData = new FormData();
    formData.append('csv', csvFile);
    formData.append('imageMapping', JSON.stringify(imageMapping));

    try {
      const token = localStorage.getItem('adminToken');
      
      // Step 1: Parse CSV
      const parseResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/bulk-upload/parse-csv`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (parseResponse.data.success) {
        const products = parseResponse.data.data.products;
        setParsedProducts(products);
        
        if (parseResponse.data.data.errors.length > 0) {
          toast.error(`${parseResponse.data.data.errorCount} rows had errors`);
        }
        
        // Step 2: Create products immediately
        setCreatingProducts(true);
        const createResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/bulk-upload/create-products`,
          { products },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (createResponse.data.success) {
          setResults(createResponse.data.data);
          toast.success(`${createResponse.data.data.successCount} products created!`);
          setShowResults(true);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to process CSV');
    } finally {
      setParsingCsv(false);
      setCreatingProducts(false);
    }
  };

  // Download CSV template
  const handleDownloadTemplate = () => {
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/bulk-upload/template`, '_blank');
  };

  // Reset flow
  const handleReset = () => {
    setImageFiles([]);
    setImageMapping({});
    setCsvFile(null);
    setParsedProducts([]);
    setResults(null);
    setShowResults(false);
  };

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-normal text-[#666141] mb-2">Bulk Product Upload</h1>
        <p className="text-gray-600">Upload multiple products using CSV file</p>
      </div>

      {!showResults ? (
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Step 1: Images (Optional) */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#666141] text-white flex items-center justify-center font-medium">
                1
              </div>
              <div>
                <h2 className="text-xl font-medium text-[#666141]">Upload Images (Optional)</h2>
                <p className="text-sm text-gray-600">Upload product images or skip to upload CSV only</p>
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#666141] transition-colors mb-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload size={40} className="mx-auto text-gray-400 mb-3" />
                <p className="text-gray-600 mb-1">Click to select images</p>
                <p className="text-xs text-gray-400">JPG, PNG, WebP (Max 50MB total)</p>
              </label>
            </div>

            {imageFiles.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Selected: {imageFiles.length} images
                </p>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2 max-h-40 overflow-y-auto">
                  {imageFiles.map((file, index) => (
                    <div key={index} className="border border-gray-200 rounded p-1">
                      <div className="aspect-square bg-gray-100 rounded overflow-hidden">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleUploadImages}
              disabled={uploadingImages}
              className="w-full bg-[#666141] text-white py-2.5 rounded-lg hover:bg-[#535036] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {uploadingImages ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={18} />
                  {imageFiles.length > 0 ? 'Upload Images' : 'Upload Images'}
                </>
              )}
            </button>

            {Object.keys(imageMapping).length > 0 && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} className="text-green-600" />
                    <p className="text-sm text-green-800 font-medium">
                      {Object.keys(imageMapping).length} images uploaded successfully
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const allUrls = Object.values(imageMapping).join('\n');
                      navigator.clipboard.writeText(allUrls);
                      toast.success('All URLs copied!');
                    }}
                    className="px-3 py-1.5 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Copy All URLs
                  </button>
                </div>
                
                {/* Image URLs List with Copy */}
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {Object.entries(imageMapping).map(([filename, url], index) => (
                    <div key={index} className="bg-white rounded border border-green-200 p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 mb-1 truncate">
                            📷 {filename}
                          </p>
                          <p className="text-xs text-gray-500 break-all font-mono bg-gray-50 p-1.5 rounded">
                            {url}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(url);
                            toast.success('URL copied!');
                          }}
                          className="flex-shrink-0 px-3 py-1.5 text-xs bg-[#666141] text-white rounded hover:bg-[#535036] transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 p-2.5 bg-blue-50 rounded border border-blue-200">
                  <p className="text-xs text-blue-700">
                    💡 <strong>3 Ways to use:</strong>
                  </p>
                  <ul className="text-xs text-blue-600 mt-1 ml-4 space-y-0.5">
                    <li>• Use filename in CSV: <code className="bg-blue-100 px-1 rounded">MC-001-1.jpg</code></li>
                    <li>• Copy & paste URL directly in CSV</li>
                    <li>• Leave empty for auto-match by model number</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: CSV Upload */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#666141] text-white flex items-center justify-center font-medium">
                2
              </div>
              <div>
                <h2 className="text-xl font-medium text-[#666141]">Upload CSV File</h2>
                <p className="text-sm text-gray-600">Upload your product data CSV</p>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 text-sm">
              <p className="text-blue-800 font-medium mb-2">📋 How to fill CSV:</p>
              <ul className="text-blue-700 space-y-1.5 ml-4 list-disc">
                <li><strong>Required:</strong> name, technique</li>
                <li><strong>Season:</strong> Summer, Winter, Spring, Autumn (optional)</li>
                <li><strong>Images:</strong> Use filenames (MC-001-1.jpg,MC-001-2.jpg) or URLs or leave empty</li>
                <li><strong>Multiple values:</strong> Separate with comma (,)</li>
                <li><strong>Boolean:</strong> TRUE or FALSE</li>
              </ul>
            </div>

            <button
              onClick={handleDownloadTemplate}
              className="w-full mb-4 border-2 border-[#666141] text-[#666141] py-2.5 rounded-lg hover:bg-[#666141] hover:text-white transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Download CSV Template
            </button>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#666141] transition-colors mb-4">
              <input
                type="file"
                accept=".csv"
                onChange={handleCsvSelect}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload" className="cursor-pointer">
                <FileText size={40} className="mx-auto text-gray-400 mb-3" />
                <p className="text-gray-600 mb-1">Click to select CSV file</p>
                <p className="text-xs text-gray-400">Only CSV files supported</p>
              </label>
            </div>

            {csvFile && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                <p className="text-sm font-medium text-gray-700">Selected:</p>
                <p className="text-sm text-gray-600">{csvFile.name}</p>
              </div>
            )}

            <button
              onClick={handleUploadCsv}
              disabled={parsingCsv || creatingProducts || !csvFile}
              className="w-full bg-[#666141] text-white py-2.5 rounded-lg hover:bg-[#535036] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {parsingCsv || creatingProducts ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  {parsingCsv ? 'Processing...' : 'Creating Products...'}
                </>
              ) : (
                <>
                  <Upload size={18} />
                  Upload & Create Products
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Results */
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center mb-6">
              <CheckCircle size={56} className="mx-auto text-green-600 mb-3" />
              <h2 className="text-2xl font-medium text-[#666141] mb-2">Upload Complete!</h2>
              <p className="text-gray-600">Products have been created</p>
            </div>

            {/* Results Summary */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Total</p>
                <p className="text-3xl font-semibold text-gray-900">{results.total}</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-sm text-green-600 mb-1">Success</p>
                <p className="text-3xl font-semibold text-green-600">{results.successCount}</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p className="text-sm text-red-600 mb-1">Failed</p>
                <p className="text-3xl font-semibold text-red-600">{results.errorCount}</p>
              </div>
            </div>

            {/* Error Details */}
            {results.errors.length > 0 && (
              <div className="border border-red-200 rounded-lg overflow-hidden mb-6">
                <div className="bg-red-50 px-4 py-2 border-b border-red-200">
                  <p className="text-sm text-red-800 font-medium">Errors ({results.errors.length})</p>
                </div>
                <div className="max-h-40 overflow-y-auto">
                  {results.errors.map((error, index) => (
                    <div key={index} className="px-4 py-2 border-b border-gray-200 last:border-0">
                      <p className="text-sm font-medium text-gray-900">{error.product}</p>
                      <p className="text-xs text-red-600">{error.error}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="flex-1 bg-[#666141] text-white py-2.5 rounded-lg hover:bg-[#535036] transition-colors font-medium"
              >
                Upload More Products
              </button>
              <button
                onClick={() => window.location.href = '/admin/products'}
                className="flex-1 border border-[#666141] text-[#666141] py-2.5 rounded-lg hover:bg-[#666141] hover:text-white transition-colors font-medium"
              >
                View Products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

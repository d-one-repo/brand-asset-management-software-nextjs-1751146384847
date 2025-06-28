import { useState, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Upload, Image as ImageIcon, FileText, Package } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
export default function UploadModal({ isOpen, onClose }) {
  const [files, setFiles] = useState([]);
  const [assetType, setAssetType] = useState('image');
  const [assetName, setAssetName] = useState('');
  const [collection, setCollection] = useState('');
  const [tags, setTags] = useState('');
  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
    if (acceptedFiles.length > 0 && !assetName) {
      setAssetName(acceptedFiles[0].name.split('.')[0]);
    }
  }, [assetName]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.svg'],
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the upload
    console.log({
      files,
      assetType,
      assetName,
      collection,
      tags: tags.split(',').map(tag => tag.trim())
    });
    // Reset form and close modal
    setFiles([]);
    setAssetName('');
    setCollection('');
    setTags('');
    onClose();
  };
  return (
    <Transition show={isOpen} as="div">
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              <div className="flex justify-between items-center">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Upload Asset
                </Dialog.Title>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="mt-4">
                <div 
                  {...getRootProps()} 
                  className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
                    isDragActive ? 'border-brand-primary bg-brand-primary bg-opacity-10' : 'border-gray-300'
                  }`}
                >
                  <div className="space-y-1 text-center">
                    <input {...getInputProps()} />
                    {files.length > 0 ? (
                      <div className="space-y-2">
                        {files.map(file => (
                          <div key={file.name} className="flex items-center space-x-2">
                            {file.type.startsWith('image/') ? (
                              <img src={file.preview} alt={file.name} className="h-16 w-16 object-cover rounded" />
                            ) : (
                              <div className="h-16 w-16 flex items-center justify-center bg-gray-100 rounded">
                                <FileText className="h-8 w-8 text-gray-400" />
                              </div>
                            )}
                            <div className="flex-1 text-left">
                              <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="text-sm text-brand-primary hover:text-brand-accent"
                          onClick={() => setFiles([])}
                        >
                          Remove and upload different file
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-1 text-sm text-gray-600">
                          <span className="font-medium text-brand-primary hover:text-brand-accent">
                            Click to upload
                          </span>{' '}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF, SVG, PDF up to 10MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="asset-type" className="block text-sm font-medium text-gray-700">
                      Asset Type
                    </label>
                    <div className="mt-1 flex space-x-2">
                      <button
                        type="button"
                        onClick={() => setAssetType('image')}
                        className={`flex-1 flex items-center justify-center px-3 py-2 border rounded-md text-sm ${
                          assetType === 'image' 
                            ? 'border-brand-primary text-brand-primary bg-brand-primary bg-opacity-10' 
                            : 'border-gray-300 text-gray-700'
                        }`}
                      >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Image
                      </button>
                      <button
                        type="button"
                        onClick={() => setAssetType('logo')}
                        className={`flex-1 flex items-center justify-center px-3 py-2 border rounded-md text-sm ${
                          assetType === 'logo' 
                            ? 'border-brand-primary text-brand-primary bg-brand-primary bg-opacity-10' 
                            : 'border-gray-300 text-gray-700'
                        }`}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Logo
                      </button>
                      <button
                        type="button"
                        onClick={() => setAssetType('template')}
                        className={`flex-1 flex items-center justify-center px-3 py-2 border rounded-md text-sm ${
                          assetType === 'template' 
                            ? 'border-brand-primary text-brand-primary bg-brand-primary bg-opacity-10' 
                            : 'border-gray-300 text-gray-700'
                        }`}
                      >
                        <Package className="h-4 w-4 mr-2" />
                        Template
                      </button>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="asset-name" className="block text-sm font-medium text-gray-700">
                      Asset Name
                    </label>
                    <input
                      type="text"
                      id="asset-name"
                      value={assetName}
                      onChange={(e) => setAssetName(e.target.value)}
                      className="mt-1 input"
                      placeholder="Enter asset name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="collection" className="block text-sm font-medium text-gray-700">
                      Collection
                    </label>
                    <select
                      id="collection"
                      value={collection}
                      onChange={(e) => setCollection(e.target.value)}
                      className="mt-1 input"
                    >
                      <option value="">Select a collection</option>
                      <option value="product-photos">Product Photos</option>
                      <option value="marketing-assets">Marketing Assets</option>
                      <option value="brand-logos">Brand Logos</option>
                      <option value="social-media">Social Media</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                      Tags
                    </label>
                    <input
                      type="text"
                      id="tags"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="mt-1 input"
                      placeholder="Enter tags separated by commas"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={files.length === 0 || !assetName}
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
import { useState } from 'react';
import { Download, Star, MoreVertical, Share2, Trash2, Edit, Clock } from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { format } from 'date-fns';
export default function AssetCard({ asset }) {
  const [isFavorite, setIsFavorite] = useState(asset.isFavorite);
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <div className="card group">
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden bg-gray-200">
          <img 
            src={asset.thumbnail} 
            alt={asset.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="absolute top-2 right-2 flex space-x-1">
          <button 
            onClick={toggleFavorite}
            className="p-1 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-yellow-500 transition-colors"
          >
            <Star className={`h-4 w-4 ${isFavorite ? 'fill-yellow-500 text-yellow-500' : ''}`} />
          </button>
          <Menu as="div" className="relative">
            <Menu.Button className="p-1 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-brand-primary transition-colors">
              <MoreVertical className="h-4 w-4" />
            </Menu.Button>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                      >
                        <Edit className="mr-3 h-4 w-4" />
                        Edit
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                      >
                        <Share2 className="mr-3 h-4 w-4" />
                        Share
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } flex w-full items-center px-4 py-2 text-sm text-red-600`}
                      >
                        <Trash2 className="mr-3 h-4 w-4" />
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-900 truncate">{asset.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{asset.type} • {asset.fileSize}</p>
          </div>
          <button className="p-1 rounded-full hover:bg-gray-100 text-gray-700">
            <Download className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={asset.updatedBy.avatar} 
              alt={asset.updatedBy.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="ml-2 text-xs text-gray-500">{asset.updatedBy.name}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            <span>{format(new Date(asset.updatedAt), 'MMM d')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
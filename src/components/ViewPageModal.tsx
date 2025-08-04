import React from 'react';
import { X, User, Mail, Phone, MessageSquare, Calendar, Hash } from 'lucide-react';

interface ViewPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    timestamp: string;
    __v: number;
    viewpage: string;
  } | null;
}

const ViewPageModal: React.FC<ViewPageModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Contact Form Details
              </h2>
              <p className="text-sm text-gray-500">View submission information</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="bg-gray-50 rounded-lg p-6">
            <table className="w-full">
              <tbody className="space-y-4">
                <tr className="flex items-center">
                  <td className="w-32 flex items-center text-sm font-medium text-gray-700">
                    <Hash className="h-4 w-4 mr-2" />
                    ID:
                  </td>
                  <td className="flex-1 text-sm text-gray-900 font-mono">
                    {data._id}
                  </td>
                </tr>
                
                <tr className="flex items-center">
                  <td className="w-32 flex items-center text-sm font-medium text-gray-700">
                    <User className="h-4 w-4 mr-2" />
                    Name:
                  </td>
                  <td className="flex-1 text-sm text-gray-900">
                    {data.name}
                  </td>
                </tr>
                
                <tr className="flex items-center">
                  <td className="w-32 flex items-center text-sm font-medium text-gray-700">
                    <Mail className="h-4 w-4 mr-2" />
                    Email:
                  </td>
                  <td className="flex-1 text-sm text-gray-900">
                    <a 
                      href={`mailto:${data.email}`} 
                      className="text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      {data.email}
                    </a>
                  </td>
                </tr>
                
                <tr className="flex items-center">
                  <td className="w-32 flex items-center text-sm font-medium text-gray-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Phone:
                  </td>
                  <td className="flex-1 text-sm text-gray-900">
                    <a 
                      href={`tel:${data.phone}`} 
                      className="text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      {data.phone}
                    </a>
                  </td>
                </tr>
                
                <tr className="flex items-start">
                  <td className="w-32 flex items-start text-sm font-medium text-gray-700 pt-2">
                    <MessageSquare className="h-4 w-4 mr-2 mt-0.5" />
                    Message:
                  </td>
                  <td className="flex-1 text-sm text-gray-900 whitespace-pre-wrap">
                    {data.message}
                  </td>
                </tr>
                
                <tr className="flex items-center">
                  <td className="w-32 flex items-center text-sm font-medium text-gray-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Timestamp:
                  </td>
                  <td className="flex-1 text-sm text-gray-900">
                    {formatTimestamp(data.timestamp)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPageModal; 
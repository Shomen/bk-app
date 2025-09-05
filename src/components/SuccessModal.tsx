
import React from 'react';

// Props for SuccessModal
interface SuccessModalProps {
  open: boolean; // Whether modal is visible
  onClose: () => void; // Handler to close modal
  title: string; // Modal title
  message: string; // Modal message
}


// SuccessModal component: shows a modal dialog for booking confirmation
const SuccessModal: React.FC<SuccessModalProps> = ({ open, onClose, title, message }) => {
  // If not open, render nothing
  if (!open) return null;
  return (
    // Modal overlay and content
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-3xl backdrop-opacity-80">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-fade-in">
        {/* Modal title */}
        <h2 className="text-2xl font-bold mb-2 text-violet-700">{title}</h2>
        {/* Modal message */}
        <p className="mb-6 text-gray-700">{message}</p>
        {/* Close button */}
        <button
          className="px-6 py-2 bg-violet-600 text-white rounded-lg font-semibold shadow hover:bg-violet-500 transition duration-200 cursor-pointer"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;

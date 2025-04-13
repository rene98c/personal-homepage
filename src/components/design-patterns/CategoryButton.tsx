import React from 'react';

// Category Button Component
export const CategoryButton = ({ text, isActive, onClick }: { text: string, isActive: boolean, onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        isActive 
          ? 'bg-indigo-600 text-white shadow-md' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-sm'
      }`}
    >
      {text}
    </button>
  );
}; 

export default CategoryButton;
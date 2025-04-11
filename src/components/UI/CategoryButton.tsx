import React from 'react';

interface CategoryButtonProps {
    text: string;
    isActive: boolean;
    onClick: () => void;
  }
  
  const CategoryButton: React.FC<CategoryButtonProps> = ({ text, isActive, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
          isActive 
            ? 'bg-blue-600 text-white shadow-md' 
            : 'bg-slate-600 text-gray-100 hover:bg-slate-500 hover:shadow-sm'
        }`}
      >
        {text}
      </button>
    );
  };
  
  export default CategoryButton;
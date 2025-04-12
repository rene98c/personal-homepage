'use client';

import React from 'react';

export const PhilosophyItem = ({ number, title, description }: { 
  number: string, 
  title: string, 
  description: string 
}) => {
  return (
    <div className="flex group">
      <div className="flex-shrink-0 mr-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
          <span className="text-xl font-semibold text-white">{number}</span>
        </div>
      </div>
      <div>
        <h4 className="text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-indigo-600">{title}</h4>
        <p className="mt-2 text-base text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default PhilosophyItem;
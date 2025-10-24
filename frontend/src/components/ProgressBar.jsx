import React from 'react';

const ProgressBar = ({ currentStep }) => {
  const steps = ['Restaurant', 'People', 'Dishes', 'Charges', 'Discount', 'Result'];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        {steps.map((label, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
              currentStep > idx + 1 ? 'bg-green-500 text-white' : 
              currentStep === idx + 1 ? 'bg-indigo-600 text-white' : 
              'bg-gray-300 text-gray-600'
            }`}>
              {idx + 1}
            </div>
            <span className="text-xs mt-1 text-gray-600 hidden md:block">{label}</span>
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-300 h-2 rounded-full">
        <div 
          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / 6) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
import React from 'react';

const ChargesStep = ({ gst, setGst, serviceCharge, setServiceCharge, onNext, onBack }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">📊 Additional Charges</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">GST (%)</label>
        <input
          type="number"
          value={gst}
          onChange={(e) => setGst(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Enter GST percentage"
          min="0"
          max="100"
          step="0.1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Service Charge (%)</label>
        <input
          type="number"
          value={serviceCharge}
          onChange={(e) => setServiceCharge(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Enter service charge percentage"
          min="0"
          max="100"
          step="0.1"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Next Step →
        </button>
      </div>
    </div>
  );
};

export default ChargesStep;
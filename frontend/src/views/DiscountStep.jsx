import React from 'react';

const DiscountStep = ({ 
  discountType, 
  setDiscountType, 
  discountAmount, 
  setDiscountAmount, 
  onCalculate, 
  onBack,
  loading 
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎁 Discount (Optional)</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type</label>
        <select
          value={discountType}
          onChange={(e) => setDiscountType(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="fixed">Fixed Amount (₹)</option>
          <option value="percentage">Percentage (%)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Discount {discountType === 'percentage' ? '(%)' : '(₹)'}
        </label>
        <input
          type="number"
          value={discountAmount}
          onChange={(e) => setDiscountAmount(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Enter discount amount"
          min="0"
          step="0.01"
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
          onClick={onCalculate}
          disabled={loading}
          className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400"
        >
          {loading ? 'Calculating...' : 'Calculate Bill 🧮'}
        </button>
      </div>
    </div>
  );
};

export default DiscountStep;
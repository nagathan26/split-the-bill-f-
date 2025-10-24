import React from 'react';

const RestaurantStep = ({ restaurantName, setRestaurantName, onNext }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">🍽️ Restaurant Information</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Name *</label>
        <input
          type="text"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Enter restaurant name"
          autoFocus
        />
      </div>
      <button
        onClick={onNext}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        Next Step →
      </button>
    </div>
  );
};

export default RestaurantStep;
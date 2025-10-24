import React from 'react';

const DishesStep = ({ 
  people, 
  dishes, 
  dishName, 
  setDishName, 
  dishPrice, 
  setDishPrice, 
  selectedPeople, 
  onTogglePerson, 
  onAddDish, 
  onRemoveDish, 
  onNext, 
  onBack 
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">🍕 Add Dishes</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dish Name *</label>
          <input
            type="text"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter dish name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹) *</label>
          <input
            type="number"
            value={dishPrice}
            onChange={(e) => setDishPrice(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter price"
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Shared By *</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {people.map((person, idx) => (
              <button
                key={idx}
                onClick={() => onTogglePerson(person)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedPeople.includes(person)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {person}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onAddDish}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Add Dish
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-700 mb-3">Dishes Added ({dishes.length})</h3>
        {dishes.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No dishes added yet</p>
        ) : (
          <div className="space-y-3">
            {dishes.map((dish, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{dish.name}</h4>
                    <p className="text-green-600 font-semibold">₹{dish.price.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => onRemoveDish(idx)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {dish.sharedBy.map((person, i) => (
                    <span key={i} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                      {person}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
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

export default DishesStep;
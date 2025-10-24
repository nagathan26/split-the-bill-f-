import React from 'react';

const ResultStep = ({ result, onReset }) => {
  if (!result) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">✅ Bill Summary</h2>
      {console.log(result)
      }
      <div className="bg-indigo-50 rounded-lg p-4 mb-4">
        <h3 className="font-semibold text-lg text-indigo-900">{result.restaurantName}</h3>
      </div>

      {/* Summary Card */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Bill Details</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-semibold text-gray-600">₹{result.summary?.subtotal || 0}</span>
            {console.log(result.summary?.subtotal)}
            
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">GST ({result.summary?.gst || '0%'}):</span>
            <span className="font-semibold text-gray-600">₹{result.summary?.gstAmount || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Service Charge ({result.summary?.serviceCharge || '0%'}):</span>
            <span className="font-semibold text-gray-600">₹{result.summary?.serviceChargeAmount || 0}</span>
          </div>
          {result.summary?.discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount:</span>
              <span className="font-semibold">- ₹{result.summary.discount}</span>
            </div>
          )}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between text-lg">
              <span className="font-bold text-gray-800">Total:</span>
              <span className="font-bold text-indigo-600">₹{result.summary?.totalAmount || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Per Person Breakdown */}
      <div className="bg-white rounded-lg border-2 border-indigo-200 p-4">
        <h3 className="font-semibold text-gray-800 mb-4 text-lg">💳 Amount Per Person</h3>
        <div className="space-y-3">
          {result.people && result.people.length > 0 ? (
            result.people.map((person, idx) => (
              <div key={idx} className="flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg">
                <span className="font-semibold text-gray-800 text-lg">{person.name}</span>
                <span className="font-bold text-indigo-600 text-xl">₹{person.finalAmount}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No people found</p>
          )}
        </div>
      </div>

      {/* Dishes Breakdown */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">📋 Dishes Breakdown</h3>
        <div className="space-y-2">
          {result.dishes && result.dishes.length > 0 ? (
            result.dishes.map((dish, idx) => (
              <div key={idx} className="bg-white p-3 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-800">{dish.name}</span>
                  <span className="text-gray-700">₹{dish.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Per person: ₹{dish.pricePerPerson}</span>
                  <span className="text-gray-600">{dish.sharedBy.join(', ')}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No dishes found</p>
          )}
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        🔄 Start New Bill
      </button>
    </div>
  );
};

export default ResultStep;
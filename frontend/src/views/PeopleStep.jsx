import React from 'react';

const PeopleStep = ({ people, personName, setPersonName, onAddPerson, onRemovePerson, onNext, onBack }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">👥 Add People</h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onAddPerson()}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Enter person name"
        />
        <button
          onClick={onAddPerson}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Add
        </button>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-700 mb-3">People List ({people.length})</h3>
        {people.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No people added yet</p>
        ) : (
          <div className="space-y-2">
            {people.map((person, idx) => (
              <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-lg">
                <span className="font-medium text-gray-800">{person}</span>
                <button
                  onClick={() => onRemovePerson(person)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Remove
                </button>
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

export default PeopleStep;
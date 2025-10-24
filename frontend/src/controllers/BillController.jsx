import { useState } from 'react';
import BillModel from '../models/BillModel';
import ProgressBar from '../components/ProgressBar';
import RestaurantStep from '../views/RestaurantStep';
import PeopleStep from '../views/PeopleStep';
import DishesStep from '../views/DishesStep';
import ChargesStep from '../views/ChargesStep';
import DiscountStep from '../views/DiscountStep';
import ResultStep from '../views/ResultStep';

const BillController = () => {
  // State management
  const [step, setStep] = useState(1);
  const [restaurantName, setRestaurantName] = useState('');
  const [people, setPeople] = useState([]);
  const [personName, setPersonName] = useState('');
  const [dishes, setDishes] = useState([]);
  const [dishName, setDishName] = useState('');
  const [dishPrice, setDishPrice] = useState('');
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [gst, setGst] = useState('5');
  const [serviceCharge, setServiceCharge] = useState('10');
  const [discountAmount, setDiscountAmount] = useState('0');
  const [discountType, setDiscountType] = useState('fixed');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // People management handlers
  const handleAddPerson = () => {
    const validation = BillModel.validatePerson(personName, people);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setPeople([...people, personName.trim()]);
    setPersonName('');
    setError('');
  };

  const handleRemovePerson = (person) => {
    setPeople(people.filter(p => p !== person));
    setDishes(dishes.map(dish => ({
      ...dish,
      sharedBy: dish.sharedBy.filter(p => p !== person)
    })));
  };

  // Dish management handlers
  const handleTogglePersonForDish = (person) => {
    setSelectedPeople(prev =>
      prev.includes(person)
        ? prev.filter(p => p !== person)
        : [...prev, person]
    );
  };

  const handleAddDish = () => {
    const dish = {
      name: dishName.trim(),
      price: parseFloat(dishPrice),
      sharedBy: selectedPeople
    };

    const validation = BillModel.validateDish(dish);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setDishes([...dishes, dish]);
    setDishName('');
    setDishPrice('');
    setSelectedPeople([]);
    setError('');
  };

  const handleRemoveDish = (index) => {
    setDishes(dishes.filter((_, i) => i !== index));
  };

  // Navigation handlers
  const handleNext = () => {
    setError('');

    if (step === 1) {
      const validation = BillModel.validateRestaurant(restaurantName);
      if (!validation.valid) {
        setError(validation.error);
        return;
      }
    }

    if (step === 2 && people.length === 0) {
      setError('Please add at least one person');
      return;
    }

    if (step === 3 && dishes.length === 0) {
      setError('Please add at least one dish');
      return;
    }

    setStep(step + 1);
  };

  const handleBack = () => {
    setError('');
    setStep(step - 1);
  };

  // Calculate bill
  const handleCalculate = () => {
    if (dishes.length === 0) {
      setError('Please add at least one dish');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Calculating with data:', {
        restaurantName,
        people,
        dishes,
        gst,
        serviceCharge,
        discount: { amount: discountAmount, type: discountType }
      });

      const calculatedBill = BillModel.calculateBill({
        restaurantName,
        people,
        dishes,
        gst: parseFloat(gst),
        serviceCharge: parseFloat(serviceCharge),
        discount: {
          amount: parseFloat(discountAmount),
          type: discountType
        }
      });

      console.log('Calculated result:', calculatedBill);
      setResult(calculatedBill);
      setStep(6);
    } catch (err) {
      console.error('Calculation error:', err);
      setError('Failed to calculate bill: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset application
  const handleReset = () => {
    setStep(1);
    setRestaurantName('');
    setPeople([]);
    setPersonName('');
    setDishes([]);
    setDishName('');
    setDishPrice('');
    setSelectedPeople([]);
    setGst('5');
    setServiceCharge('10');
    setDiscountAmount('0');
    setDiscountType('fixed');
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">💰 Bill Splitting App</h1>
            <p className="text-gray-600">Split restaurant bills fairly among friends</p>
          </div>

          {/* Progress Bar */}
          <ProgressBar currentStep={step} />

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Step Views */}
          {step === 1 && (
            <RestaurantStep
              restaurantName={restaurantName}
              setRestaurantName={setRestaurantName}
              onNext={handleNext}
            />
          )}

          {step === 2 && (
            <PeopleStep
              people={people}
              personName={personName}
              setPersonName={setPersonName}
              onAddPerson={handleAddPerson}
              onRemovePerson={handleRemovePerson}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {step === 3 && (
            <DishesStep
              people={people}
              dishes={dishes}
              dishName={dishName}
              setDishName={setDishName}
              dishPrice={dishPrice}
              setDishPrice={setDishPrice}
              selectedPeople={selectedPeople}
              onTogglePerson={handleTogglePersonForDish}
              onAddDish={handleAddDish}
              onRemoveDish={handleRemoveDish}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {step === 4 && (
            <ChargesStep
              gst={gst}
              setGst={setGst}
              serviceCharge={serviceCharge}
              setServiceCharge={setServiceCharge}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {step === 5 && (
            <DiscountStep
              discountType={discountType}
              setDiscountType={setDiscountType}
              discountAmount={discountAmount}
              setDiscountAmount={setDiscountAmount}
              onCalculate={handleCalculate}
              onBack={handleBack}
              loading={loading}
            />
          )}

          {step === 6 && (
            <ResultStep
              result={result}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BillController;
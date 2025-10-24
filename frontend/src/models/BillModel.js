const BillModel = {
  calculateBill: (data) => {
    try {
      const { restaurantName, people, dishes, gst, serviceCharge, discount } = data;

      if (!restaurantName || !people || !dishes || people.length === 0 || dishes.length === 0) {
        throw new Error('Missing required data for bill calculation');
      }

      // Initialize person-wise totals
      const personAmounts = {};
      people.forEach(person => {
        personAmounts[person] = 0;
      });

      // Process each dish
      const processedDishes = dishes.map(dish => {
        const { name, price, sharedBy } = dish;

        if (!sharedBy || sharedBy.length === 0) {
          throw new Error(`Dish "${name}" must be shared by at least one person`);
        }

        const pricePerPerson = price / sharedBy.length;

        sharedBy.forEach(person => {
          if (personAmounts[person] !== undefined) {
            personAmounts[person] += pricePerPerson;
          }
        });

        return {
          name,
          price,
          sharedBy,
          pricePerPerson: parseFloat(pricePerPerson.toFixed(2)),
        };
      });

      // Subtotal before taxes and discounts
      const subtotal = dishes.reduce((sum, dish) => sum + dish.price, 0);
      const gstPercent = parseFloat(gst) || 0;
      const serviceChargePercent = parseFloat(serviceCharge) || 0;

      const gstAmount = (subtotal * gstPercent) / 100;
      const serviceChargeAmount = (subtotal * serviceChargePercent) / 100;
      const totalBeforeDiscount = subtotal + gstAmount + serviceChargeAmount;

      // Calculate total discount
      let discountAmount = 0;
      if (discount) {
        if (discount.type === 'percentage') {
          discountAmount = (totalBeforeDiscount * parseFloat(discount.amount)) / 100;
        } else {
          discountAmount = parseFloat(discount.amount) || 0;
        }
      }

      const totalAmount = totalBeforeDiscount - discountAmount;
      const totalPersonSubtotal = Object.values(personAmounts).reduce((sum, amt) => sum + amt, 0);

      // 👇 Split discount equally among all people
      const equalDiscountShare = discountAmount / people.length;

      // Calculate final amounts per person
      const finalPeople = Object.keys(personAmounts).map(person => {
        const personSubtotal = personAmounts[person];
        const proportion = totalPersonSubtotal > 0 ? personSubtotal / totalPersonSubtotal : 0;
        const personGst = gstAmount * proportion;
        const personServiceCharge = serviceChargeAmount * proportion;

        const finalAmount = personSubtotal + personGst + personServiceCharge - equalDiscountShare;

        return {
          name: person,
          finalAmount: parseFloat(finalAmount.toFixed(2)),
        };
      });

      // Final structured response
      return {
        restaurantName,
        people: finalPeople,
        dishes: processedDishes,
        summary: {
          subtotal: parseFloat(subtotal.toFixed(2)),
          gst: `${gstPercent}%`,
          gstAmount: parseFloat(gstAmount.toFixed(2)),
          serviceCharge: `${serviceChargePercent}%`,
          serviceChargeAmount: parseFloat(serviceChargeAmount.toFixed(2)),
          discount: parseFloat(discountAmount.toFixed(2)),
          totalAmount: parseFloat(totalAmount.toFixed(2)),
        },
      };
    } catch (error) {
      console.error('Error in calculateBill:', error);
      throw error;
    }
  },

  // --- validation helpers ---
  validateRestaurant: (name) => {
    if (!name || name.trim().length === 0) {
      return { valid: false, error: 'Restaurant name is required' };
    }
    if (name.trim().length < 2) {
      return { valid: false, error: 'Restaurant name must be at least 2 characters' };
    }
    return { valid: true, error: null };
  },

  validatePerson: (name, existingPeople) => {
    if (!name || name.trim().length === 0) {
      return { valid: false, error: 'Person name is required' };
    }
    if (existingPeople.includes(name.trim())) {
      return { valid: false, error: 'Person already added' };
    }
    return { valid: true, error: null };
  },

  validateDish: (dish) => {
    if (!dish.name || dish.name.trim().length === 0) {
      return { valid: false, error: 'Dish name is required' };
    }
    if (!dish.price || dish.price <= 0) {
      return { valid: false, error: 'Price must be greater than 0' };
    }
    if (!dish.sharedBy || dish.sharedBy.length === 0) {
      return { valid: false, error: 'Please select at least one person' };
    }
    return { valid: true, error: null };
  },
};

export default BillModel;

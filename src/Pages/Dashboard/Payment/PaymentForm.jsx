import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isApplying, setIsApplying] = useState(false);
  const [finalAmount, setFinalAmount] = useState(12000); // default $120 → amount in cents

  // Handle Coupon Apply
  const handleApplyCoupon = async () => {
    if (!couponCode) {
      Swal.fire("Please enter a coupon code", "", "warning");
      return;
    }

    try {
      setIsApplying(true);
      const response = await axios.post("https://app-orbit-server-zeta.vercel.app/api/coupons/validate", {
        code: couponCode
      });

      if (response.data.valid) {
        setDiscount(response.data.discount); // e.g. 20 means 20% off
        const discountedAmount = 12000 - (12000 * response.data.discount) / 100;
        setFinalAmount(discountedAmount);
        Swal.fire("Coupon Applied!", `You got ${response.data.discount}% off 🎉`, "success");
      } else {
        Swal.fire("Invalid Coupon", "This coupon code is not valid.", "error");
        setDiscount(0);
        setFinalAmount(12000);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong while applying coupon.", "error");
    } finally {
      setIsApplying(false);
    }
  };

  // Handle Payment
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    } else {
      try {
        const response = await axios.post("https://app-orbit-server-zeta.vercel.app/api/payment", {
          paymentMethodId: paymentMethod.id,
          amount: finalAmount,
          userEmail: user.email,
          couponCode: discount > 0 ? couponCode : null
        });

        if (response.data.success) {
          Swal.fire({
            icon: "success",
            title: "Congratulations 🎉 Payment Successful!",
            text: `Your payment is completed. Subscription activated.`,
          });
          navigate("/dashboard/my-profile");
        }
      } catch (err) {
        console.error(err.response?.data || err.message);
        Swal.fire("Payment Failed", "Please try again later.", "error");
      }
    }
  };

  return (
    <>
      <h2 className='text-3xl font-bold mb-5 text-center'>
        Get Lifetime Subscription <span className='text-indigo-600'>Only ${finalAmount / 100}</span>
      </h2>
      
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-4"
      >
        <h2 className="text-xl font-semibold text-center text-gray-700">Complete Your Payment</h2>

        {/* Coupon Code Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter Coupon Code"
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            disabled={isApplying}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {isApplying ? "Applying..." : "Apply"}
          </button>
        </div>

        <div className="border border-gray-300 rounded-lg p-3 bg-gray-50">
          <CardElement
            options={{
              style: {
                base: { fontSize: '16px', color: '#374151' },
                invalid: { color: '#DC2626' }
              }
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
        >
          Pay ${finalAmount / 100}
        </button>
      </form>
    </>
  );
};

export default PaymentForm;

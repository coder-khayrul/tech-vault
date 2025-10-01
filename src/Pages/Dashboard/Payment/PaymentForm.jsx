// import React from 'react';
import React from 'react';
import { useNavigate } from 'react-router';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import { use } from 'react';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = use(AuthContext)
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.message}`,
      });
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      try {
        const response = await axios.post("https://app-orbit-server-zeta.vercel.app/api/payment", {
          paymentMethodId: paymentMethod.id,
          amount: 1000,
          userEmail: user.email
        });
        console.log(response)
        Swal.fire({
          icon: "success",
          title: "Congratulations🎉! Payment Successfull!",
          text: `Your payment is completed. Now you have subscription!`,
        });
        navigate("/dashboard/my-products")
      } catch (error) {
        console.error(error.response?.data || error.message);
      }

    }
  };
  return (
    <>
      <h2 className='text-3xl font-bold mb-5 text-center'>Get Lifetime Subscription <span className='text-indigo-600'>Only $15</span></h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-4"
      >
        <h2 className="text-xl font-semibold text-center text-gray-700">Complete Your Payment</h2>

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
          Pay Now
        </button>
      </form>
    </>

  );
};


export default PaymentForm;

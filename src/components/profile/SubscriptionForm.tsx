import React from 'react';
import { ElementsConsumer, PaymentElement } from '@stripe/react-stripe-js';
import { getFunctions, connectFunctionsEmulator, httpsCallable } from 'firebase/functions';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Stripe, StripeElements } from '@stripe/stripe-js';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKuRMMiy8dVve9TRJfYoUa57OX5VeeUgs",
  authDomain: "realtimemvp-a9dca.firebaseapp.com",
  projectId: "realtimemvp-a9dca",
  storageBucket: "realtimemvp-a9dca.firebasestorage.app",
  messagingSenderId: "964655615724",
  appId: "1:964655615724:web:f7202c7d30e66b7ffa5fc9",
  measurementId: "G-CRK7255EQC"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get Firebase Functions instance
const functions = getFunctions(app);

connectFunctionsEmulator(functions, 'localhost', 5001);

// Define prop types for CheckoutForm
interface CheckoutFormProps {
  stripe: Stripe | null;
  elements: StripeElements | null;
}

class CheckoutForm extends React.Component<CheckoutFormProps> {
  handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      // Handle successful payment confirmation
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <PaymentElement />
        <button disabled={!this.props.stripe}>Submit</button>
      </form>
    );
  }
}

export default function InjectedCheckoutForm() {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
}
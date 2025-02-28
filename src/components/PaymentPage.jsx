import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { handlePayment } from '../controllers/paymentController';

// Cargamos Stripe con la clave pública
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState(1000); // 1000 centavos = 10 EUR
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe no está cargado aún.");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Creamos el PaymentIntent llamando al backend
      const clientSecret = await handlePayment(amount);

      // 2️⃣ Obtenemos el CardElement
      const cardElement = elements.getElement(CardElement);

      // 3️⃣ Confirmamos el pago con Stripe
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setError(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        setSuccess(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Pago con Stripe</h1>
      <form onSubmit={handleSubmit}>
        <label>Monto (€):</label>
        <input
          type="number"
          value={amount / 100} // Convertimos de centavos a euros
          onChange={(e) => setAmount(e.target.value * 100)} // Convertimos de euros a centavos
          min="1"
        />
        <CardElement /> {/* Componente de Stripe para la tarjeta */}
        <button type="submit" disabled={loading || success}>
          {success ? "Pago realizado" : "Pagar"}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>¡Pago realizado con éxito!</p>}
    </div>
  );
};

// Envolvemos en Elements para conectar con Stripe
const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PaymentPage;

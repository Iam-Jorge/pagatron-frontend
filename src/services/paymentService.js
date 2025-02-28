import axios from 'axios';

// Llamada para crear el PaymentIntent
export const createPaymentIntent = async (amount) => {
  try {
    const response = await axios.post('http://localhost:3000/payments/create-payment', { amount });
    return response.data.clientSecret; // Regresa el client_secret para confirmar el pago
  } catch (error) {
    console.error('Error al crear el PaymentIntent', error);
    throw new Error('No se pudo procesar el pago');
  }
};

import { createPaymentIntent } from '../services/paymentService';

export const handlePayment = async (amount) => {
  try {
    const clientSecret = await createPaymentIntent(amount);
    return clientSecret;
  } catch (error) {
    console.error('Error al gestionar el pago:', error);
    throw error;
  }
};

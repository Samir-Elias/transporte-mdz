import { useState, useEffect } from 'react';
import { usePayment as usePaymentContext } from '../context/PaymentContext';

export const usePayment = () => {
  const paymentContext = usePaymentContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastError, setLastError] = useState(null);

  const generateQR = async (amount = 45, description = 'Boleto de transporte') => {
    try {
      setIsProcessing(true);
      setLastError(null);
      
      const payment = await paymentContext.generatePaymentQR(amount, description);
      return payment;
    } catch (error) {
      setLastError(error.message);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const refreshQR = async () => {
    try {
      setIsProcessing(true);
      setLastError(null);
      
      await paymentContext.refreshPaymentQR();
    } catch (error) {
      setLastError(error.message);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const checkStatus = async (paymentId) => {
    try {
      setIsProcessing(true);
      setLastError(null);
      
      const status = await paymentContext.checkPaymentStatus(paymentId);
      return status;
    } catch (error) {
      setLastError(error.message);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const validateQRCode = async (qrData) => {
    try {
      setLastError(null);
      
      const validation = await paymentContext.validateQR(qrData);
      return validation;
    } catch (error) {
      setLastError(error.message);
      throw error;
    }
  };

  const clearError = () => {
    setLastError(null);
  };

  const clearPayment = () => {
    paymentContext.clearCurrentPayment();
    clearError();
  };

  return {
    // Estado del contexto
    currentPayment: paymentContext.currentPayment,
    paymentHistory: paymentContext.paymentHistory,
    paymentMethods: paymentContext.paymentMethods,
    isLoading: paymentContext.isLoading,
    error: paymentContext.error || lastError,
    
    // Estado local
    isProcessing,
    lastError,
    
    // Acciones
    generateQR,
    refreshQR,
    checkStatus,
    validateQRCode,
    clearError,
    clearPayment,
    
    // Acciones del contexto
    processPayment: paymentContext.processPayment,
    loadPaymentHistory: paymentContext.loadPaymentHistory,
    getPaymentStats: paymentContext.getPaymentStats,
  };
};

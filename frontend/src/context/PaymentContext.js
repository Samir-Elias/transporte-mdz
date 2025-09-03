import React, { createContext, useContext, useState, useEffect } from 'react';
import PaymentService from '../services/PaymentService';

const PaymentContext = createContext();

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment debe ser usado dentro de un PaymentProvider');
  }
  return context;
};

export const PaymentProvider = ({ children }) => {
  const [currentPayment, setCurrentPayment] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPaymentMethods();
    loadPaymentHistory();
  }, []);

  const loadPaymentMethods = async () => {
    try {
      const methods = await PaymentService.getPaymentMethods();
      setPaymentMethods(methods);
    } catch (error) {
      console.error('Error cargando métodos de pago:', error);
      setError('No se pudieron cargar los métodos de pago');
    }
  };

  const loadPaymentHistory = async (limit = 20, offset = 0) => {
    try {
      setIsLoading(true);
      const history = await PaymentService.getPaymentHistory('user_001', limit, offset);
      setPaymentHistory(history.payments);
    } catch (error) {
      console.error('Error cargando historial de pagos:', error);
      setError('No se pudo cargar el historial de pagos');
    } finally {
      setIsLoading(false);
    }
  };

  const generatePaymentQR = async (amount, description) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const payment = await PaymentService.generatePaymentQR(amount, description);
      setCurrentPayment(payment);
      
      return payment;
    } catch (error) {
      console.error('Error generando código QR:', error);
      setError('No se pudo generar el código QR');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const checkPaymentStatus = async (paymentId) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const status = await PaymentService.checkPaymentStatus(paymentId);
      
      // Actualizar el pago actual si es el mismo
      if (currentPayment && currentPayment.paymentId === paymentId) {
        setCurrentPayment(prev => ({ ...prev, status: status.status }));
      }
      
      return status;
    } catch (error) {
      console.error('Error verificando estado del pago:', error);
      setError('No se pudo verificar el estado del pago');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const processPayment = async (qrData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await PaymentService.processPayment(qrData);
      
      // Actualizar el pago actual
      if (currentPayment && currentPayment.paymentId === result.paymentId) {
        setCurrentPayment(prev => ({ ...prev, status: 'completed' }));
      }
      
      // Agregar a la historia
      const newPayment = {
        id: result.paymentId,
        amount: result.amount,
        description: 'Boleto de transporte',
        status: result.status,
        timestamp: result.timestamp,
        transactionId: result.transactionId
      };
      
      setPaymentHistory(prev => [newPayment, ...prev]);
      
      return result;
    } catch (error) {
      console.error('Error procesando pago:', error);
      setError('No se pudo procesar el pago');
      throw error;
    } finally {
      setIsLoading(false);
    }
    }
  };

  const validateQR = async (qrData) => {
    try {
      setError(null);
      const validation = await PaymentService.validateQR(qrData);
      
      if (!validation.valid) {
        setError(validation.error);
      }
      
      return validation;
    } catch (error) {
      console.error('Error validando código QR:', error);
      setError('Error interno de validación');
      throw error;
    }
  };

  const refreshPaymentQR = async () => {
    if (!currentPayment) return;
    
    try {
      await generatePaymentQR(currentPayment.amount, currentPayment.description);
    } catch (error) {
      console.error('Error refrescando código QR:', error);
    }
  };

  const clearCurrentPayment = () => {
    setCurrentPayment(null);
    setError(null);
  };

  const getPaymentStats = async (period = 'month') => {
    try {
      setIsLoading(true);
      const stats = await PaymentService.getPaymentStats('user_001', period);
      return stats;
    } catch (error) {
      console.error('Error obteniendo estadísticas de pagos:', error);
      setError('No se pudieron obtener las estadísticas');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    currentPayment,
    paymentHistory,
    paymentMethods,
    isLoading,
    error,
    generatePaymentQR,
    checkPaymentStatus,
    processPayment,
    validateQR,
    refreshPaymentQR,
    clearCurrentPayment,
    loadPaymentHistory,
    getPaymentStats
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};

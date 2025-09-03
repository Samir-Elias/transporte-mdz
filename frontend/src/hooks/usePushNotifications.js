import { useState, useCallback } from 'react';

const usePushNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  // Mostrar notificación de pago exitoso
  const showPaymentSuccess = useCallback((amount, code) => {
    const notification = {
      id: Date.now(),
      type: 'payment',
      title: '💳 Pago Exitoso',
      message: `Tu boleto de $${amount} ha sido pagado. Código: ${code}`,
      duration: 6000,
    };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto-remover después de la duración
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, notification.duration);
  }, []);

  // Mostrar notificación de ruta
  const showRouteUpdate = useCallback((line, message) => {
    const notification = {
      id: Date.now(),
      type: 'route',
      title: `🚌 Línea ${line}`,
      message: message,
      duration: 8000,
    };
    
    setNotifications(prev => [...prev, notification]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, notification.duration);
  }, []);

  // Mostrar notificación de incidente
  const showIncidentAlert = useCallback((line, message) => {
    const notification = {
      id: Date.now(),
      type: 'warning',
      title: `⚠️ Incidente Línea ${line}`,
      message: message,
      duration: 10000,
    };
    
    setNotifications(prev => [...prev, notification]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, notification.duration);
  }, []);

  // Mostrar notificación de éxito
  const showSuccess = useCallback((title, message) => {
    const notification = {
      id: Date.now(),
      type: 'success',
      title: title,
      message: message,
      duration: 5000,
    };
    
    setNotifications(prev => [...prev, notification]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, notification.duration);
  }, []);

  // Mostrar notificación de error
  const showError = useCallback((title, message) => {
    const notification = {
      id: Date.now(),
      type: 'error',
      title: title,
      message: message,
      duration: 7000,
    };
    
    setNotifications(prev => [...prev, notification]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, notification.duration);
  }, []);

  // Mostrar notificación de información
  const showInfo = useCallback((title, message) => {
    const notification = {
      id: Date.now(),
      type: 'info',
      title: title,
      message: message,
      duration: 5000,
    };
    
    setNotifications(prev => [...prev, notification]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, notification.duration);
  }, []);

  // Remover notificación específica
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // Limpiar todas las notificaciones
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    showPaymentSuccess,
    showRouteUpdate,
    showIncidentAlert,
    showSuccess,
    showError,
    showInfo,
    removeNotification,
    clearAll,
  };
};

export default usePushNotifications;

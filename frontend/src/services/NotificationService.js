// Servicio para manejar notificaciones push y alertas
// Este archivo contendrá toda la lógica relacionada con las notificaciones

import * as Notifications from 'expo-notifications';

class NotificationService {
  constructor() {
    this.baseURL = 'https://api.notifications.mdz.gob.ar'; // URL de ejemplo
    this.apiKey = null; // Se configurará desde variables de entorno
    this.expoPushToken = null;
    this.notificationListener = null;
    this.responseListener = null;
  }

  // Configurar la API key
  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  // Inicializar el servicio de notificaciones
  async initialize() {
    try {
      // Solicitar permisos
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      
      if (finalStatus !== 'granted') {
        throw new Error('Permisos de notificación no otorgados');
      }

      // Obtener token de Expo
      this.expoPushToken = await Notifications.getExpoPushTokenAsync({
        projectId: 'your-project-id' // Reemplazar con el ID real del proyecto
      });

      // Configurar manejadores de notificaciones
      this.setupNotificationHandlers();

      // Configurar categorías de notificaciones
      await this.setupNotificationCategories();

      return true;
    } catch (error) {
      console.error('Error inicializando notificaciones:', error);
      return false;
    }
  }

  // Configurar manejadores de notificaciones
  setupNotificationHandlers() {
    // Manejador cuando se recibe una notificación
    this.notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notificación recibida:', notification);
      // Aquí se puede implementar lógica adicional cuando se recibe una notificación
    });

    // Manejador cuando se toca una notificación
    this.responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Respuesta a notificación:', response);
      // Aquí se puede implementar navegación o acciones cuando se toca una notificación
    });
  }

  // Configurar categorías de notificaciones
  async setupNotificationCategories() {
    try {
      await Notifications.setNotificationCategoryAsync('trip_alert', [
        {
          identifier: 'view_trip',
          buttonTitle: 'Ver Viaje',
          options: {
            isDestructive: false,
            isAuthenticationRequired: false,
          },
        },
        {
          identifier: 'dismiss',
          buttonTitle: 'Descartar',
          options: {
            isDestructive: true,
            isAuthenticationRequired: false,
          },
        },
      ]);

      await Notifications.setNotificationCategoryAsync('payment_confirmation', [
        {
          identifier: 'view_receipt',
          buttonTitle: 'Ver Recibo',
          options: {
            isDestructive: false,
            isAuthenticationRequired: false,
          },
        },
      ]);

      await Notifications.setNotificationCategoryAsync('service_update', [
        {
          identifier: 'view_details',
          buttonTitle: 'Ver Detalles',
          options: {
            isDestructive: false,
            isAuthenticationRequired: false,
          },
        },
      ]);
    } catch (error) {
      console.error('Error configurando categorías de notificaciones:', error);
    }
  }

  // Enviar notificación local
  async sendLocalNotification(title, body, data = {}, category = 'default') {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          categoryIdentifier: category,
        },
        trigger: null, // Enviar inmediatamente
      });
      
      return true;
    } catch (error) {
      console.error('Error enviando notificación local:', error);
      return false;
    }
  }

  // Programar notificación local
  async scheduleLocalNotification(title, body, trigger, data = {}, category = 'default') {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          categoryIdentifier: category,
        },
        trigger,
      });
      
      return true;
    } catch (error) {
      console.error('Error programando notificación local:', error);
      return false;
    }
  }

  // Enviar notificación push al servidor
  async sendPushNotification(userIds, notification) {
    try {
      // Aquí se implementará el envío real al servidor
      console.log('Enviando notificación push:', { userIds, notification });
      
      // Simulación de envío
      const response = await fetch(`${this.baseURL}/notifications/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          userIds,
          notification,
          pushToken: this.expoPushToken?.data,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Error enviando notificación push');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error enviando notificación push:', error);
      throw new Error('No se pudo enviar la notificación push');
    }
  }

  // Enviar alerta de viaje
  async sendTripAlert(userId, tripInfo) {
    try {
      const notification = {
        title: '🚌 Micro Aproximándose',
        body: `El micro ${tripInfo.lineId} llegará en ${tripInfo.estimatedArrival} minutos`,
        data: {
          type: 'trip_alert',
          tripId: tripInfo.tripId,
          lineId: tripInfo.lineId,
          estimatedArrival: tripInfo.estimatedArrival,
          stopName: tripInfo.stopName,
        },
        category: 'trip_alert',
      };
      
      // Enviar notificación local
      await this.sendLocalNotification(
        notification.title,
        notification.body,
        notification.data,
        notification.category
      );
      
      // Enviar notificación push si está configurado
      if (this.expoPushToken) {
        await this.sendPushNotification([userId], notification);
      }
      
      return true;
    } catch (error) {
      console.error('Error enviando alerta de viaje:', error);
      return false;
    }
  }

  // Enviar confirmación de pago
  async sendPaymentConfirmation(userId, paymentInfo) {
    try {
      const notification = {
        title: '💳 Pago Confirmado',
        body: `Tu pago de $${paymentInfo.amount} ha sido confirmado exitosamente`,
        data: {
          type: 'payment_confirmation',
          paymentId: paymentInfo.paymentId,
          amount: paymentInfo.amount,
          transactionId: paymentInfo.transactionId,
        },
        category: 'payment_confirmation',
      };
      
      // Enviar notificación local
      await this.sendLocalNotification(
        notification.title,
        notification.body,
        notification.data,
        notification.category
      );
      
      // Enviar notificación push si está configurado
      if (this.expoPushToken) {
        await this.sendPushNotification([userId], notification);
      }
      
      return true;
    } catch (error) {
      console.error('Error enviando confirmación de pago:', error);
      return false;
    }
  }

  // Enviar actualización del servicio
  async sendServiceUpdate(userIds, serviceInfo) {
    try {
      const notification = {
        title: '🔧 Actualización del Servicio',
        body: serviceInfo.message,
        data: {
          type: 'service_update',
          serviceId: serviceInfo.serviceId,
          severity: serviceInfo.severity,
          affectedLines: serviceInfo.affectedLines,
        },
        category: 'service_update',
      };
      
      // Enviar notificación push
      await this.sendPushNotification(userIds, notification);
      
      return true;
    } catch (error) {
      console.error('Error enviando actualización del servicio:', error);
      return false;
    }
  }

  // Obtener configuración de notificaciones del usuario
  async getUserNotificationSettings(userId) {
    try {
      // Aquí se implementará la llamada real a la API
      // Por ahora retornamos configuración de ejemplo
      return {
        userId,
        pushNotifications: true,
        tripAlerts: true,
        paymentConfirmations: true,
        serviceUpdates: false,
        marketing: false,
        quietHours: {
          enabled: true,
          start: '22:00',
          end: '07:00',
        },
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error obteniendo configuración de notificaciones:', error);
      throw new Error('No se pudo obtener la configuración de notificaciones');
    }
  }

  // Actualizar configuración de notificaciones del usuario
  async updateUserNotificationSettings(userId, settings) {
    try {
      // Aquí se implementará la llamada real a la API
      console.log('Actualizando configuración de notificaciones:', { userId, settings });
      
      // Simulación de actualización
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        message: 'Configuración actualizada exitosamente',
        settings,
      };
    } catch (error) {
      console.error('Error actualizando configuración de notificaciones:', error);
      throw new Error('No se pudo actualizar la configuración de notificaciones');
    }
  }

  // Limpiar recursos
  cleanup() {
    if (this.notificationListener) {
      Notifications.removeNotificationSubscription(this.notificationListener);
    }
    if (this.responseListener) {
      Notifications.removeNotificationSubscription(this.responseListener);
    }
  }

  // Obtener token de Expo
  getExpoPushToken() {
    return this.expoPushToken;
  }
}

export default new NotificationService();

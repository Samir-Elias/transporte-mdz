import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SimpleMapView from '../../components/Map/SimpleMapView';
import Button from '../../components/Button';
import usePushNotifications from '../../hooks/usePushNotifications';
import NotificationContainer from '../../components/Notifications/NotificationContainer';
import styles from './HomeScreen.styles';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [showRoutePanel, setShowRoutePanel] = useState(false);
  
  // Hook de notificaciones push
  const {
    notifications,
    showPaymentSuccess,
    showRouteUpdate,
    showIncidentAlert,
    showSuccess,
    showError,
    showInfo,
    removeNotification,
  } = usePushNotifications();

  const handleMapPress = (event) => {
    // Aquí se manejaría la interacción con el mapa
    console.log('Map pressed:', event);
  };

  const handleRoutePlanner = () => {
    navigation.navigate('RoutePlanner');
  };

  const handlePayment = () => {
    navigation.navigate('Pagos');
  };

  const handleNotifications = () => {
    navigation.navigate('Notifications');
  };

  const handleMyLocation = () => {
    Alert.alert('Ubicación', 'Obteniendo tu ubicación actual...');
  };

  const handleBusTracking = () => {
    Alert.alert('Seguimiento', 'Buscando buses cercanos...');
  };

  // Funciones para probar notificaciones push
  const testPaymentNotification = () => {
    showPaymentSuccess(45, 'MDZ-2024-001');
  };

  const testRouteNotification = () => {
    showRouteUpdate('500', 'Desvío temporal por obras en Av. San Martín');
  };

  const testIncidentNotification = () => {
    showIncidentAlert('305', 'Retraso de 15 minutos por tráfico');
  };

  const testSuccessNotification = () => {
    showSuccess('Ubicación Actualizada', 'Tu ubicación ha sido actualizada correctamente');
  };

  const testErrorNotification = () => {
    showError('Error de Conexión', 'No se pudo conectar con el servidor');
  };

  return (
    <View style={styles.container}>
      {/* Header flotante */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>🚌 Transporte MDZ</Text>
          <Text style={styles.subtitle}>Mendoza, Argentina</Text>
        </View>
        
        {/* Botón de ubicación */}
        <TouchableOpacity style={styles.locationButton} onPress={handleMyLocation}>
          <Text style={styles.locationIcon}>📍</Text>
        </TouchableOpacity>
      </View>

      {/* Mapa principal */}
      <View style={styles.mapContainer}>
        <SimpleMapView />
        
        {/* Botones flotantes sobre el mapa */}
        <View style={styles.floatingButtons}>
          <TouchableOpacity 
            style={styles.floatingButton} 
            onPress={() => setShowRoutePanel(!showRoutePanel)}
          >
            <Text style={styles.floatingButtonText}>🗺️</Text>
            <Text style={styles.floatingButtonLabel}>Rutas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.floatingButton} 
            onPress={handleBusTracking}
          >
            <Text style={styles.floatingButtonText}>🚌</Text>
            <Text style={styles.floatingButtonLabel}>Buses</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.floatingButton} 
            onPress={handlePayment}
          >
            <Text style={styles.floatingButtonText}>💳</Text>
            <Text style={styles.floatingButtonLabel}>Pagar</Text>
          </TouchableOpacity>
        </View>

        {/* Panel de ruta flotante */}
        {showRoutePanel && (
          <View style={styles.routePanel}>
            <Text style={styles.routePanelTitle}>Planificar Ruta</Text>
            <Button
              title="Buscar Ruta"
              onPress={handleRoutePlanner}
              variant="primary"
              style={styles.routeButton}
            />
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowRoutePanel(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Contenedor de notificaciones push */}
      <NotificationContainer
        notifications={notifications}
        onNotificationPress={(notification) => {
          Alert.alert(notification.title, notification.message);
        }}
        onNotificationDismiss={removeNotification}
      />

      {/* Botones de prueba para notificaciones (solo en desarrollo) */}
      <View style={styles.testButtonsContainer}>
        <TouchableOpacity style={styles.testButton} onPress={testPaymentNotification}>
          <Text style={styles.testButtonText}>💳 Pago</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.testButton} onPress={testRouteNotification}>
          <Text style={styles.testButtonText}>🚌 Ruta</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.testButton} onPress={testIncidentNotification}>
          <Text style={styles.testButtonText}>⚠️ Incidente</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.testButton} onPress={testSuccessNotification}>
          <Text style={styles.testButtonText}>✅ Éxito</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.testButton} onPress={testErrorNotification}>
          <Text style={styles.testButtonText}>❌ Error</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de navegación inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => {}}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={handleRoutePlanner}>
          <Text style={styles.navIcon}>🗺️</Text>
          <Text style={styles.navText}>Rutas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={handlePayment}>
          <Text style={styles.navIcon}>💳</Text>
          <Text style={styles.navText}>Pagos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={handleNotifications}>
          <Text style={styles.navIcon}>🔔</Text>
          <Text style={styles.navText}>Alertas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

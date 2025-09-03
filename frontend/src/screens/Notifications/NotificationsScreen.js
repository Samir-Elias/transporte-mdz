import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../styles/colors';

const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de notificaciones
    setTimeout(() => {
      setNotifications([
        {
          id: 1,
          type: 'route',
          title: '🚌 Cambio en Línea 500',
          message: 'La línea 500 tiene un desvío temporal por obras en Av. San Martín',
          time: 'Hace 5 minutos',
          read: false,
          priority: 'high'
        },
        {
          id: 2,
          type: 'payment',
          title: '💳 Pago Exitoso',
          message: 'Tu boleto ha sido pagado correctamente. Código: MDZ-2024-001',
          time: 'Hace 15 minutos',
          read: true,
          priority: 'medium'
        },
        {
          id: 3,
          type: 'system',
          title: '🔔 Mantenimiento Programado',
          message: 'El sistema estará en mantenimiento el domingo de 2:00 a 4:00 AM',
          time: 'Hace 1 hora',
          read: true,
          priority: 'low'
        },
        {
          id: 4,
          type: 'route',
          title: '🚏 Nueva Parada',
          message: 'Se ha agregado una nueva parada en Plaza Independencia',
          time: 'Hace 2 horas',
          read: true,
          priority: 'medium'
        },
        {
          id: 5,
          type: 'incident',
          title: '⚠️ Incidente Reportado',
          message: 'Se ha reportado un incidente en la Línea 305. Estamos investigando.',
          time: 'Hace 3 horas',
          read: false,
          priority: 'high'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleNotificationPress = (notification) => {
    // Marcar como leída
    setNotifications(prev => 
      prev.map(n => 
        n.id === notification.id ? { ...n, read: true } : n
      )
    );
    
    // Mostrar detalles
    Alert.alert(notification.title, notification.message);
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
    Alert.alert('Éxito', 'Todas las notificaciones han sido marcadas como leídas');
  };

  const handleClearAll = () => {
    Alert.alert(
      'Limpiar Notificaciones',
      '¿Estás seguro de que quieres eliminar todas las notificaciones?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Limpiar', 
          style: 'destructive',
          onPress: () => setNotifications([])
        }
      ]
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return colors.error;
      case 'medium': return colors.warning;
      case 'low': return colors.info;
      default: return colors.textSecondary;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'route': return '🚌';
      case 'payment': return '💳';
      case 'system': return '🔔';
      case 'incident': return '⚠️';
      default: return '📢';
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Cargando notificaciones...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🔔 Alertas</Text>
        <Text style={styles.subtitle}>Mantente informado sobre el transporte</Text>
      </View>

      {/* Acciones */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleMarkAllRead}>
          <Text style={styles.actionButtonText}>Marcar todas como leídas</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleClearAll}>
          <Text style={styles.actionButtonText}>Limpiar todas</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de notificaciones */}
      <ScrollView style={styles.notificationsList} showsVerticalScrollIndicator={false}>
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={styles.emptyTitle}>No hay notificaciones</Text>
            <Text style={styles.emptyMessage}>Estás al día con todas las alertas</Text>
          </View>
        ) : (
          notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationItem,
                !notification.read && styles.unreadNotification
              ]}
              onPress={() => handleNotificationPress(notification)}
            >
              {/* Indicador de prioridad */}
              <View style={[
                styles.priorityIndicator,
                { backgroundColor: getPriorityColor(notification.priority) }
              ]} />
              
              {/* Contenido */}
              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <Text style={styles.notificationIcon}>
                    {getTypeIcon(notification.type)}
                  </Text>
                  <Text style={styles.notificationTitle}>
                    {notification.title}
                  </Text>
                  {!notification.read && <View style={styles.unreadDot} />}
                </View>
                
                <Text style={styles.notificationMessage}>
                  {notification.message}
                </Text>
                
                <Text style={styles.notificationTime}>
                  {notification.time}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {notifications.filter(n => !n.read).length} sin leer de {notifications.length} total
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Header
  header: {
    backgroundColor: colors.primary,
    padding: 20,
    paddingTop: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textLight,
    opacity: 0.9,
  },
  
  // Acciones
  actions: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButtonText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  
  // Lista de notificaciones
  notificationsList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  
  // Item de notificación
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  unreadNotification: {
    backgroundColor: colors.backgroundTertiary,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  priorityIndicator: {
    width: 4,
    backgroundColor: colors.primary,
  },
  notificationContent: {
    flex: 1,
    padding: 15,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  notificationIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  notificationTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  notificationMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  
  // Estado vacío
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  
  // Loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  
  // Footer
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  footerText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default NotificationsScreen;

import React from 'react';
import { View, StyleSheet } from 'react-native';
import PushNotification from './PushNotification';

const NotificationContainer = ({ notifications, onNotificationPress, onNotificationDismiss }) => {
  return (
    <View style={styles.container}>
      {notifications.map((notification, index) => (
        <PushNotification
          key={notification.id}
          visible={true}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          duration={notification.duration}
          onPress={() => onNotificationPress?.(notification)}
          onDismiss={() => onNotificationDismiss?.(notification.id)}
          style={[
            styles.notification,
            { top: 50 + (index * 80) } // Apilar notificaciones
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  notification: {
    marginBottom: 10,
  },
});

export default NotificationContainer;

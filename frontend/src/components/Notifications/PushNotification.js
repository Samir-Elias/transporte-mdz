import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../styles/colors';

const { width } = Dimensions.get('window');

const PushNotification = ({ 
  visible, 
  type = 'info', 
  title, 
  message, 
  onPress, 
  onDismiss, 
  duration = 5000 
}) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animación de entrada
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-dismiss después del tiempo especificado
      const timer = setTimeout(() => {
        dismiss();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const dismiss = () => {
    // Animación de salida
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onDismiss) onDismiss();
    });
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: colors.success,
          icon: '✅',
          borderColor: colors.success,
        };
      case 'error':
        return {
          backgroundColor: colors.error,
          icon: '❌',
          borderColor: colors.error,
        };
      case 'warning':
        return {
          backgroundColor: colors.warning,
          icon: '⚠️',
          borderColor: colors.warning,
        };
      case 'payment':
        return {
          backgroundColor: colors.mendotranGreen,
          icon: '💳',
          borderColor: colors.mendotranGreen,
        };
      case 'route':
        return {
          backgroundColor: colors.mendotranBlue,
          icon: '🚌',
          borderColor: colors.mendotranBlue,
        };
      default:
        return {
          backgroundColor: colors.info,
          icon: 'ℹ️',
          borderColor: colors.info,
        };
    }
  };

  const typeStyles = getTypeStyles();

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <TouchableOpacity
        style={[styles.notification, { borderLeftColor: typeStyles.borderColor }]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {/* Icono del tipo */}
        <View style={[styles.iconContainer, { backgroundColor: typeStyles.backgroundColor }]}>
          <Text style={styles.icon}>{typeStyles.icon}</Text>
        </View>

        {/* Contenido */}
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>

        {/* Botón de cerrar */}
        <TouchableOpacity style={styles.closeButton} onPress={dismiss}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    zIndex: 9999,
  },
  notification: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
    color: colors.background,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  closeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  closeText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
});

export default PushNotification;

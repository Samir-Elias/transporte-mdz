import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView } from 'react-native';
import { colors } from '../../styles/colors';
import { getLineRoute, getActiveBusesForLine } from '../../data/mendozaTransportData';

const LineRouteView = ({ lineId, onClose, onStopPress }) => {
  const [line, setLine] = useState(null);
  const [activeBuses, setActiveBuses] = useState([]);
  const [selectedStop, setSelectedStop] = useState(null);
  const slideAnim = useState(new Animated.Value(300)).current;

  useEffect(() => {
    if (lineId) {
      const lineData = getLineRoute(lineId);
      const buses = getActiveBusesForLine(lineId);
      setLine(lineData);
      setActiveBuses(buses);

      // Animación de entrada
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    }
  }, [lineId]);

  const handleClose = () => {
    Animated.spring(slideAnim, {
      toValue: 300,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start(() => {
      if (onClose) onClose();
    });
  };

  const handleStopPress = (stop) => {
    setSelectedStop(stop);
    if (onStopPress) onStopPress(stop);
  };

  const getTimeColor = (estimatedTime) => {
    if (estimatedTime <= 3) return colors.success;
    if (estimatedTime <= 7) return colors.warning;
    return colors.error;
  };

  const getTimeText = (estimatedTime) => {
    if (estimatedTime <= 1) return 'Llegando';
    if (estimatedTime <= 3) return `${estimatedTime} min`;
    return `${estimatedTime} min`;
  };

  if (!line) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateX: slideAnim }] }
      ]}
    >
      {/* Header de la línea */}
      <View style={[styles.header, { backgroundColor: line.color }]}>
        <View style={styles.headerContent}>
          <Text style={styles.lineName}>{line.name}</Text>
          <Text style={styles.lineDescription}>{line.description}</Text>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Información de la línea */}
      <View style={styles.lineInfo}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Frecuencia:</Text>
          <Text style={styles.infoValue}>{line.frequency}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Horario:</Text>
          <Text style={styles.infoValue}>{line.operatingHours}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Buses activos:</Text>
          <Text style={styles.infoValue}>{activeBuses.length}</Text>
        </View>
      </View>

      {/* Buses en tiempo real */}
      {activeBuses.length > 0 && (
        <View style={styles.busesSection}>
          <Text style={styles.sectionTitle}>🚌 Buses en Servicio</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {activeBuses.map((bus) => (
              <View key={bus.id} style={styles.busCard}>
                <View style={[styles.busColor, { backgroundColor: line.color }]} />
                <Text style={styles.busDirection}>{bus.direction}</Text>
                <Text style={styles.busNextStop}>Próxima: {bus.nextStop}</Text>
                <Text style={styles.busPassengers}>👥 {bus.passengers}</Text>
                <Text style={styles.busSpeed}>🚗 {bus.speed} km/h</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Ruta de la línea */}
      <View style={styles.routeSection}>
        <Text style={styles.sectionTitle}>🗺️ Ruta Completa</Text>
        <ScrollView style={styles.routeList} showsVerticalScrollIndicator={false}>
          {line.route.map((stop, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.routeStop,
                selectedStop?.name === stop.name && styles.selectedRouteStop
              ]}
              onPress={() => handleStopPress(stop)}
            >
              {/* Indicador de parada */}
              <View style={styles.stopIndicator}>
                <View style={[styles.stopDot, { backgroundColor: line.color }]} />
                {index < line.route.length - 1 && (
                  <View style={[styles.stopLine, { backgroundColor: line.color }]} />
                )}
              </View>

              {/* Información de la parada */}
              <View style={styles.stopInfo}>
                <Text style={styles.stopName}>{stop.name}</Text>
                <Text style={styles.stopTime}>
                  {stop.time === 0 ? 'Inicio' : `${stop.time} min`}
                </Text>
              </View>

              {/* Buscar si hay un bus cerca */}
              {activeBuses.map((bus) => {
                const distance = Math.abs(bus.lat - stop.lat) + Math.abs(bus.lng - stop.lng);
                if (distance < 0.01) { // Bus muy cerca
                  return (
                    <View key={bus.id} style={styles.busNearby}>
                      <Text style={styles.busNearbyText}>🚌</Text>
                      <Text style={[
                        styles.busArrivalTime,
                        { color: getTimeColor(bus.estimatedArrival) }
                      ]}>
                        {getTimeText(bus.estimatedArrival)}
                      </Text>
                    </View>
                  );
                }
                return null;
              })}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Botón de cerrar */}
      <TouchableOpacity style={styles.bottomCloseButton} onPress={handleClose}>
        <Text style={styles.bottomCloseButtonText}>Cerrar Ruta</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 320,
    backgroundColor: colors.background,
    shadowColor: colors.shadow,
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    zIndex: 1000,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerContent: {
    flex: 1,
  },
  lineName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.background,
    marginBottom: 4,
  },
  lineDescription: {
    fontSize: 14,
    color: colors.background,
    opacity: 0.9,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
  lineInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  busesSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  busCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    minWidth: 120,
    borderWidth: 1,
    borderColor: colors.border,
  },
  busColor: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    marginBottom: 8,
  },
  busDirection: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  busNextStop: {
    fontSize: 10,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  busPassengers: {
    fontSize: 10,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  busSpeed: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  routeSection: {
    flex: 1,
    padding: 20,
  },
  routeList: {
    flex: 1,
  },
  routeStop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
  },
  selectedRouteStop: {
    backgroundColor: colors.backgroundTertiary,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  stopIndicator: {
    alignItems: 'center',
    marginRight: 16,
  },
  stopDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  stopLine: {
    width: 2,
    height: 30,
    marginTop: 4,
  },
  stopInfo: {
    flex: 1,
  },
  stopName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  stopTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  busNearby: {
    alignItems: 'center',
    marginLeft: 12,
  },
  busNearbyText: {
    fontSize: 16,
    marginBottom: 2,
  },
  busArrivalTime: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  bottomCloseButton: {
    backgroundColor: colors.primary,
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bottomCloseButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LineRouteView;

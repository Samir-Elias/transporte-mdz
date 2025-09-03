import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { colors } from '../../styles/colors';
import { getLinesForStop, getRealTimeArrival } from '../../data/mendozaTransportData';

const BusStopMarker = ({ stop, onPress, isSelected }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [lines, setLines] = useState([]);
  const [realTimeData, setRealTimeData] = useState({});
  const scaleAnim = useState(new Animated.Value(1)).current;

  useEffect(() => {
    // Obtener líneas que pasan por esta parada
    const stopLines = getLinesForStop(stop.id);
    setLines(stopLines);

    // Obtener datos en tiempo real para cada línea
    const timeData = {};
    stopLines.forEach(line => {
      const arrival = getRealTimeArrival(line.id, stop.id);
      if (arrival) {
        timeData[line.id] = arrival;
      }
    });
    setRealTimeData(timeData);
  }, [stop.id]);

  useEffect(() => {
    // Animación de selección
    Animated.spring(scaleAnim, {
      toValue: isSelected ? 1.2 : 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  }, [isSelected]);

  const handlePress = () => {
    setShowInfo(!showInfo);
    if (onPress) onPress(stop);
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

  return (
    <View style={styles.container}>
      {/* Marcador principal */}
      <TouchableOpacity
        style={[styles.marker, isSelected && styles.selectedMarker]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Animated.View style={[styles.markerContent, { transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.markerIcon}>🚏</Text>
          <Text style={styles.markerText}>{stop.name}</Text>
        </Animated.View>
      </TouchableOpacity>

      {/* Información de la parada */}
      {showInfo && (
        <View style={styles.infoCard}>
          {/* Header de la parada */}
          <View style={styles.infoHeader}>
            <Text style={styles.stopName}>{stop.name}</Text>
            <Text style={styles.stopDescription}>{stop.description}</Text>
          </View>

          {/* Líneas que pasan */}
          <View style={styles.linesContainer}>
            <Text style={styles.linesTitle}>Líneas que pasan:</Text>
            {lines.map((line) => {
              const arrival = realTimeData[line.id];
              return (
                <View key={line.id} style={styles.lineItem}>
                  <View style={[styles.lineColor, { backgroundColor: line.color }]} />
                  <View style={styles.lineInfo}>
                    <Text style={styles.lineName}>{line.name}</Text>
                    <Text style={styles.lineDescription}>{line.description}</Text>
                    {arrival ? (
                      <View style={styles.arrivalInfo}>
                        <Text style={[
                          styles.arrivalTime,
                          { color: getTimeColor(arrival.estimatedTime) }
                        ]}>
                          {getTimeText(arrival.estimatedTime)}
                        </Text>
                        <Text style={styles.arrivalDirection}>
                          {arrival.direction}
                        </Text>
                      </View>
                    ) : (
                      <Text style={styles.noArrival}>Sin información</Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>

          {/* Instalaciones */}
          {stop.facilities.length > 0 && (
            <View style={styles.facilitiesContainer}>
              <Text style={styles.facilitiesTitle}>Instalaciones:</Text>
              <View style={styles.facilitiesList}>
                {stop.facilities.map((facility, index) => (
                  <Text key={index} style={styles.facilityItem}>
                    • {facility}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Botón de cerrar */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setShowInfo(false)}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000,
  },
  marker: {
    backgroundColor: colors.mendotranGreen,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: colors.background,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  selectedMarker: {
    backgroundColor: colors.primary,
    borderColor: colors.mendotranRed,
    borderWidth: 3,
  },
  markerContent: {
    alignItems: 'center',
  },
  markerIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  markerText: {
    fontSize: 10,
    color: colors.background,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoCard: {
    position: 'absolute',
    top: 50,
    left: -100,
    width: 280,
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    zIndex: 1001,
  },
  infoHeader: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 12,
  },
  stopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  stopDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  linesContainer: {
    marginBottom: 16,
  },
  linesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  lineItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  lineColor: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
    marginTop: 2,
  },
  lineInfo: {
    flex: 1,
  },
  lineName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 2,
  },
  lineDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  arrivalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  arrivalTime: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  arrivalDirection: {
    fontSize: 12,
    color: colors.textSecondary,
    flex: 1,
  },
  noArrival: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  facilitiesContainer: {
    marginBottom: 16,
  },
  facilitiesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  facilitiesList: {
    gap: 4,
  },
  facilityItem: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default BusStopMarker;

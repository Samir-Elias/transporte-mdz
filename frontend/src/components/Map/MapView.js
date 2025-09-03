import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { colors } from '../../styles/colors';
import { mendotranData } from '../../data/mendozaTransportData';
import BusStopMarker from './BusStopMarker';
import LineRouteView from './LineRouteView';

const { width, height } = Dimensions.get('window');

const MapView = ({ 
  onMapPress,
  showBusStops = true,
  showRoutes = true,
  children 
}) => {
  const [selectedStop, setSelectedStop] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);
  const [showLineRoute, setShowLineRoute] = useState(false);

  const handleStopPress = (stop) => {
    setSelectedStop(stop);
    setSelectedLine(null);
    setShowLineRoute(false);
  };

  const handleLineSelect = (lineId) => {
    setSelectedLine(lineId);
    setShowLineRoute(true);
    setSelectedStop(null);
  };

  const handleCloseLineRoute = () => {
    setShowLineRoute(false);
    setSelectedLine(null);
  };

  const handleStopPressInRoute = (stop) => {
    // Centrar el mapa en la parada seleccionada
    if (onMapPress) {
      onMapPress({ lat: stop.lat, lng: stop.lng });
    }
  };

  return (
    <View style={styles.container}>
      {/* Mapa simulado con calles */}
      <View style={styles.mapContainer}>
        {/* Calles principales */}
        <View style={styles.street} />
        <View style={[styles.street, styles.streetVertical]} />
        <View style={[styles.street, styles.streetDiagonal]} />
        
        {/* Título del mapa */}
        <View style={styles.mapTitle}>
          <Text style={styles.mapTitleText}>🗺️ Mapa de Mendoza</Text>
          <Text style={styles.mapSubtitleText}>Transporte Público</Text>
        </View>

        {/* Paradas de bus */}
        {showBusStops && mendotranData.stops.map((stop) => (
          <BusStopMarker
            key={stop.id}
            stop={stop}
            onPress={handleStopPress}
            isSelected={selectedStop?.id === stop.id}
          />
        ))}

        {/* Buses activos */}
        {showRoutes && mendotranData.activeBuses.map((bus) => (
          <View
            key={bus.id}
            style={[
              styles.busMarker,
              {
                left: ((bus.lng + 68.84) * 1000) % width,
                top: ((bus.lat + 32.89) * 1000) % height,
              }
            ]}
          >
            <View style={[styles.busIcon, { backgroundColor: bus.lineId === '603' ? '#D32F2F' : 
                                                   bus.lineId === '500' ? '#388E3C' : 
                                                   bus.lineId === '305' ? '#1976D2' : '#FF9800' }]}>
              <Text style={styles.busText}>🚌</Text>
            </View>
            <Text style={styles.busLabel}>Línea {bus.lineId}</Text>
            <Text style={styles.busTime}>{bus.estimatedArrival} min</Text>
          </View>
        ))}

        {/* Información de parada seleccionada */}
        {selectedStop && (
          <View style={styles.selectedStopInfo}>
            <View style={styles.stopInfoHeader}>
              <Text style={styles.stopInfoTitle}>{selectedStop.name}</Text>
              <TouchableOpacity 
                style={styles.closeStopInfo}
                onPress={() => setSelectedStop(null)}
              >
                <Text style={styles.closeStopInfoText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.stopInfoDescription}>{selectedStop.description}</Text>
            
            <View style={styles.linesContainer}>
              <Text style={styles.linesTitle}>Líneas que pasan:</Text>
              <View style={styles.linesGrid}>
                {selectedStop.lines.map((lineId) => {
                  const line = mendotranData.lines.find(l => l.id === lineId);
                  if (!line) return null;
                  
                  return (
                    <TouchableOpacity
                      key={lineId}
                      style={[styles.lineButton, { backgroundColor: line.color }]}
                      onPress={() => handleLineSelect(lineId)}
                    >
                      <Text style={styles.lineButtonText}>{line.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        )}

        {/* Componentes hijos (botones flotantes, etc.) */}
        {children}
      </View>

      {/* Vista de ruta de línea */}
      {showLineRoute && selectedLine && (
        <LineRouteView
          lineId={selectedLine}
          onClose={handleCloseLineRoute}
          onStopPress={handleStopPressInRoute}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: colors.mapBackground,
    position: 'relative',
  },
  street: {
    position: 'absolute',
    backgroundColor: colors.street,
    height: 4,
    width: '80%',
    top: '40%',
    left: '10%',
    borderRadius: 2,
  },
  streetVertical: {
    width: 4,
    height: '60%',
    top: '20%',
    left: '50%',
  },
  streetDiagonal: {
    width: '60%',
    height: 4,
    top: '60%',
    left: '20%',
    transform: [{ rotate: '45deg' }],
  },
  mapTitle: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  mapTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.mendotranRed,
    marginBottom: 4,
  },
  mapSubtitleText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  busMarker: {
    position: 'absolute',
    alignItems: 'center',
  },
  busIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  busText: {
    fontSize: 16,
    color: colors.background,
  },
  busLabel: {
    fontSize: 10,
    color: colors.text,
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center',
  },
  busTime: {
    fontSize: 8,
    color: colors.textSecondary,
    marginTop: 2,
  },
  selectedStopInfo: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 20,
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    zIndex: 1000,
  },
  stopInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stopInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  closeStopInfo: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeStopInfoText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  stopInfoDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  linesContainer: {
    marginBottom: 8,
  },
  linesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  linesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  lineButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  lineButtonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default MapView;

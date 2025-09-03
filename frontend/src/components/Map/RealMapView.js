import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

const RealMapView = ({ 
  initialRegion = {
    latitude: -32.8908,  // Mendoza, Argentina
    longitude: -68.8272,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  onMapPress,
  showBusStops = true,
  showRoutes = true,
  children 
}) => {
  const [mapReady, setMapReady] = useState(false);

  // URL del mapa OpenStreetMap con Leaflet
  const mapURL = `https://www.openstreetmap.org/export/embed.html?bbox=${initialRegion.longitude - 0.01},${initialRegion.latitude - 0.01},${initialRegion.longitude + 0.01},${initialRegion.latitude + 0.01}&layer=mapnik&marker=${initialRegion.latitude},${initialRegion.longitude}`;

  useEffect(() => {
    // Simular carga del mapa
    const timer = setTimeout(() => setMapReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!mapReady) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando mapa real de Mendoza...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Mapa real de OpenStreetMap */}
      <iframe
        src={mapURL}
        style={styles.mapFrame}
        title="Mapa de Mendoza"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      
      {/* Componentes hijos (botones flotantes, etc.) */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.mapBackground,
  },
  loadingText: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'System',
  },
  mapFrame: {
    width: '100%',
    height: '100%',
    border: 'none',
    borderRadius: 0,
  },
});

export default RealMapView;

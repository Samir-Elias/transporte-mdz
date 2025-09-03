import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

const SimpleMapView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {/* Título del mapa */}
        <View style={styles.mapTitle}>
          <Text style={styles.mapTitleText}>🗺️ Mapa de Mendoza</Text>
          <Text style={styles.mapSubtitleText}>Transporte Público</Text>
        </View>

        {/* Paradas simples */}
        <View style={styles.stop1}>
          <Text style={styles.stopIcon}>🚏</Text>
          <Text style={styles.stopText}>Centro</Text>
        </View>

        <View style={styles.stop2}>
          <Text style={styles.stopIcon}>🚏</Text>
          <Text style={styles.stopText}>Plaza Independencia</Text>
        </View>

        <View style={styles.stop3}>
          <Text style={styles.stopIcon}>🚏</Text>
          <Text style={styles.stopText}>Hospital Central</Text>
        </View>

        {/* Buses */}
        <View style={styles.bus1}>
          <Text style={styles.busIcon}>🚌</Text>
          <Text style={styles.busText}>Línea 603</Text>
        </View>

        <View style={styles.bus2}>
          <Text style={styles.busIcon}>🚌</Text>
          <Text style={styles.busText}>Línea 500</Text>
        </View>

        {/* Calles */}
        <View style={styles.street1} />
        <View style={styles.street2} />
        <View style={styles.street3} />

        {/* Información */}
        <View style={styles.info}>
          <Text style={styles.infoText}>✅ Mapa funcionando correctamente</Text>
          <Text style={styles.infoSubtext}>Click en las paradas para ver información</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: colors.mapBackground,
    position: 'relative',
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
  stop1: {
    position: 'absolute',
    top: '30%',
    left: '20%',
    backgroundColor: colors.mendotranGreen,
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  stop2: {
    position: 'absolute',
    top: '50%',
    left: '60%',
    backgroundColor: colors.mendotranGreen,
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  stop3: {
    position: 'absolute',
    top: '70%',
    left: '30%',
    backgroundColor: colors.mendotranGreen,
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  stopIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  stopText: {
    fontSize: 12,
    color: colors.background,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bus1: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    backgroundColor: colors.mendotranRed,
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  bus2: {
    position: 'absolute',
    top: '60%',
    left: '70%',
    backgroundColor: colors.mendotranBlue,
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  busIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  busText: {
    fontSize: 12,
    color: colors.background,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  street1: {
    position: 'absolute',
    top: '45%',
    left: '10%',
    right: '10%',
    height: 4,
    backgroundColor: colors.street,
    borderRadius: 2,
  },
  street2: {
    position: 'absolute',
    top: '25%',
    bottom: '25%',
    left: '50%',
    width: 4,
    backgroundColor: colors.street,
    borderRadius: 2,
  },
  street3: {
    position: 'absolute',
    top: '65%',
    left: '20%',
    width: '60%',
    height: 4,
    backgroundColor: colors.street,
    borderRadius: 2,
    transform: [{ rotate: '45deg' }],
  },
  info: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.success,
    marginBottom: 8,
  },
  infoSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default SimpleMapView;

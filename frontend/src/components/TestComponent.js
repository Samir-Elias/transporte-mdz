import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

const TestComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚌 Transporte MDZ</Text>
      <Text style={styles.subtitle}>Mendoza, Argentina</Text>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>🗺️ Mapa de Mendoza</Text>
        <Text style={styles.mapSubtitle}>Centro de la ciudad</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: colors.mapBackground,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  mapText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.mendotranRed,
    marginBottom: 8,
  },
  mapSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default TestComponent;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SimpleMapView from '../../components/Map/SimpleMapView';
import { colors } from '../../styles/colors';

const HomeScreenSimple = () => {
  const navigation = useNavigation();

  const handleRoutePlanner = () => {
    navigation.navigate('RoutePlanner');
  };

  const handlePayment = () => {
    navigation.navigate('Pagos');
  };

  const handleNotifications = () => {
    navigation.navigate('Notifications');
  };

  return (
    <View style={styles.container}>
      {/* Header flotante */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>🚌 Transporte MDZ</Text>
          <Text style={styles.subtitle}>Mendoza, Argentina</Text>
        </View>
      </View>

      {/* Mapa simple */}
      <SimpleMapView />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 1000,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 25,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default HomeScreenSimple;

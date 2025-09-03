import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, SafeAreaView, Alert } from 'react-native';
import Button from '../../components/Button';
import styles from './RoutePlannerScreen.styles';

const RoutePlannerScreen = ({ navigation }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchRoute = async () => {
    if (!origin.trim() || !destination.trim()) {
      Alert.alert('Error', 'Por favor ingresa origen y destino');
      return;
    }

    setIsSearching(true);
    
    try {
      // Aquí se implementará la lógica de búsqueda de rutas
      // Integración con Mendoza Tránsito y Google Maps
      console.log('Buscando ruta:', { origin, destination });
      
      // Simulación de búsqueda
      setTimeout(() => {
        setIsSearching(false);
        Alert.alert(
          'Ruta Encontrada',
          'Se encontró una ruta optimizada. Esta funcionalidad se implementará próximamente.',
          [{ text: 'OK' }]
        );
      }, 2000);
      
    } catch (error) {
      setIsSearching(false);
      Alert.alert('Error', 'No se pudo encontrar la ruta. Intenta nuevamente.');
    }
  };

  const handleUseCurrentLocation = () => {
    // Aquí se implementará la geolocalización
    Alert.alert('Ubicación', 'Esta funcionalidad se implementará próximamente.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Planificar Ruta</Text>
          <Text style={styles.subtitle}>
            Encuentra la mejor manera de llegar a tu destino
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Origen</Text>
            <TextInput
              style={styles.input}
              value={origin}
              onChangeText={setOrigin}
              placeholder="Ingresa tu ubicación de origen"
              placeholderTextColor="#999"
            />
            <Button
              title="Usar ubicación actual"
              onPress={handleUseCurrentLocation}
              variant="outline"
              style={styles.locationButton}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Destino</Text>
            <TextInput
              style={styles.input}
              value={destination}
              onChangeText={setDestination}
              placeholder="¿A dónde vas?"
              placeholderTextColor="#999"
            />
          </View>

          <Button
            title={isSearching ? "Buscando..." : "Buscar Ruta"}
            onPress={handleSearchRoute}
            variant="primary"
            disabled={isSearching}
            style={styles.searchButton}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Información de la Ruta</Text>
          <Text style={styles.infoText}>
            • Combinación de transporte público{'\n'}
            • Tiempo estimado de viaje{'\n'}
            • Distancia a caminar{'\n'}
            • Horarios de micros{'\n'}
            • Costo del boleto
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Características</Text>
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>🚌 Datos en tiempo real de Mendoza Tránsito</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>🗺️ Integración con Google Maps</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>⏰ Estimaciones precisas de llegada</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureText}>♿ Accesibilidad para todos los usuarios</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoutePlannerScreen;

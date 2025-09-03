import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import Button from '../../components/Button';
import styles from './ReportIncidentsScreen.styles';

const ReportIncidentsScreen = ({ navigation }) => {
  const [incidentType, setIncidentType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const incidentTypes = [
    { id: 'delay', label: 'Retraso del Micro', icon: '⏰' },
    { id: 'crowding', label: 'Micro Lleno', icon: '👥' },
    { id: 'maintenance', label: 'Problema Técnico', icon: '🔧' },
    { id: 'driver', label: 'Conductor', icon: '👨‍💼' },
    { id: 'other', label: 'Otro', icon: '📝' }
  ];

  const handleSubmit = async () => {
    if (!incidentType || !description.trim() || !location.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Aquí se implementará el envío del reporte
      console.log('Reportando incidencia:', { incidentType, description, location });
      
      // Simulación de envío
      setTimeout(() => {
        setIsSubmitting(false);
        Alert.alert(
          'Reporte Enviado',
          'Gracias por tu reporte. Lo revisaremos y tomaremos las medidas necesarias.',
          [
            { 
              text: 'OK', 
              onPress: () => {
                setIncidentType('');
                setDescription('');
                setLocation('');
              }
            }
          ]
        );
      }, 2000);
      
    } catch (error) {
      setIsSubmitting(false);
      Alert.alert('Error', 'No se pudo enviar el reporte. Intenta nuevamente.');
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
          <Text style={styles.title}>Reportar Incidencia</Text>
          <Text style={styles.subtitle}>
            Ayúdanos a mejorar el servicio reportando problemas
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Tipo de Incidencia *</Text>
            <View style={styles.typeContainer}>
              {incidentTypes.map(type => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.typeOption,
                    incidentType === type.id && styles.selectedType
                  ]}
                  onPress={() => setIncidentType(type.id)}
                >
                  <Text style={styles.typeIcon}>{type.icon}</Text>
                  <Text style={[
                    styles.typeLabel,
                    incidentType === type.id && styles.selectedTypeLabel
                  ]}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Descripción *</Text>
            <TextInput
              style={styles.textArea}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe detalladamente lo que sucedió..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Ubicación *</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="¿Dónde ocurrió?"
              placeholderTextColor="#999"
            />
            <Button
              title="Usar ubicación actual"
              onPress={handleUseCurrentLocation}
              variant="outline"
              style={styles.locationButton}
            />
          </View>

          <Button
            title={isSubmitting ? "Enviando..." : "Enviar Reporte"}
            onPress={handleSubmit}
            variant="primary"
            disabled={isSubmitting}
            style={styles.submitButton}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Información del Reporte</Text>
          <Text style={styles.infoText}>
            • Tu reporte será revisado por nuestro equipo{'\n'}
            • Mantendremos tu información confidencial{'\n'}
            • Responderemos en un plazo de 24-48 horas{'\n'}
            • Los reportes nos ayudan a mejorar el servicio
          </Text>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Consejos para un buen reporte</Text>
          <Text style={styles.tipsText}>
            • Sé específico sobre la hora y ubicación{'\n'}
            • Incluye detalles relevantes{'\n'}
            • Si es posible, adjunta una foto{'\n'}
            • Mantén un tono respetuoso
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportIncidentsScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, Alert } from 'react-native';
import Button from '../../components/Button';
import QRCodeGenerator from '../../components/QRCode';
import styles from './PaymentScreen.styles';

const PaymentScreen = ({ navigation }) => {
  const [qrValue, setQrValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending');

  useEffect(() => {
    generateQRCode();
  }, []);

  const generateQRCode = async () => {
    setIsGenerating(true);
    
    try {
      // Aquí se implementará la generación del código QR
      // Integración con el sistema de pagos
      const timestamp = new Date().getTime();
      const randomId = Math.random().toString(36).substr(2, 9);
      const qrData = `MDZ_${timestamp}_${randomId}`;
      
      setQrValue(qrData);
      
      // Simulación de generación
      setTimeout(() => {
        setIsGenerating(false);
      }, 1500);
      
    } catch (error) {
      setIsGenerating(false);
      Alert.alert('Error', 'No se pudo generar el código QR. Intenta nuevamente.');
    }
  };

  const handleRefreshQR = () => {
    generateQRCode();
  };

  const handlePaymentHistory = () => {
    // Aquí se implementará el historial de pagos
    Alert.alert('Historial', 'Esta funcionalidad se implementará próximamente.');
  };

  const handlePaymentMethods = () => {
    // Aquí se implementará la gestión de métodos de pago
    Alert.alert('Métodos de Pago', 'Esta funcionalidad se implementará próximamente.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Pago Digital</Text>
          <Text style={styles.subtitle}>
            Genera tu código QR para pagar el boleto
          </Text>
        </View>

        <View style={styles.qrContainer}>
          {isGenerating ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Generando código QR...</Text>
            </View>
          ) : (
            <QRCodeGenerator
              value={qrValue}
              size={250}
              title="Código QR para Pago"
              showValue={true}
            />
          )}
        </View>

        <View style={styles.actionsContainer}>
          <Button
            title="Actualizar QR"
            onPress={handleRefreshQR}
            variant="outline"
            style={styles.actionButton}
          />
          
          <Button
            title="Historial de Pagos"
            onPress={handlePaymentHistory}
            variant="secondary"
            style={styles.actionButton}
          />
          
          <Button
            title="Métodos de Pago"
            onPress={handlePaymentMethods}
            variant="outline"
            style={styles.actionButton}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Información del Pago</Text>
          <Text style={styles.infoText}>
            • Código QR válido por 15 minutos{'\n'}
            • Escanea en el validador del micro{'\n'}
            • Pago seguro y encriptado{'\n'}
            • Recibo digital automático{'\n'}
            • Soporte para múltiples métodos de pago
          </Text>
        </View>

        <View style={styles.securityContainer}>
          <Text style={styles.securityTitle}>🔒 Seguridad</Text>
          <Text style={styles.securityText}>
            Tu información de pago está protegida con encriptación de nivel bancario.
            Los códigos QR son únicos y se invalidan después de cada uso.
          </Text>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>Estado del Pago</Text>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Código QR:</Text>
            <Text style={styles.statusValue}>
              {isGenerating ? 'Generando...' : 'Generado ✓'}
            </Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Válido hasta:</Text>
            <Text style={styles.statusValue}>
              {qrValue ? '15 minutos' : '--'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentScreen;

import React from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import styles from './QRCodeGenerator.styles';

const QRCodeGenerator = ({ 
  value, 
  size = 200, 
  showValue = true,
  title 
}) => {
  if (!value) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se proporcionó valor para el QR</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.qrContainer}>
        <QRCode
          value={value}
          size={size}
          color="black"
          backgroundColor="white"
        />
      </View>
      {showValue && (
        <Text style={styles.valueText} numberOfLines={2}>
          {value}
        </Text>
      )}
    </View>
  );
};

export default QRCodeGenerator;

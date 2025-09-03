import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState(null);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      setPermissionStatus(status);
      
      if (status === 'granted') {
        getCurrentLocation();
      }
    } catch (error) {
      console.error('Error verificando permisos de ubicación:', error);
      setErrorMsg('Error verificando permisos de ubicación');
    }
  };

  const requestPermissions = async () => {
    try {
      setIsLoading(true);
      setErrorMsg(null);
      
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);
      
      if (status === 'granted') {
        await getCurrentLocation();
        return true;
      } else {
        setErrorMsg('Permisos de ubicación denegados');
        return false;
      }
    } catch (error) {
      console.error('Error solicitando permisos de ubicación:', error);
      setErrorMsg('Error solicitando permisos de ubicación');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      setIsLoading(true);
      setErrorMsg(null);
      
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5000,
        distanceInterval: 10,
      });
      
      setLocation(currentLocation);
      return currentLocation;
    } catch (error) {
      console.error('Error obteniendo ubicación actual:', error);
      setErrorMsg('No se pudo obtener la ubicación actual');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const watchLocation = async (callback) => {
    try {
      if (permissionStatus !== 'granted') {
        const granted = await requestPermissions();
        if (!granted) return null;
      }
      
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 10000,
          distanceInterval: 10,
        },
        (newLocation) => {
          setLocation(newLocation);
          if (callback) callback(newLocation);
        }
      );
      
      return subscription;
    } catch (error) {
      console.error('Error observando ubicación:', error);
      setErrorMsg('Error observando ubicación');
      return null;
    }
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      
      if (reverseGeocode.length > 0) {
        const address = reverseGeocode[0];
        return {
          street: address.street || '',
          city: address.city || '',
          region: address.region || '',
          country: address.country || '',
          postalCode: address.postalCode || '',
          name: address.name || '',
          formattedAddress: [
            address.street,
            address.city,
            address.region,
            address.country
          ].filter(Boolean).join(', ')
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error obteniendo dirección:', error);
      throw new Error('No se pudo obtener la dirección');
    }
  };

  const getCoordinatesFromAddress = async (address) => {
    try {
      const geocode = await Location.geocodeAsync(address);
      
      if (geocode.length > 0) {
        return {
          latitude: geocode[0].latitude,
          longitude: geocode[0].longitude,
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error obteniendo coordenadas:', error);
      throw new Error('No se pudo obtener las coordenadas');
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    try {
      const R = 6371; // Radio de la Tierra en km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c; // Distancia en km
      
      return distance;
    } catch (error) {
      console.error('Error calculando distancia:', error);
      return null;
    }
  };

  const calculateBearing = (lat1, lon1, lat2, lon2) => {
    try {
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const lat1Rad = lat1 * Math.PI / 180;
      const lat2Rad = lat2 * Math.PI / 180;
      
      const y = Math.sin(dLon) * Math.cos(lat2Rad);
      const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - 
                Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
      
      let bearing = Math.atan2(y, x) * 180 / Math.PI;
      bearing = (bearing + 360) % 360;
      
      return bearing;
    } catch (error) {
      console.error('Error calculando rumbo:', error);
      return null;
    }
  };

  const formatDistance = (distanceInKm) => {
    if (distanceInKm < 1) {
      return `${Math.round(distanceInKm * 1000)}m`;
    } else if (distanceInKm < 10) {
      return `${distanceInKm.toFixed(1)}km`;
    } else {
      return `${Math.round(distanceInKm)}km`;
    }
  };

  const isLocationNearby = (lat1, lon1, lat2, lon2, maxDistanceKm = 0.5) => {
    const distance = calculateDistance(lat1, lon1, lat2, lon2);
    return distance !== null && distance <= maxDistanceKm;
  };

  return {
    location,
    errorMsg,
    isLoading,
    permissionStatus,
    requestPermissions,
    getCurrentLocation,
    watchLocation,
    getAddressFromCoordinates,
    getCoordinatesFromAddress,
    calculateDistance,
    calculateBearing,
    formatDistance,
    isLocationNearby,
    checkPermissions
  };
};

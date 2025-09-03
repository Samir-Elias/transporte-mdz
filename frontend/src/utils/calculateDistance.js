// Utilidades para cálculos de distancia y geolocalización

/**
 * Radio de la Tierra en kilómetros
 */
const EARTH_RADIUS_KM = 6371;

/**
 * Radio de la Tierra en millas
 */
const EARTH_RADIUS_MILES = 3959;

/**
 * Calcula la distancia entre dos puntos usando la fórmula de Haversine
 * @param {number} lat1 - Latitud del primer punto en grados decimales
 * @param {number} lon1 - Longitud del primer punto en grados decimales
 * @param {number} lat2 - Latitud del segundo punto en grados decimales
 * @param {number} lon2 - Longitud del segundo punto en grados decimales
 * @param {string} unit - Unidad de medida ('km' o 'miles', default: 'km')
 * @returns {number} Distancia entre los dos puntos
 */
export const calculateDistance = (lat1, lon1, lat2, lon2, unit = 'km') => {
  try {
    // Validar parámetros
    if (typeof lat1 !== 'number' || typeof lon1 !== 'number' || 
        typeof lat2 !== 'number' || typeof lon2 !== 'number') {
      throw new Error('Todos los parámetros deben ser números');
    }
    
    if (lat1 < -90 || lat1 > 90 || lat2 < -90 || lat2 > 90) {
      throw new Error('Las latitudes deben estar entre -90 y 90 grados');
    }
    
    if (lon1 < -180 || lon1 > 180 || lon2 < -180 || lon2 > 180) {
      throw new Error('Las longitudes deben estar entre -180 y 180 grados');
    }
    
    // Convertir grados a radianes
    const lat1Rad = lat1 * Math.PI / 180;
    const lon1Rad = lon1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
    const lon2Rad = lon2 * Math.PI / 180;
    
    // Diferencia de coordenadas
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;
    
    // Fórmula de Haversine
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
               Math.cos(lat1Rad) * Math.cos(lat2Rad) *
               Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    // Calcular distancia
    const radius = unit === 'miles' ? EARTH_RADIUS_MILES : EARTH_RADIUS_KM;
    const distance = radius * c;
    
    return distance;
  } catch (error) {
    console.error('Error calculando distancia:', error);
    return null;
  }
};

/**
 * Calcula la distancia en línea recta entre dos puntos (más rápida pero menos precisa)
 * @param {number} lat1 - Latitud del primer punto
 * @param {number} lon1 - Longitud del primer punto
 * @param {number} lat2 - Latitud del segundo punto
 * @param {number} lon2 - Longitud del segundo punto
 * @param {string} unit - Unidad de medida ('km' o 'miles', default: 'km')
 * @returns {number} Distancia aproximada entre los dos puntos
 */
export const calculateApproximateDistance = (lat1, lon1, lat2, lon2, unit = 'km') => {
  try {
    // Validar parámetros
    if (typeof lat1 !== 'number' || typeof lon1 !== 'number' || 
        typeof lat2 !== 'number' || typeof lon2 !== 'number') {
      throw new Error('Todos los parámetros deben ser números');
    }
    
    // Convertir a radianes
    const lat1Rad = lat1 * Math.PI / 180;
    const lon1Rad = lon1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
    const lon2Rad = lon2 * Math.PI / 180;
    
    // Diferencia de coordenadas
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;
    
    // Fórmula simplificada
    const distance = Math.sqrt(dLat * dLat + dLon * dLon);
    
    // Convertir a unidades terrestres
    const radius = unit === 'miles' ? EARTH_RADIUS_MILES : EARTH_RADIUS_KM;
    return distance * radius;
  } catch (error) {
    console.error('Error calculando distancia aproximada:', error);
    return null;
  }
};

/**
 * Calcula el rumbo (dirección) entre dos puntos
 * @param {number} lat1 - Latitud del punto de origen
 * @param {number} lon1 - Longitud del punto de origen
 * @param {number} lat2 - Latitud del punto de destino
 * @param {number} lon2 - Longitud del punto de destino
 * @returns {number} Rumbo en grados (0-360, donde 0 es Norte)
 */
export const calculateBearing = (lat1, lon1, lat2, lon2) => {
  try {
    // Validar parámetros
    if (typeof lat1 !== 'number' || typeof lon1 !== 'number' || 
        typeof lat2 !== 'number' || typeof lon2 !== 'number') {
      throw new Error('Todos los parámetros deben ser números');
    }
    
    // Convertir a radianes
    const lat1Rad = lat1 * Math.PI / 180;
    const lon1Rad = lon1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
    const lon2Rad = lon2 * Math.PI / 180;
    
    // Diferencia de longitudes
    const dLon = lon2Rad - lon1Rad;
    
    // Calcular rumbo
    const y = Math.sin(dLon) * Math.cos(lat2Rad);
    const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - 
              Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
    
    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    
    // Normalizar a 0-360 grados
    bearing = (bearing + 360) % 360;
    
    return bearing;
  } catch (error) {
    console.error('Error calculando rumbo:', error);
    return null;
  }
};

/**
 * Convierte una distancia de kilómetros a millas
 * @param {number} kilometers - Distancia en kilómetros
 * @returns {number} Distancia en millas
 */
export const kilometersToMiles = (kilometers) => {
  try {
    if (typeof kilometers !== 'number' || kilometers < 0) {
      throw new Error('La distancia debe ser un número positivo');
    }
    
    return kilometers * 0.621371;
  } catch (error) {
    console.error('Error convirtiendo kilómetros a millas:', error);
    return null;
  }
};

/**
 * Convierte una distancia de millas a kilómetros
 * @param {number} miles - Distancia en millas
 * @returns {number} Distancia en kilómetros
 */
export const milesToKilometers = (miles) => {
  try {
    if (typeof miles !== 'number' || miles < 0) {
      throw new Error('La distancia debe ser un número positivo');
    }
    
    return miles * 1.60934;
  } catch (error) {
    console.error('Error convirtiendo millas a kilómetros:', error);
    return null;
  }
};

/**
 * Formatea una distancia para mostrar de manera legible
 * @param {number} distance - Distancia en kilómetros
 * @param {string} unit - Unidad de medida ('km' o 'miles', default: 'km')
 * @returns {string} Distancia formateada
 */
export const formatDistance = (distance, unit = 'km') => {
  try {
    if (typeof distance !== 'number' || distance < 0) {
      throw new Error('La distancia debe ser un número positivo');
    }
    
    if (unit === 'miles') {
      if (distance < 1) {
        return `${Math.round(distance * 5280)} ft`;
      } else if (distance < 10) {
        return `${distance.toFixed(1)} mi`;
      } else {
        return `${Math.round(distance)} mi`;
      }
    } else {
      if (distance < 1) {
        return `${Math.round(distance * 1000)}m`;
      } else if (distance < 10) {
        return `${distance.toFixed(1)}km`;
      } else {
        return `${Math.round(distance)}km`;
      }
    }
  } catch (error) {
    console.error('Error formateando distancia:', error);
    return 'Distancia inválida';
  }
};

/**
 * Verifica si dos puntos están dentro de una distancia máxima
 * @param {number} lat1 - Latitud del primer punto
 * @param {number} lon1 - Longitud del primer punto
 * @param {number} lat2 - Latitud del segundo punto
 * @param {number} lon2 - Longitud del segundo punto
 * @param {number} maxDistance - Distancia máxima en kilómetros
 * @returns {boolean} True si los puntos están dentro de la distancia máxima
 */
export const isWithinDistance = (lat1, lon1, lat2, lon2, maxDistance) => {
  try {
    if (typeof maxDistance !== 'number' || maxDistance < 0) {
      throw new Error('La distancia máxima debe ser un número positivo');
    }
    
    const distance = calculateDistance(lat1, lon1, lat2, lon2, 'km');
    
    if (distance === null) {
      return false;
    }
    
    return distance <= maxDistance;
  } catch (error) {
    console.error('Error verificando distancia:', error);
    return false;
  }
};

/**
 * Calcula el punto medio entre dos coordenadas
 * @param {number} lat1 - Latitud del primer punto
 * @param {number} lon1 - Longitud del primer punto
 * @param {number} lat2 - Latitud del segundo punto
 * @param {number} lon2 - Longitud del segundo punto
 * @returns {object} Objeto con latitud y longitud del punto medio
 */
export const calculateMidpoint = (lat1, lon1, lat2, lon2) => {
  try {
    // Validar parámetros
    if (typeof lat1 !== 'number' || typeof lon1 !== 'number' || 
        typeof lat2 !== 'number' || typeof lon2 !== 'number') {
      throw new Error('Todos los parámetros deben ser números');
    }
    
    // Convertir a radianes
    const lat1Rad = lat1 * Math.PI / 180;
    const lon1Rad = lon1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
    const lon2Rad = lon2 * Math.PI / 180;
    
    // Calcular punto medio
    const midLat = (lat1Rad + lat2Rad) / 2;
    const midLon = (lon1Rad + lon2Rad) / 2;
    
    // Convertir de vuelta a grados
    return {
      latitude: midLat * 180 / Math.PI,
      longitude: midLon * 180 / Math.PI
    };
  } catch (error) {
    console.error('Error calculando punto medio:', error);
    return null;
  }
};

/**
 * Calcula el área de un polígono definido por coordenadas
 * @param {Array} coordinates - Array de objetos con lat y lng
 * @param {string} unit - Unidad de medida ('km2' o 'miles2', default: 'km2')
 * @returns {number} Área del polígono
 */
export const calculatePolygonArea = (coordinates, unit = 'km2') => {
  try {
    if (!Array.isArray(coordinates) || coordinates.length < 3) {
      throw new Error('Se necesitan al menos 3 coordenadas para formar un polígono');
    }
    
    let area = 0;
    const n = coordinates.length;
    
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      const lat1 = coordinates[i].lat * Math.PI / 180;
      const lon1 = coordinates[i].lng * Math.PI / 180;
      const lat2 = coordinates[j].lat * Math.PI / 180;
      const lon2 = coordinates[j].lng * Math.PI / 180;
      
      area += (lon2 - lon1) * (2 + Math.sin(lat1) + Math.sin(lat2));
    }
    
    area = Math.abs(area * EARTH_RADIUS_KM * EARTH_RADIUS_KM / 2);
    
    if (unit === 'miles2') {
      area = area * 0.386102;
    }
    
    return area;
  } catch (error) {
    console.error('Error calculando área del polígono:', error);
    return null;
  }
};

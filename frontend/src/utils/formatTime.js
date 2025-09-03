// Utilidades para formateo y manipulación de tiempo

/**
 * Formatea una fecha en formato legible
 * @param {Date|string} date - Fecha a formatear
 * @param {string} locale - Locale para el formateo (default: 'es-AR')
 * @returns {string} Fecha formateada
 */
export const formatDate = (date, locale = 'es-AR') => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      throw new Error('Fecha inválida');
    }
    
    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formateando fecha:', error);
    return 'Fecha inválida';
  }
};

/**
 * Formatea una hora en formato legible
 * @param {Date|string} date - Fecha/hora a formatear
 * @param {string} locale - Locale para el formateo (default: 'es-AR')
 * @returns {string} Hora formateada
 */
export const formatTime = (date, locale = 'es-AR') => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      throw new Error('Fecha inválida');
    }
    
    return dateObj.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    console.error('Error formateando hora:', error);
    return 'Hora inválida';
  }
};

/**
 * Formatea una fecha y hora completa
 * @param {Date|string} date - Fecha/hora a formatear
 * @param {string} locale - Locale para el formateo (default: 'es-AR')
 * @returns {string} Fecha y hora formateada
 */
export const formatDateTime = (date, locale = 'es-AR') => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      throw new Error('Fecha inválida');
    }
    
    return dateObj.toLocaleString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    console.error('Error formateando fecha y hora:', error);
    return 'Fecha y hora inválida';
  }
};

/**
 * Formatea un tiempo relativo (ej: "hace 5 minutos")
 * @param {Date|string} date - Fecha a comparar
 * @param {Date} baseDate - Fecha base para la comparación (default: ahora)
 * @param {string} locale - Locale para el formateo (default: 'es-AR')
 * @returns {string} Tiempo relativo formateado
 */
export const formatRelativeTime = (date, baseDate = new Date(), locale = 'es-AR') => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      throw new Error('Fecha inválida');
    }
    
    const now = baseDate instanceof Date ? baseDate : new Date(baseDate);
    const diffInMs = now.getTime() - dateObj.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInMinutes < 1) {
      return 'Ahora';
    } else if (diffInMinutes < 60) {
      return `Hace ${diffInMinutes} minuto${diffInMinutes !== 1 ? 's' : ''}`;
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} hora${diffInHours !== 1 ? 's' : ''}`;
    } else if (diffInDays < 7) {
      return `Hace ${diffInDays} día${diffInDays !== 1 ? 's' : ''}`;
    } else {
      return formatDate(dateObj, locale);
    }
  } catch (error) {
    console.error('Error formateando tiempo relativo:', error);
    return 'Tiempo inválido';
  }
};

/**
 * Formatea una duración en minutos a formato legible
 * @param {number} minutes - Duración en minutos
 * @returns {string} Duración formateada
 */
export const formatDuration = (minutes) => {
  try {
    if (typeof minutes !== 'number' || minutes < 0) {
      throw new Error('Duración inválida');
    }
    
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      
      if (remainingMinutes === 0) {
        return `${hours}h`;
      } else {
        return `${hours}h ${remainingMinutes}min`;
      }
    }
  } catch (error) {
    console.error('Error formateando duración:', error);
    return 'Duración inválida';
  }
};

/**
 * Formatea un tiempo de llegada estimado
 * @param {number} estimatedMinutes - Minutos estimados hasta la llegada
 * @returns {string} Tiempo de llegada formateado
 */
export const formatArrivalTime = (estimatedMinutes) => {
  try {
    if (typeof estimatedMinutes !== 'number' || estimatedMinutes < 0) {
      throw new Error('Tiempo estimado inválido');
    }
    
    if (estimatedMinutes === 0) {
      return 'Llegando ahora';
    } else if (estimatedMinutes === 1) {
      return 'Llega en 1 minuto';
    } else if (estimatedMinutes < 60) {
      return `Llega en ${estimatedMinutes} minutos`;
    } else {
      const hours = Math.floor(estimatedMinutes / 60);
      const remainingMinutes = estimatedMinutes % 60;
      
      if (remainingMinutes === 0) {
        return `Llega en ${hours} hora${hours !== 1 ? 's' : ''}`;
      } else {
        return `Llega en ${hours}h ${remainingMinutes}min`;
      }
    }
  } catch (error) {
    console.error('Error formateando tiempo de llegada:', error);
    return 'Tiempo estimado inválido';
  }
};

/**
 * Convierte una hora en formato string a minutos desde medianoche
 * @param {string} timeString - Hora en formato "HH:MM"
 * @returns {number} Minutos desde medianoche
 */
export const timeStringToMinutes = (timeString) => {
  try {
    if (typeof timeString !== 'string') {
      throw new Error('Formato de hora inválido');
    }
    
    const [hours, minutes] = timeString.split(':').map(Number);
    
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      throw new Error('Formato de hora inválido');
    }
    
    return hours * 60 + minutes;
  } catch (error) {
    console.error('Error convirtiendo hora a minutos:', error);
    return null;
  }
};

/**
 * Convierte minutos desde medianoche a formato string
 * @param {number} minutes - Minutos desde medianoche
 * @returns {string} Hora en formato "HH:MM"
 */
export const minutesToTimeString = (minutes) => {
  try {
    if (typeof minutes !== 'number' || minutes < 0 || minutes >= 24 * 60) {
      throw new Error('Minutos inválidos');
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
  } catch (error) {
    console.error('Error convirtiendo minutos a hora:', error);
    return '00:00';
  }
};

/**
 * Calcula la diferencia de tiempo entre dos fechas
 * @param {Date|string} date1 - Primera fecha
 * @param {Date|string} date2 - Segunda fecha
 * @returns {object} Objeto con la diferencia en diferentes unidades
 */
export const getTimeDifference = (date1, date2) => {
  try {
    const dateObj1 = typeof date1 === 'string' ? new Date(date1) : date1;
    const dateObj2 = typeof date2 === 'string' ? new Date(date2) : date2;
    
    if (isNaN(dateObj1.getTime()) || isNaN(dateObj2.getTime())) {
      throw new Error('Fechas inválidas');
    }
    
    const diffInMs = Math.abs(dateObj2.getTime() - dateObj1.getTime());
    
    return {
      milliseconds: diffInMs,
      seconds: Math.floor(diffInMs / 1000),
      minutes: Math.floor(diffInMs / (1000 * 60)),
      hours: Math.floor(diffInMs / (1000 * 60 * 60)),
      days: Math.floor(diffInMs / (1000 * 60 * 60 * 24)),
    };
  } catch (error) {
    console.error('Error calculando diferencia de tiempo:', error);
    return null;
  }
};

/**
 * Verifica si una fecha está en el futuro
 * @param {Date|string} date - Fecha a verificar
 * @returns {boolean} True si la fecha está en el futuro
 */
export const isFutureDate = (date) => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      throw new Error('Fecha inválida');
    }
    
    return dateObj > new Date();
  } catch (error) {
    console.error('Error verificando fecha futura:', error);
    return false;
  }
};

/**
 * Verifica si una fecha está en el pasado
 * @param {Date|string} date - Fecha a verificar
 * @returns {boolean} True si la fecha está en el pasado
 */
export const isPastDate = (date) => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(dateObj.getTime())) {
      throw new Error('Fecha inválida');
    }
    
    return dateObj < new Date();
  } catch (error) {
    console.error('Error verificando fecha pasada:', error);
    return false;
  }
};

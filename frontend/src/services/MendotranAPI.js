// Servicio para interactuar con la API de Mendoza Tránsito
// Este archivo contendrá todas las funciones necesarias para obtener datos del transporte público

class MendotranAPI {
  constructor() {
    this.baseURL = 'https://api.mendotran.gob.ar'; // URL de ejemplo
    this.apiKey = null; // Se configurará desde variables de entorno
  }

  // Configurar la API key
  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  // Obtener líneas de transporte disponibles
  async getBusLines() {
    try {
      // Aquí se implementará la llamada real a la API
      // Por ahora retornamos datos de ejemplo
      return [
        { id: '401', name: 'Línea 401', description: 'Centro - Godoy Cruz' },
        { id: '402', name: 'Línea 402', description: 'Centro - Las Heras' },
        { id: '403', name: 'Línea 403', description: 'Centro - Maipú' },
        { id: '404', name: 'Línea 404', description: 'Centro - Guaymallén' },
        { id: '405', name: 'Línea 405', description: 'Centro - Luján de Cuyo' }
      ];
    } catch (error) {
      console.error('Error obteniendo líneas de transporte:', error);
      throw new Error('No se pudieron obtener las líneas de transporte');
    }
  }

  // Obtener paradas de una línea específica
  async getBusStops(lineId) {
    try {
      // Aquí se implementará la llamada real a la API
      // Por ahora retornamos datos de ejemplo
      const stops = {
        '401': [
          { id: '401_001', name: 'Plaza Independencia', lat: -32.8867, lng: -68.8271 },
          { id: '401_002', name: 'San Martín y Garibaldi', lat: -32.8865, lng: -68.8275 },
          { id: '401_003', name: 'Godoy Cruz y San Juan', lat: -32.8860, lng: -68.8280 }
        ],
        '402': [
          { id: '402_001', name: 'Plaza Independencia', lat: -32.8867, lng: -68.8271 },
          { id: '402_002', name: 'Las Heras y San Martín', lat: -32.8862, lng: -68.8278 },
          { id: '402_003', name: 'Las Heras y Belgrano', lat: -32.8858, lng: -68.8285 }
        ]
      };
      
      return stops[lineId] || [];
    } catch (error) {
      console.error('Error obteniendo paradas:', error);
      throw new Error('No se pudieron obtener las paradas');
    }
  }

  // Obtener horarios de una línea
  async getBusSchedule(lineId, direction = 'outbound') {
    try {
      // Aquí se implementará la llamada real a la API
      // Por ahora retornamos datos de ejemplo
      const schedules = {
        '401': {
          outbound: ['06:00', '06:15', '06:30', '06:45', '07:00', '07:15', '07:30'],
          inbound: ['06:10', '06:25', '06:40', '06:55', '07:10', '07:25', '07:40']
        },
        '402': {
          outbound: ['06:05', '06:20', '06:35', '06:50', '07:05', '07:20', '07:35'],
          inbound: ['06:15', '06:30', '06:45', '07:00', '07:15', '07:30', '07:45']
        }
      };
      
      return schedules[lineId]?.[direction] || [];
    } catch (error) {
      console.error('Error obteniendo horarios:', error);
      throw new Error('No se pudieron obtener los horarios');
    }
  }

  // Obtener tiempo real de llegada de micros a una parada
  async getRealTimeArrivals(stopId) {
    try {
      // Aquí se implementará la llamada real a la API
      // Por ahora retornamos datos de ejemplo
      const arrivals = [
        {
          lineId: '401',
          lineName: 'Línea 401',
          destination: 'Godoy Cruz',
          estimatedArrival: 5, // minutos
          vehicleId: '401_001'
        },
        {
          lineId: '402',
          lineName: 'Línea 402',
          destination: 'Las Heras',
          estimatedArrival: 8, // minutos
          vehicleId: '402_003'
        }
      ];
      
      return arrivals;
    } catch (error) {
      console.error('Error obteniendo llegadas en tiempo real:', error);
      throw new Error('No se pudieron obtener las llegadas en tiempo real');
    }
  }

  // Obtener estado del servicio (normal, retrasos, cancelaciones)
  async getServiceStatus() {
    try {
      // Aquí se implementará la llamada real a la API
      // Por ahora retornamos datos de ejemplo
      return {
        status: 'normal',
        lastUpdate: new Date().toISOString(),
        alerts: [
          {
            id: 'alert_001',
            type: 'delay',
            lineId: '401',
            description: 'Retraso de 10 minutos en la línea 401',
            severity: 'medium'
          }
        ]
      };
    } catch (error) {
      console.error('Error obteniendo estado del servicio:', error);
      throw new Error('No se pudo obtener el estado del servicio');
    }
  }

  // Obtener ruta optimizada entre dos puntos
  async getOptimizedRoute(origin, destination, preferences = {}) {
    try {
      // Aquí se implementará la llamada real a la API
      // Por ahora retornamos datos de ejemplo
      const route = {
        id: 'route_001',
        origin: origin,
        destination: destination,
        totalTime: 25, // minutos
        totalDistance: 3.2, // km
        walkingDistance: 0.5, // km
        segments: [
          {
            type: 'walking',
            duration: 5,
            distance: 0.5,
            instructions: 'Caminar hacia la parada de Plaza Independencia'
          },
          {
            type: 'bus',
            lineId: '401',
            lineName: 'Línea 401',
            duration: 15,
            distance: 2.5,
            origin: 'Plaza Independencia',
            destination: 'Godoy Cruz y San Juan'
          },
          {
            type: 'walking',
            duration: 5,
            distance: 0.2,
            instructions: 'Caminar hacia el destino final'
          }
        ],
        cost: 45, // pesos
        alternatives: []
      };
      
      return route;
    } catch (error) {
      console.error('Error obteniendo ruta optimizada:', error);
      throw new Error('No se pudo obtener la ruta optimizada');
    }
  }

  // Obtener información de un vehículo específico
  async getVehicleInfo(vehicleId) {
    try {
      // Aquí se implementará la llamada real a la API
      // Por ahora retornamos datos de ejemplo
      return {
        id: vehicleId,
        lineId: vehicleId.split('_')[0],
        currentLocation: {
          lat: -32.8867,
          lng: -68.8271
        },
        speed: 25, // km/h
        heading: 180, // grados
        lastUpdate: new Date().toISOString(),
        capacity: 50,
        occupied: 35
      };
    } catch (error) {
      console.error('Error obteniendo información del vehículo:', error);
      throw new Error('No se pudo obtener la información del vehículo');
    }
  }
}

export default new MendotranAPI();

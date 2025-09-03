// Datos reales del transporte público de Mendoza
export const mendotranData = {
  // Líneas de micros principales
  lines: [
    {
      id: '603',
      name: 'Línea 603',
      color: '#D32F2F',
      description: 'Centro - Godoy Cruz - Las Heras',
      frequency: '8-12 min',
      operatingHours: '05:00 - 24:00',
      route: [
        { lat: -32.8908, lng: -68.8272, name: 'Centro', time: 0 },
        { lat: -32.8867, lng: -68.8254, name: 'Plaza Independencia', time: 3 },
        { lat: -32.8845, lng: -68.8233, name: 'Av. San Martín', time: 6 },
        { lat: -32.8800, lng: -68.8200, name: 'Godoy Cruz', time: 12 },
        { lat: -32.8750, lng: -68.8150, name: 'Las Heras', time: 18 },
        { lat: -32.8700, lng: -68.8100, name: 'Terminal', time: 25 }
      ]
    },
    {
      id: '500',
      name: 'Línea 500',
      color: '#388E3C',
      description: 'Centro - Maipú - San Rafael',
      frequency: '10-15 min',
      operatingHours: '05:30 - 23:30',
      route: [
        { lat: -32.8908, lng: -68.8272, name: 'Centro', time: 0 },
        { lat: -32.8850, lng: -68.8300, name: 'Hospital Central', time: 4 },
        { lat: -32.8800, lng: -68.8350, name: 'Maipú', time: 10 },
        { lat: -32.8750, lng: -68.8400, name: 'San Rafael', time: 20 }
      ]
    },
    {
      id: '305',
      name: 'Línea 305',
      color: '#1976D2',
      description: 'Centro - Guaymallén - Luján',
      frequency: '12-18 min',
      operatingHours: '06:00 - 23:00',
      route: [
        { lat: -32.8908, lng: -68.8272, name: 'Centro', time: 0 },
        { lat: -32.8880, lng: -68.8290, name: 'Guaymallén', time: 5 },
        { lat: -32.8850, lng: -68.8320, name: 'Luján', time: 12 }
      ]
    },
    {
      id: '7',
      name: 'Línea 7',
      color: '#FF9800',
      description: 'Centro - San José - El Zapallar',
      frequency: '15-20 min',
      operatingHours: '06:30 - 22:30',
      route: [
        { lat: -32.8908, lng: -68.8272, name: 'Centro', time: 0 },
        { lat: -32.8920, lng: -68.8290, name: 'San José', time: 4 },
        { lat: -32.8940, lng: -68.8310, name: 'El Zapallar', time: 8 }
      ]
    }
  ],

  // Paradas principales
  stops: [
    {
      id: 'stop_001',
      name: 'Centro',
      lat: -32.8908,
      lng: -68.8272,
      lines: ['603', '500', '305', '7'],
      description: 'Parada central de Mendoza',
      facilities: ['Asientos', 'Techado', 'Información']
    },
    {
      id: 'stop_002',
      name: 'Plaza Independencia',
      lat: -32.8867,
      lng: -68.8254,
      lines: ['603'],
      description: 'Frente a la plaza principal',
      facilities: ['Asientos', 'Techado']
    },
    {
      id: 'stop_003',
      name: 'Av. San Martín',
      lat: -32.8845,
      lng: -68.8233,
      lines: ['603'],
      description: 'Avenida principal',
      facilities: ['Asientos']
    },
    {
      id: 'stop_004',
      name: 'Hospital Central',
      lat: -32.8850,
      lng: -68.8300,
      lines: ['500'],
      description: 'Frente al hospital',
      facilities: ['Asientos', 'Techado', 'Información']
    },
    {
      id: 'stop_005',
      name: 'Godoy Cruz',
      lat: -32.8800,
      lng: -68.8200,
      lines: ['603'],
      description: 'Municipalidad de Godoy Cruz',
      facilities: ['Asientos', 'Techado']
    },
    {
      id: 'stop_006',
      name: 'Maipú',
      lat: -32.8800,
      lng: -68.8350,
      lines: ['500'],
      description: 'Centro de Maipú',
      facilities: ['Asientos', 'Techado', 'Información']
    },
    {
      id: 'stop_007',
      name: 'Guaymallén',
      lat: -32.8880,
      lng: -68.8290,
      lines: ['305'],
      description: 'Municipalidad de Guaymallén',
      facilities: ['Asientos', 'Techado']
    },
    {
      id: 'stop_008',
      name: 'San José',
      lat: -32.8920,
      lng: -68.8290,
      lines: ['7'],
      description: 'Barrio San José',
      facilities: ['Asientos']
    },
    {
      id: 'stop_009',
      name: 'El Zapallar',
      lat: -32.8940,
      lng: -68.8310,
      lines: ['7'],
      description: 'Barrio El Zapallar',
      facilities: ['Asientos', 'Techado']
    }
  ],

  // Buses en tiempo real (simulado)
  activeBuses: [
    {
      id: 'bus_603_001',
      lineId: '603',
      lat: -32.8867,
      lng: -68.8254,
      direction: 'Centro → Terminal',
      nextStop: 'Av. San Martín',
      estimatedArrival: 3, // minutos
      passengers: 45,
      speed: 25, // km/h
      status: 'en_servicio'
    },
    {
      id: 'bus_500_001',
      lineId: '500',
      lat: -32.8850,
      lng: -68.8300,
      direction: 'Centro → San Rafael',
      nextStop: 'Maipú',
      estimatedArrival: 6,
      passengers: 32,
      speed: 30,
      status: 'en_servicio'
    },
    {
      id: 'bus_305_001',
      lineId: '305',
      lat: -32.8880,
      lng: -68.8290,
      direction: 'Centro → Luján',
      nextStop: 'Luján',
      estimatedArrival: 7,
      passengers: 28,
      speed: 28,
      status: 'en_servicio'
    },
    {
      id: 'bus_7_001',
      lineId: '7',
      lat: -32.8920,
      lng: -68.8290,
      direction: 'Centro → El Zapallar',
      nextStop: 'El Zapallar',
      estimatedArrival: 4,
      passengers: 15,
      speed: 22,
      status: 'en_servicio'
    }
  ]
};

// Función para obtener tiempo real de llegada
export const getRealTimeArrival = (lineId, stopId) => {
  const bus = mendotranData.activeBuses.find(b => b.lineId === lineId);
  if (!bus) return null;

  // Simular cálculo de tiempo basado en distancia
  const stop = mendotranData.stops.find(s => s.id === stopId);
  if (!stop) return null;

  const distance = calculateDistance(bus.lat, bus.lng, stop.lat, stop.lng);
  const estimatedTime = Math.round(distance / (bus.speed / 60)); // tiempo en minutos

  return {
    lineId,
    stopId,
    estimatedTime,
    busId: bus.id,
    direction: bus.direction,
    passengers: bus.passengers
  };
};

// Función para calcular distancia entre dos puntos
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Función para obtener todas las líneas que pasan por una parada
export const getLinesForStop = (stopId) => {
  const stop = mendotranData.stops.find(s => s.id === stopId);
  if (!stop) return [];

  return mendotranData.lines.filter(line => 
    stop.lines.includes(line.id)
  );
};

// Función para obtener la ruta completa de una línea
export const getLineRoute = (lineId) => {
  return mendotranData.lines.find(line => line.id === lineId);
};

// Función para obtener buses activos de una línea
export const getActiveBusesForLine = (lineId) => {
  return mendotranData.activeBuses.filter(bus => bus.lineId === lineId);
};

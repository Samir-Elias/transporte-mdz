const express = require('express');
const router = express.Router();

// GET /api/mendotran/stops - Obtener todas las paradas
router.get('/stops', async (req, res) => {
  try {
    // TODO: Implementar integración con API de Mendotran
    res.status(200).json({
      success: true,
      message: 'Paradas obtenidas exitosamente',
      data: {
        stops: [
          {
            id: 'stop-001',
            name: 'Centro',
            location: { lat: -32.8869, lng: -68.8272 },
            lines: ['603', '500', '305'],
            facilities: ['shelter', 'bench', 'lighting'],
            accessibility: true
          },
          {
            id: 'stop-002',
            name: 'Plaza Independencia',
            location: { lat: -32.8875, lng: -68.8280 },
            lines: ['603', '500'],
            facilities: ['shelter', 'bench', 'lighting', 'ticket_machine'],
            accessibility: true
          },
          {
            id: 'stop-003',
            name: 'Hospital Central',
            location: { lat: -32.8880, lng: -68.8265 },
            lines: ['603', '305'],
            facilities: ['shelter', 'bench'],
            accessibility: true
          }
        ]
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
});

// GET /api/mendotran/lines - Obtener todas las líneas
router.get('/lines', async (req, res) => {
  try {
    // TODO: Implementar integración con API de Mendotran
    res.status(200).json({
      success: true,
      message: 'Líneas obtenidas exitosamente',
      data: {
        lines: [
          {
            id: '603',
            name: 'Línea 603',
            description: 'Centro - Hospital Central',
            color: '#FF0000',
            stops: ['stop-001', 'stop-002', 'stop-003'],
            frequency: 'Cada 10 minutos',
            firstBus: '05:00',
            lastBus: '23:00',
            active: true
          },
          {
            id: '500',
            name: 'Línea 500',
            description: 'Centro - Plaza Independencia',
            color: '#0000FF',
            stops: ['stop-001', 'stop-002'],
            frequency: 'Cada 15 minutos',
            firstBus: '05:30',
            lastBus: '22:30',
            active: true
          },
          {
            id: '305',
            name: 'Línea 305',
            description: 'Centro - Zona Norte',
            color: '#00FF00',
            stops: ['stop-001', 'stop-003'],
            frequency: 'Cada 20 minutos',
            firstBus: '06:00',
            lastBus: '22:00',
            active: true
          }
        ]
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
});

// GET /api/mendotran/buses/active - Obtener buses activos en tiempo real
router.get('/buses/active', async (req, res) => {
  try {
    // TODO: Implementar integración con GPS de buses de Mendotran
    res.status(200).json({
      success: true,
      message: 'Buses activos obtenidos',
      data: {
        buses: [
          {
            id: 'bus-001',
            lineId: '603',
            location: { lat: -32.8870, lng: -68.8275 },
            direction: 'outbound',
            speed: 25,
            nextStop: 'stop-002',
            estimatedArrival: '5 min',
            capacity: 45,
            occupied: 23,
            status: 'in_service'
          },
          {
            id: 'bus-002',
            lineId: '500',
            location: { lat: -32.8872, lng: -68.8278 },
            direction: 'inbound',
            speed: 30,
            nextStop: 'stop-001',
            estimatedArrival: '3 min',
            capacity: 45,
            occupied: 18,
            status: 'in_service'
          }
        ]
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
});

// GET /api/mendotran/stop/:stopId/times - Obtener tiempos de llegada para una parada
router.get('/stop/:stopId/times', async (req, res) => {
  try {
    const { stopId } = req.params;
    
    // TODO: Implementar integración con API de tiempos de Mendotran
    res.status(200).json({
      success: true,
      message: 'Tiempos de llegada obtenidos',
      data: {
        stopId,
        times: [
          {
            lineId: '603',
            direction: 'outbound',
            nextBus: '5 min',
            followingBus: '15 min',
            status: 'on_time'
          },
          {
            lineId: '500',
            direction: 'inbound',
            nextBus: '3 min',
            followingBus: '18 min',
            status: 'delayed'
          },
          {
            lineId: '305',
            direction: 'outbound',
            nextBus: '12 min',
            followingBus: '32 min',
            status: 'on_time'
          }
        ],
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
});

// GET /api/mendotran/line/:lineId/route - Obtener ruta completa de una línea
router.get('/line/:lineId/route', async (req, res) => {
  try {
    const { lineId } = req.params;
    
    // TODO: Implementar obtención de ruta completa de la línea
    res.status(200).json({
      success: true,
      message: 'Ruta de línea obtenida',
      data: {
        lineId,
        route: {
          id: `route-${lineId}`,
          name: `Línea ${lineId}`,
          stops: [
            {
              id: 'stop-001',
              name: 'Centro',
              sequence: 1,
              estimatedTime: '00:00'
            },
            {
              id: 'stop-002',
              name: 'Plaza Independencia',
              sequence: 2,
              estimatedTime: '00:05'
            },
            {
              id: 'stop-003',
              name: 'Hospital Central',
              sequence: 3,
              estimatedTime: '00:12'
            }
          ],
          totalDistance: '2.3 km',
          totalDuration: '12 min'
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
});

module.exports = router;

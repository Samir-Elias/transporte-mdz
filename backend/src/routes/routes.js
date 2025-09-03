const express = require('express');
const router = express.Router();

// GET /api/routes/search - Buscar ruta entre dos puntos
router.post('/search', async (req, res) => {
  try {
    const { origin, destination, time } = req.body;
    
    // TODO: Implementar algoritmo de búsqueda de rutas
    res.status(200).json({
      success: true,
      message: 'Ruta encontrada',
      data: {
        route: {
          id: 'route-001',
          origin: origin || 'Centro, Mendoza',
          destination: destination || 'Plaza Independencia, Mendoza',
          duration: '15 min',
          distance: '2.3 km',
          steps: [
            {
              type: 'walk',
              instruction: 'Caminar 200m hasta la parada Centro',
              duration: '3 min'
            },
            {
              type: 'bus',
              line: '603',
              instruction: 'Tomar línea 603 hacia Plaza Independencia',
              duration: '10 min',
              stops: 4
            },
            {
              type: 'walk',
              instruction: 'Caminar 100m hasta el destino',
              duration: '2 min'
            }
          ],
          alternatives: [
            {
              id: 'route-002',
              duration: '18 min',
              distance: '2.1 km',
              line: '500'
            }
          ]
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

// GET /api/routes/nearby - Obtener paradas cercanas
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 1000 } = req.query;
    
    // TODO: Implementar búsqueda de paradas cercanas
    res.status(200).json({
      success: true,
      message: 'Paradas cercanas encontradas',
      data: {
        stops: [
          {
            id: 'stop-001',
            name: 'Centro',
            location: { lat: -32.8869, lng: -68.8272 },
            distance: '150m',
            lines: ['603', '500', '305']
          },
          {
            id: 'stop-002',
            name: 'Plaza Independencia',
            location: { lat: -32.8875, lng: -68.8280 },
            distance: '300m',
            lines: ['603', '500']
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

// GET /api/routes/line/:lineId - Obtener información de una línea específica
router.get('/line/:lineId', async (req, res) => {
  try {
    const { lineId } = req.params;
    
    // TODO: Implementar obtención de información de línea
    res.status(200).json({
      success: true,
      message: 'Información de línea obtenida',
      data: {
        line: {
          id: lineId,
          name: `Línea ${lineId}`,
          description: 'Ruta principal del centro de Mendoza',
          stops: [
            { id: 'stop-001', name: 'Centro', time: '00:00' },
            { id: 'stop-002', name: 'Plaza Independencia', time: '00:05' },
            { id: 'stop-003', name: 'Hospital Central', time: '00:12' }
          ],
          schedule: {
            frequency: 'Cada 10 minutos',
            firstBus: '05:00',
            lastBus: '23:00'
          }
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

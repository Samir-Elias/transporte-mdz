const express = require('express');
const router = express.Router();

// POST /api/incidents/report - Reportar incidente
router.post('/report', async (req, res) => {
  try {
    const { userId, type, description, location, lineId, severity } = req.body;
    
    // TODO: Implementar reporte de incidentes
    res.status(201).json({
      success: true,
      message: 'Incidente reportado exitosamente',
      data: {
        incident: {
          id: 'incident-001',
          userId: userId || 'user-001',
          type: type || 'delay',
          description: description || 'Retraso en la línea',
          location: location || 'Centro, Mendoza',
          lineId: lineId || '603',
          severity: severity || 'medium',
          status: 'reported',
          timestamp: new Date().toISOString(),
          estimatedResolution: new Date(Date.now() + 3600000).toISOString() // 1 hora
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

// GET /api/incidents/active - Obtener incidentes activos
router.get('/active', async (req, res) => {
  try {
    const { lineId, type, limit = 20, offset = 0 } = req.query;
    
    // TODO: Implementar obtención de incidentes activos
    res.status(200).json({
      success: true,
      message: 'Incidentes activos obtenidos',
      data: {
        incidents: [
          {
            id: 'incident-001',
            type: 'delay',
            description: 'Retraso de 15 minutos por tráfico',
            location: 'Centro, Mendoza',
            lineId: '603',
            severity: 'medium',
            status: 'active',
            timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 min atrás
            estimatedResolution: new Date(Date.now() + 1800000).toISOString() // 30 min
          },
          {
            id: 'incident-002',
            type: 'detour',
            description: 'Desvío temporal por obras en Av. San Martín',
            location: 'Plaza Independencia, Mendoza',
            lineId: '500',
            severity: 'low',
            status: 'active',
            timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 horas atrás
            estimatedResolution: new Date(Date.now() + 86400000).toISOString() // 24 horas
          }
        ],
        pagination: {
          total: 2,
          limit: parseInt(limit),
          offset: parseInt(offset)
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

// GET /api/incidents/user/:userId - Obtener incidentes reportados por un usuario
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 10, offset = 0 } = req.query;
    
    // TODO: Implementar obtención de incidentes del usuario
    res.status(200).json({
      success: true,
      message: 'Incidentes del usuario obtenidos',
      data: {
        incidents: [
          {
            id: 'incident-001',
            type: 'delay',
            description: 'Retraso en la línea 603',
            location: 'Centro, Mendoza',
            lineId: '603',
            severity: 'medium',
            status: 'resolved',
            timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 día atrás
            resolvedAt: new Date(Date.now() - 82800000).toISOString() // 23 horas atrás
          }
        ],
        pagination: {
          total: 1,
          limit: parseInt(limit),
          offset: parseInt(offset)
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

// PUT /api/incidents/:incidentId/status - Actualizar estado de incidente
router.put('/:incidentId/status', async (req, res) => {
  try {
    const { incidentId } = req.params;
    const { status, resolutionNotes } = req.body;
    
    // TODO: Implementar actualización de estado de incidente
    res.status(200).json({
      success: true,
      message: 'Estado de incidente actualizado',
      data: {
        incident: {
          id: incidentId,
          status: status || 'resolved',
          resolutionNotes: resolutionNotes || 'Incidente resuelto',
          updatedAt: new Date().toISOString()
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

// GET /api/incidents/stats - Obtener estadísticas de incidentes
router.get('/stats', async (req, res) => {
  try {
    const { period = '24h' } = req.query;
    
    // TODO: Implementar estadísticas de incidentes
    res.status(200).json({
      success: true,
      message: 'Estadísticas obtenidas',
      data: {
        stats: {
          total: 15,
          active: 2,
          resolved: 13,
          byType: {
            delay: 8,
            detour: 4,
            mechanical: 2,
            other: 1
          },
          bySeverity: {
            low: 6,
            medium: 7,
            high: 2
          },
          period: period
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

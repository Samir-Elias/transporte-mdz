import { StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.mapBackground,
  },
  loadingText: {
    fontSize: 16,
    color: colors.text,
    fontFamily: 'System',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: colors.mapBackground,
    position: 'relative',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.mapBackground,
  },
  
  // Calles simuladas (estilo Mendotran)
  street: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    height: 3,
    backgroundColor: colors.mapRoad,
    borderRadius: 2,
  },
  streetHorizontal: {
    position: 'absolute',
    top: '20%',
    bottom: '20%',
    left: '50%',
    width: 3,
    backgroundColor: colors.mapRoad,
    borderRadius: 2,
  },
  streetDiagonal: {
    position: 'absolute',
    top: '30%',
    left: '30%',
    width: 3,
    height: 100,
    backgroundColor: colors.mapRoad,
    borderRadius: 2,
    transform: [{ rotate: '45deg' }],
  },
  
  // Marcadores de paradas (estilo Mendotran)
  busStopMarker: {
    position: 'absolute',
    top: '25%',
    left: '15%',
    alignItems: 'center',
  },
  busStopMarker2: {
    position: 'absolute',
    top: '45%',
    right: '20%',
    alignItems: 'center',
  },
  busStopMarker3: {
    position: 'absolute',
    top: '65%',
    left: '25%',
    alignItems: 'center',
  },
  stopIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.mendotranGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  stopText: {
    fontSize: 14,
    color: colors.background,
  },
  
  // Marcadores de buses (estilo Mendotran)
  routeMarker: {
    position: 'absolute',
    top: '35%',
    right: '30%',
    alignItems: 'center',
  },
  routeMarker2: {
    position: 'absolute',
    top: '55%',
    right: '15%',
    alignItems: 'center',
  },
  busIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.mendotranGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  busText: {
    fontSize: 16,
    color: colors.background,
  },
  
  // Etiquetas de marcadores
  markerLabel: {
    fontSize: 10,
    color: colors.text,
    backgroundColor: colors.background,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    textAlign: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    maxWidth: 80,
  },
  
  // Información del mapa
  mapInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.mendotranRed,
    marginBottom: 4,
    textAlign: 'center',
  },
  mapSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  coordinates: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
});

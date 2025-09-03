import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Importar pantallas
import HomeScreen from '../screens/Home/HomeScreenSimple';
import RoutePlannerScreen from '../screens/RoutePlanner';
import PaymentScreen from '../screens/Payment';
import NotificationsScreen from '../screens/Notifications';
import ReportIncidentsScreen from '../screens/ReportIncidents';

// Importar estilos
import { colors } from '../styles/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack para la pantalla de planificación de rutas
const RouteStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="RoutePlannerMain" 
      component={RoutePlannerScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="ReportIncidents" 
      component={ReportIncidentsScreen}
      options={{ 
        title: 'Reportar Incidencia',
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.textLight,
      }}
    />
  </Stack.Navigator>
);

// Navegador principal con tabs
const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Rutas') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Pagos') {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === 'Notificaciones') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen 
        name="Rutas" 
        component={RouteStack}
        options={{ title: 'Rutas' }}
      />
      <Tab.Screen 
        name="Pagos" 
        component={PaymentScreen}
        options={{ title: 'Pagos' }}
      />
      <Tab.Screen 
        name="Notificaciones" 
        component={NotificationsScreen}
        options={{ title: 'Alertas' }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;

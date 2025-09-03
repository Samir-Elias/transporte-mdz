const express = require('express');
const authRoutes = require('./authRoutes');
const paymentRoutes = require('./paymentRoutes');
const transportRoutes = require('./transportRoutes');
const notificationRoutes = require('./notificationRoutes');

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Transporte MDZ API' });
});

// Routes
router.use('/auth', authRoutes);
router.use('/payments', paymentRoutes);
router.use('/transport', transportRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;

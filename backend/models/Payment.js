const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    default: 'ARS',
  },
  type: {
    type: String,
    enum: ['bus_fare', 'subscription', 'fine', 'other'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled', 'refunded'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'digital_wallet', 'qr_code'],
    required: true,
  },
  qrCode: {
    code: String,
    expiresAt: Date,
  },
  transactionId: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  metadata: {
    busLine: String,
    route: String,
    origin: String,
    destination: String,
    timestamp: Date,
  },
  gatewayResponse: {
    success: Boolean,
    message: String,
    gatewayTransactionId: String,
  },
}, {
  timestamps: true,
});

// Generate transaction ID before saving
paymentSchema.pre('save', function(next) {
  if (!this.transactionId) {
    this.transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  next();
});

// Index for faster queries
paymentSchema.index({ userId: 1, createdAt: -1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ transactionId: 1 });

module.exports = mongoose.model('Payment', paymentSchema);

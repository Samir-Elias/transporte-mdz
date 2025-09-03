const redis = require('redis');

const client = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

client.on('error', (err) => {
  console.error('❌ Redis Client Error:', err);
});

client.on('connect', () => {
  console.log('🔴 Redis Connected');
});

const connectRedis = async () => {
  try {
    await client.connect();
  } catch (error) {
    console.error('❌ Redis connection error:', error);
  }
};

module.exports = { client, connectRedis };

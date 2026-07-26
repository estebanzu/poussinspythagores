require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Apply security middlewares
app.use(helmet());
app.use(cors({ origin: '*'})); // Adjust origin as needed
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
}));

// Parse JSON bodies
app.use(express.json());

// Health‑check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Supabase client (initialized in src/supabase.js)
const { supabase } = require('./src/supabase');

// Telemetry endpoint
app.post('/api/telemetry', async (req, res) => {
  const { userId, event, payload } = req.body;
  if (!userId || !event) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const { error } = await supabase.from('telemetry').insert({
      user_id: userId,
      event,
      payload: payload ? JSON.stringify(payload) : null,
    });
    if (error) throw error;
    res.status(201).json({ message: 'Telemetry recorded' });
  } catch (err) {
    console.error('Telemetry error:', err);
    res.status(500).json({ error: 'Failed to record telemetry' });
  }
});

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets (CSS, JS, images, etc.) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback for any other routes (useful for SPA navigation)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const express = require('express');
const path = require('path');

// ... existing code above remains ...

// Start server and handle graceful shutdown
const server = app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

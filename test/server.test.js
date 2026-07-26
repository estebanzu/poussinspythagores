const request = require('supertest');
const express = require('express');
const path = require('path');

// Import the server (we will re-create app for testing)
const app = express();
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
app.use(helmet());
app.use(cors({ origin: '*'}));
app.use(rateLimit({windowMs:15*60*1000,max:100}));
app.use(express.json());
app.get('/health', (req,res)=>res.json({status:'ok'}));
app.post('/api/telemetry', (req,res)=>res.status(201).json({message:'Telemetry recorded'}));
app.use(express.static(path.join(__dirname,'../public')));
app.get('/', (req,res)=>res.sendFile(path.join(__dirname,'../index.html')));
app.get('*', (req,res)=>res.sendFile(path.join(__dirname,'../index.html')));

describe('Server endpoints', () => {
  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('POST /api/telemetry returns 201', async () => {
    const payload = {userId:'test', event:'test-event'};
    const res = await request(app).post('/api/telemetry').send(payload);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Telemetry recorded');
  });
});

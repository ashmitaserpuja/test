// __tests__/items.test.js
const request = require('supertest');
const express = require('express');
const itemsRoutes = require('../routes/items');
const fs = require('fs/promises');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../../data/items.json');

jest.mock('fs/promises');

describe('Items API', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/items', itemsRoutes);
  });

  const mockData = [
    { id: 1, name: 'Iphone 16 pro', price: 100, category: 'A' },
    { id: 2, name: 'Iphone 16 pro max', price: 200, category: 'A' },
    { id: 3, name: 'Samsung S25 Ultra', price: 150, category: 'B' },
  ];

  it('GET /api/items returns paginated items', async () => {
    fs.readFile.mockResolvedValue(JSON.stringify(mockData));

    const res = await request(app).get('/api/items?page=1&limit=2');
    expect(res.statusCode).toBe(200);
    expect(res.body.items.length).toBe(2);
    expect(res.body.totalCount).toBe(mockData.length);
  });

  it('GET /api/items?q=some filters by name', async () => {
    fs.readFile.mockResolvedValue(JSON.stringify(mockData));

    const res = await request(app).get('/api/items?q=ultra');
    expect(res.statusCode).toBe(200);
    expect(res.body.items.length).toBe(1);
    expect(res.body.items[0].name).toBe('Samsung S25 Ultra');
  });

  it('GET /api/items/:id returns single item', async () => {
    fs.readFile.mockResolvedValue(JSON.stringify(mockData));

    const res = await request(app).get('/api/items/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Iphone 16 pro');
  });

  it('GET /api/items/:id returns 404 for missing item', async () => {
    fs.readFile.mockResolvedValue(JSON.stringify(mockData));

    const res = await request(app).get('/api/items/999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({});
  });
});

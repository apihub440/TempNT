const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Your protected headers
const PROTECTED_HEADERS = {
  'accept': 'application/json, text/plain, */*',
  'app_id': '1770981347',
  'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyNjU4NDc0LCJhcHBfaWQiOiIxNzcwOTgxMzQ3IiwiZGV2aWNlX2lkIjoiMjgxZWE1YjEtMzY5OS00ODRhLTgwZmYtZGUzZjJkOTkzZGVlIiwicGxhdGZvcm0iOiIzIiwidXNlcl90eXBlIjoxLCJpYXQiOjE3Nzc5OTAyOTgsImV4cCI6MTc4MDU4MjI5OH0.uvCV2MDhS_oaIFrPey0Ezio8zzA-nidJ6wfjhmTmNAU',
  'origin': 'https://nexttoppers.com',
  'platform': '3',
  'referer': 'https://nexttoppers.com/',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'user_id': '682065',
  'version': '1'
};

app.post('/proxy/course-details', async (req, res) => {
  try {
    const { course_id, parent_id } = req.body;
    const response = await axios.post(
      'https://course.nexttoppers.com/course/course-details',
      { course_id, parent_id },
      { headers: PROTECTED_HEADERS }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.get('/proxy/content-details', async (req, res) => {
  try {
    const { content_id, course_id } = req.query;
    const response = await axios.get(
      'https://course.nexttoppers.com/course/content-details',
      { params: { content_id, course_id }, headers: PROTECTED_HEADERS }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

// Root endpoint for testing
app.get('/', (req, res) => {
  res.json({ message: 'Proxy server is running', endpoints: ['POST /proxy/course-details', 'GET /proxy/content-details'] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));

module.exports = app;

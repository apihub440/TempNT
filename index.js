const fs = require('fs');

// Create proxy.js
const proxyContent = `const express = require('express');
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
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
  'user_id': '682065',
  'version': '1'
};

// Endpoint 1: Course Details (POST)
app.post('/proxy/course-details', async (req, res) => {
  try {
    const { course_id, parent_id } = req.body;
    
    if (!course_id || !parent_id) {
      return res.status(400).json({ error: 'Missing required fields: course_id and parent_id' });
    }
    
    const response = await axios.post(
      'https://course.nexttoppers.com/course/course-details',
      { course_id, parent_id },
      { headers: PROTECTED_HEADERS }
    );
    
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data
    });
  }
});

// Endpoint 2: Content Details (GET with query params)
app.get('/proxy/content-details', async (req, res) => {
  try {
    const { content_id, course_id } = req.query;
    
    if (!content_id || !course_id) {
      return res.status(400).json({ error: 'Missing required parameters: content_id and course_id' });
    }
    
    const response = await axios.get(
      'https://course.nexttoppers.com/course/content-details',
      {
        params: { content_id, course_id },
        headers: PROTECTED_HEADERS
      }
    );
    
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('✅ Proxy running on http://localhost:' + PORT);
  console.log('\\n📌 Endpoints:');
  console.log('   POST /proxy/course-details');
  console.log('   GET  /proxy/content-details?content_id=16968&course_id=101');
});`;

// Create package.json
const packageContent = `{
  "name": "api-proxy",
  "version": "1.0.0",
  "description": "API proxy with protected headers",
  "main": "proxy.js",
  "scripts": {
    "start": "node proxy.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "axios": "^1.6.0",
    "cors": "^2.8.5"
  }
}`;

// Create README.md
const readmeContent = `# API Proxy Server

## Installation
\`\`\`bash
npm install
\`\`\`

## Usage
\`\`\`bash
npm start
\`\`\`

## Endpoints

### POST /proxy/course-details
\`\`\`bash
curl -X POST http://localhost:3000/proxy/course-details \\
  -H "Content-Type: application/json" \\
  -d '{"course_id":"62","parent_id":"2614"}'
\`\`\`

### GET /proxy/content-details
\`\`\`bash
curl "http://localhost:3000/proxy/content-details?content_id=16968&course_id=101"
\`\`\`
`;

// Write files
fs.writeFileSync('proxy.js', proxyContent);
fs.writeFileSync('package.json', packageContent);
fs.writeFileSync('README.md', readmeContent);

console.log('✅ Repository files created successfully!');
console.log('📁 Files created: proxy.js, package.json, README.md');
console.log('\nNext steps:');
console.log('1. Run: npm install');
console.log('2. Run: npm start');

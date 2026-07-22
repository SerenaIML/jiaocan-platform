const https = require('https');
const token = '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';
const data = JSON.stringify({ name: 'jiaocan-platform', description: '广西教师用书 · 试阅平台', private: true });
const options = {
  hostname: 'api.github.com', path: '/user/repos', method: 'POST',
  headers: { 'Authorization': `token ${token}`, 'User-Agent': 'nodejs', 'Content-Type': 'application/json', 'Content-Length': data.length }
};
const req = https.request(options, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => console.log(res.statusCode, JSON.parse(body).html_url || body.substring(0, 200)));
});
req.on('error', e => console.error('Error:', e.message));
req.write(data);
req.end();

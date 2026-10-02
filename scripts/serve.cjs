const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };
const server = http.createServer((request, response) => {
  let filename;
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    filename = path.resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
    if (!filename.startsWith(root + path.sep) || pathname.split('/').some(segment => segment.startsWith('.'))) throw Error('Forbidden');
  } catch { response.writeHead(400); return response.end(); }
  fs.readFile(filename, (error, data) => {
    response.writeHead(error ? 404 : 200, { 'Content-Type': types[path.extname(filename)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    response.end(error ? 'Not found' : data);
  });
});
if (require.main === module) server.listen(4173, '127.0.0.1', () => console.log('Preview: http://127.0.0.1:4173'));
module.exports = server;

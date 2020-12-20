import http from 'http';
import fs from 'fs';
import url from 'url';

http
  .createServer((req, res) => {
    let q = url.parse(req.url, true);
    let filename = './pages' + q.pathname + '.html';
    fs.readFile(filename, (err, data) => {
      if (err) {
        fs.readFile('./pages/404.html', (err, data2) => {
          res.writeHead('404', { 'Content-Type': 'text/html' });
          res.write(data2);
          return res.end();
        });
      } else {
        res.writeHead('200', { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(8080);

import http from 'http';
import fs from 'fs';
import url from 'url';
import formidable from 'formidable';

const uploadFormDetails = (req, res) => {
  console.log('uploading a form!');
  let form = new formidable.IncomingForm();
  console.log('form');
  console.log(form);
  form.parse(req, (err, fields, files) => {
    console.log('fields');
    console.log(fields);
    let loggedMsg = `
    =================
    Name: ${fields.name},
    Email: ${fields.email},
    Message: ${fields.message}`;
    fs.appendFile('siteMessages.txt', loggedMsg, (err) => {
      if (err) throw err;
      res.writeHead('200', { 'Content-Tye': 'text/html' });
      return res.end();
    });
  });
};

http
  .createServer((req, res) => {
    // Parse url
    let q = url.parse(req.url, true);
    //Redirect '/' to index
    if (q.pathname === '/') {
      q.pathname = '/index';
    }
    //Check if file upload, else its file request
    if (q.pathname === '/formupload') {
      uploadFormDetails(req, res);
    } else {
      let filename = './pages' + q.pathname + '.html';
      //Read file
      fs.readFile(filename, (err, data) => {
        if (err) {
          // grab, read, and respond w/ 404 page
          fs.readFile('./pages/404.html', (err, data2) => {
            res.writeHead('404', { 'Content-Type': 'text/html' });
            res.write(data2);
            return res.end();
          });
        } else {
          // Respond w/ requested page
          res.writeHead('200', { 'Content-Type': 'text/html' });
          res.write(data);
          return res.end();
        }
      });
    }
  })
  .listen(8080);

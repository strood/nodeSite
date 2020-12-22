import http from 'http';
import fs from 'fs';
import url from 'url';
import formidable from 'formidable';

const uploadFormDetails = (req, res) => {
  let form = new IncomingForm();
  form.parse(req, (err, fields, files) => {
    let loggedMsg = `
    =================
    Name: ${fields.name},
    Email: ${fields.email},
    Message: ${fields.message}`;
    appendFile('siteMessages.txt', loggedMsg, (err) => {
      if (err) {
        res.writeHead('400', { 'Content-Tye': 'text/html' });
        res.write(
          ` <p>
            Error processing submission. <a href='/contact'>Try again?</a>
          </p>`
        );
      } else {
        res.writeHead('202', { 'Content-Tye': 'text/html' });
        res.write(
          `<p>
            Submission success!. <a href='/'>Back Home</a>
          </p>`
        );
      }
      return res.end();
    });
  });
};

createServer((req, res) => {
  // Parse url
  let q = parse(req.url, true);
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
    readFile(filename, (err, data) => {
      if (err) {
        // grab, read, and respond w/ 404 page
        readFile('./pages/404.html', (err, data2) => {
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
}).listen(8080);

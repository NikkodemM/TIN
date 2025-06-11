const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const filename = decodeURIComponent(parsedUrl.pathname.slice(1));
    const filePath = `./files/${filename}`;

    switch (req.method) {
        case 'GET':
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.statusCode = 404;
                    return res.end('Nie znaleziono pliku.');
                }
                res.end(`Zawartość pliku ${filename}: \n${data}`);
            });
            break;
        case 'POST':
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                fs.appendFile(filePath, body + '\n', (err) => {
                    if (err) {
                        res.statusCode = 500;
                        return res.end('Błąd zapisu do pliku.');
                    }
                    res.end(`Dopisano do pliku ${filename}: \n${body}`);
                });
            });
            break;
        case 'DELETE':
            fs.unlink(filePath, (err) => {
                if (err) {
                    res.statusCode = 404;
                    return res.end('Nie udało się usunąć pliku.');
                }
                res.end(`Usunięto plik ${filename}`);
            });
            break;
        default:
            res.statusCode = 405;
            res.end('Metoda nieobsługiwana.');
            break;
    }
});

server.listen(3000, () => {
    console.log('Serwer działa na porcie 3000');
});

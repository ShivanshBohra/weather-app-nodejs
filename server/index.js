import http from 'http';
import fs from 'fs';
import path from 'path';
import requests from 'requests';

const homeFilePath = path.join(__dirname, '..', 'public', 'home.html');
const homeFile = fs.readFileSync(homeFilePath, "utf-8");

const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
    temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
    temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
    temperature = temperature.replace("{%location%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);
    return temperature;
};



const server = http.createServer((req, res) => {
    if (req.url.match(/\.(css|js)$/)) {
        const filePath = path.join(__dirname, '..', 'public', req.url);
        const fileStream = fs.createReadStream(filePath, 'UTF-8');

        res.writeHead(200, { 'Content-Type': req.url.endsWith('.css') ? 'text/css' : 'text/javascript' });
        fileStream.pipe(res);
        return;
    }

    if (req.url == "/") {
        requests(
            'https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=bafd029653218f7f7c6668443dc86d87'
        )
            .on('data', (chunk) => {
                const objdata = JSON.parse(chunk);
                console.log(objdata)
                const arrData = [objdata];
                console.log(arrData);
                console.log(arrData[0].main.temp);
                const realTimeData = arrData.map((val) =>
                    replaceVal(homeFile, val))
                    .join("");
                res.write(realTimeData);
            })
            .on('end', (err) => {
                if (err) return console.log('connection closed due to errors', err);
                res.end();
            });
    }
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Server is listening on port 8000");
});

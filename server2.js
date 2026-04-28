const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// The database file lives in the /data folder, which we will make persistent
const dbPath = path.join('/data', 'visits.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS stats (id INTEGER PRIMARY KEY, count INTEGER)");
    db.run("INSERT OR IGNORE INTO stats (id, count) VALUES (1, 0)");
});

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return res.end();

    db.run("UPDATE stats SET count = count + 1 WHERE id = 1", () => {
        db.get("SELECT count FROM stats WHERE id = 1", (err, row) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<h1>Total Visits: ${row.count}</h1><p>Persistent Data stored in ${dbPath}</p>`);
        });
    });
});

server.listen(3000, '0.0.0.0', () => {
    console.log('Server running on port 3000');
});

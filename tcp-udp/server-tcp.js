const net = require('net');
const fs = require('fs');
const path = require('path');

const PORT = 4000;
const LOG_FILE = path.join(__dirname, 'tcp-logs.txt');

function log(message) {
  const line = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync(LOG_FILE, line);
  console.log(line.trim());
}

const server = net.createServer((socket) => {
  const clientId = `${socket.remoteAddress}:${socket.remotePort}`;
  log(`CONEXION INICIO - ${clientId}`);

  socket.on('data', (data) => {
    const raw = data.toString().trim();
    log(`MENSAJE RECIBIDO de ${clientId}: ${raw}`);

    try {
      const json = JSON.parse(raw);

      const response = {
        status: 'ok',
        received: json,
        timestamp: new Date().toISOString()
      };

      const respString = JSON.stringify(response);
      socket.write(respString + '\n');
      log(`MENSAJE ENVIADO a ${clientId}: ${respString}`);
    } catch (err) {
      const errorResp = {
        status: 'error',
        message: 'JSON inválido'
      };
      const errorString = JSON.stringify(errorResp);
      socket.write(errorString + '\n');
      log(`ERROR PARSE JSON de ${clientId}: ${raw}`);
    }
  });

  socket.on('end', () => {
    log(`CONEXION FIN - ${clientId}`);
  });

  socket.on('error', (err) => {
    log(`ERROR SOCKET ${clientId}: ${err.message}`);
  });
});

server.listen(PORT, () => {
  log(`Servidor TCP escuchando en puerto ${PORT}`);
});

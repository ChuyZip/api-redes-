const net = require('net');

const PORT = 4000;
const HOST = '127.0.0.1';

const client = net.createConnection({ port: PORT, host: HOST }, () => {
  console.log('Conectado al servidor TCP');

  const message = {
    type: 'greeting',
    msg: 'Hola desde el cliente',
    time: new Date().toISOString()
  };

  client.write(JSON.stringify(message) + '\n');
});

client.on('data', (data) => {
  console.log('Respuesta del servidor:', data.toString().trim());
  client.end();
});

client.on('end', () => {
  console.log('Desconectado del servidor');
});

client.on('error', (err) => {
  console.error('Error en el cliente:', err.message);
});

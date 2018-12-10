const app = require('../src/app');
const debug = require('debug')('gringotts:server');
const http = require('http');
const mongoose = require('mongoose');
const config = require('../ecosystem.config');
const logger = require('mongo-morgan-ext');


const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  console.log('GringottsServerDB conected ...')
});

mongoose.connect(config.connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
});

//normalizePort -> Isso faz com que a porta seja uma definida nas variaveis de ambiente do SO. Se não houver 3000
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log(`Gringotts API available on http://localhost:${port}`);

const skipfunction = function(req, res) {
  return res.statusCode > 399;
}

app.use(logger(config.connectionString,"logs",skipfunction)); //In your express-application

//Metodo usada para normalizar a porta
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

// Metodo usada interceptar os erros possiveis no servidor como privilégios, porta fechada, etc
// https://nodejs.org/api/errors.html
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Metodo para realizar o debug
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
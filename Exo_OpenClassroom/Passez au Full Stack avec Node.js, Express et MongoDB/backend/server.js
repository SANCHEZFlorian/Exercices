const http = require('http'); // Import des fonctions http
const app = require('./app');

// const server = http.createServer((req, res) => { // Création du serveur http, avec en paramètre la fonction nécessitant la requête et la réponse
//     res.end('voilà la réponse du deuxième serveur'); // res.end est l'envoie de la réponse
// });

// Fonction permettant de renvoyé un port valide, qu'il soit sous forme d'un numéro ou d'une chaîne

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };
  const port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);


  // Fonction permettant de rechercher les différentes erreurs et les gère. Elle est ensuite enregistrée dans le serveur
  const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

  const server = http.createServer(app);

  server.on('error', errorHandler);
  server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
  });

  server.listen(port);

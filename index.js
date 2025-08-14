// index.js
// donde inicia tu aplicación node

// inicializar proyecto
var express = require('express');
var app = express();

// habilitar CORS (https://es.wikipedia.org/wiki/Intercambio_de_recursos_de_origen_cruzado)
// para que tu API pueda ser probada remotamente por FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // algunos navegadores antiguos fallan con 204

// http://expressjs.com/es/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/es/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// tu primer endpoint de API...
app.get("/api/:date?", function (req, res) {
  let dateStg= req.params.date;
  let date;
  if (!dateStg) {
    date = new Date();
  } else if (!isNaN(dateStg)) {
    date = new Date(parseInt(dateStg));
  } else {
    date = new Date(dateStg);
  }
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});
// Escuchar en el puerto establecido en la variable de entorno o por defecto en 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Tu aplicación está escuchando en el puerto ' + listener.address().port);
});

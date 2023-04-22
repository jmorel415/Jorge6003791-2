const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser());

const userRoute = require("./src/route/users/users.route");
const themeRoute = require("./src/route/themes/themes.route");
const topicRoute = require("./src/route/topics/topics.route");
const themes_propertiesRoute = require("./src/route/themes_properties/themes_properties.route"); 

//Ruta raiz
app.get('/', function (req, res) {
    //logica.
    res.send('Hello World');
});

app.get('/pagina2', function (req, res) {
    //Logica de negocios
    //esta aqui -Controller
    res.json({ application: 'Study APP', version: '1.0.0' });
});

//Llamadas a los routes
userRoute(app);
themeRoute(app);
topicRoute(app);
themes_propertiesRoute(app);

app.listen(3000);
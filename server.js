var express = require("express"); //importamos la dependencia
const res = require("express/lib/response");
var app = express(); //declaramos una App de Express
var port = process.env.PORT || 3000; //setteamos el puerto para que escuche al servidor
app.use("/assets", express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false })); //se agrega para parsear peticiones con URL para datos dentro del body

app.set("view engine", "ejs"); // Aquí se especifica a nuestra App que su template será EJS

//primera ruta (está al nivel de la raíz/), archivo ejs en views que devuelve un saludo
app.get("/", function(req, res) {

    res.render("helloWorld");
});


//segunda ruta, recibe un parámetro ID, Message y Times
app.get("/person/:id", function(req, res) {

    res.render("person", { ID: req.params.id, Message: req.query.message, Times: req.query.times });
});

//tercera ruta, envia a la vista index renderizada, aquí se encuentra el cuestionario
app.get("/student", function(req, res) {

    res.render("index");
});

//primer ruta de post, esta ruta se activa automáticamente cuando se manden valores desde la ruta raíz para devolver el first y last name
app.post("/student", (req, res) => {
    res.send(`First Name es: ${req.body.fname}, Last Name es:${req.body.lname}`);
});

app.post("/personjson", express.json({ type: "*/*" }), (req, res) => {
    console.log("El objeto contiene:", (req.body));
    console.log("Nombre:", (req.body.firstname));
    console.log("Apellido:", (req.body.lastname));
});


app.listen(port); //levantar el server y ponerlo a la escucha
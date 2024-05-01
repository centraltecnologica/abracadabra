const express = require('express')
const app = express()

app.listen(3000, () => {
  console.log("El servidor se inició en el puerto 3000")
})

const usuarios = {
  "usuarios": [
      "Juan",
      "Jocelyn",
      "Astrid",
      "Maria",
      "Ignacia",
      "Javier",
      "Brian"
  ]
}

// ruta /abracadabra/usuarios -> JSON
app.get("/abracadabra/usuarios", (req, res) => {
  res.send(usuarios)
})

// hacer pública la carpeta assets
app.use(express.static("assets"));

// middleware para filtrar quién pasa a la ruta
// abracadabra/juego/:usuario

app.use("/abracadabra/juego/:usuario", (req, res, next) => {
  const usuarioReq = req.params.usuario

  if ( usuarios.usuarios.find(data => data == usuarioReq) ) {
    next()
  } else {
    res.sendFile(__dirname + "/assets/who.jpeg")
  }
})

app.get("/abracadabra/juego/:usuario", (req, res) => {
  res.sendFile( __dirname + "/index.html" )
})

app.get("/abracadabra/conejo/:n", (req, res) => {
  const numeroUsuario = req.params.n
  const numeroConejo = Math.floor(Math.random() * 4 ) + 1;

  if (numeroConejo == numeroUsuario) {
    res.sendFile(__dirname + "/assets/conejito.jpg")
  } else {
    res.sendFile(__dirname + "/assets/voldemort.jpg")
  }
})

app.get("*", (req, res) => {
  res.send("Esta página no existe")
})
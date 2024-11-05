import express, { Request, Response } from "express";
import { engine } from "express-handlebars";
import path from "path";
import { assertType, expectTypeOf, test } from 'vitest'
//const exphbs = require("express-handlebars");

const app = express();
const port = 3000;

// Configuration du moteur de template Handlebars
//app.engine("handlebars", exphbs.engine());
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Route principale
app.get("/", (req: Request, res: Response) => {
  res.render("home", {
    title: "Bienvenue",
    description: "Ceci est un site internet qui utilise handlebars",
  });

});

//Route de connection à la base de donnée
app.get("/connection", (req: Request, res: Response) => {
  res.render("connection", {

  })
})

// Lancer le serveur
const server = app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});

/*
if (import.meta.hot) {
  import.meta.hot.accept(async() => {
    console.log("Restarting")
    await server.close()
  })
  
}
*/



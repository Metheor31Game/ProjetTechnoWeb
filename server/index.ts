import express, { Request, Response } from "express";
import { engine } from "express-handlebars";
import path from "path";
import { assertType, expectTypeOf, test } from 'vitest'
import { initialiseDatabase } from "./bdd";

//const exphbs = require("express-handlebars");

const app = express();
const port = 3000;

// Configuration du moteur de template Handlebars
//app.engine("handlebars", exphbs.engine());
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "../public/views"));

// Route principale
app.get("/", (req: Request, res: Response) => {
  res.render("home", {
    title: "Bienvenue",
    description: "Ceci est un site internet qui utilise handlebars",
  });

});

//Route pour se connecter
app.get("/connection", (req: Request, res: Response) => {
  res.render("connection", {

  })
})

//Route pour s'inscrire
app.get("/inscription", (req:Request, res:Response) => {
  res.render("inscription", {
    
  })
})

//Lancer la base de donnée
initialiseDatabase().then(() => {
  //lancer le serveur du site
  app.listen(port, () => {
      console.log(`serveur sur écoute : http://localhost:${port}`)
  })
}).catch(err => {
  console.error("Erreur lors de l'initialisation de la DATABASE : ", err)
})

/*
if (import.meta.hot) {
  import.meta.hot.accept(async() => {
    console.log("Restarting")
    await server.close()
  })
  
}
*/



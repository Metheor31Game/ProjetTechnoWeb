import express, { Request, Response } from "express";
import { engine } from "express-handlebars";
import path from "path";
import { initialiseDatabase, addUser } from "./bdd";
import bodyParser from "body-parser";

//const exphbs = require("express-handlebars");

const app = express();
const port = 3000;

// Configuration du moteur de template Handlebars
//app.engine("handlebars", exphbs.engine());
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "../public/views"));

// Pour les données type POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//-----------------------Routes GET---------------------

// Route principale
app.get("/", (req: Request, res: Response) => {
  res.render("home", {
    title: "Bienvenue",
    description: "Mémorise et planifie tes visites !",
  });
});

//Route pour se connecter
app.get("/connection", (req: Request, res: Response) => {
  res.render("connection", {});
});

//Route pour s'inscrire
app.get("/inscription", (req: Request, res: Response) => {
  res.render("inscription", {});
});

//---------------------Routes POST--------------------------

// Route POST pour l'inscription
app.post("/inscription", async (req: Request, res: Response) => {
  const { pseudo, nom, prenom, mail, mdp } = req.body;

  // Vérifie que tous les champs sont présents
  if (!pseudo || !nom || !prenom || !mail || !mdp) {
    return res.status(400).send("Tous les champs sont requis.");
  }

  try {
    // Ajoute l'utilisateur à la base de données
    const result = await addUser(pseudo, nom, prenom, mail, mdp);
    res.status(201).send("Inscription réussie !");
  } catch (err) {
    console.error("Erreur lors de l'inscription de l'utilisateur :", err);
    res.status(500).send("Erreur lors de l'inscription.");
  }
});

//Lancer la base de donnée
initialiseDatabase()
  .then(() => {
    //lancer le serveur du site
    app.listen(port, () => {
      console.log(`serveur sur écoute : http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Erreur lors de l'initialisation de la DATABASE : ", err);
  });

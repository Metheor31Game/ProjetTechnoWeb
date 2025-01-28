// - - - - - - - - - LES IMPORTS - - - - - - - - -
const express = require("express");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { engine } = require("express-handlebars");
const { initialiseDatabase, closeDatabase } = require("./bdd");
const routeur = require("./routes");

// import express from "express";
// import path from "path";
// import session from "express-session";
// import bcrypt from "bcrypt";
// import { engine } from "express-handlebars";
// import { initialiseDatabase, closeDatabase } from "./bdd";

const app = express();

const port = 3000;

// - - - - - - - - - MIDDLEWARE  - - - - - - - - -

// Configuration du moteur de template Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "../public/views"));
app.use(express.urlencoded({ extended: true })); // Pour les formulaires classiques
app.use(express.json()); // Pour les données JSON
app.use(express.static("public"));

// Gestion des sessions
app.use(
  session({
    secret: "votre_secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1 heure
    },
  }),
);

// - - - - - - - - - LES ROUTES  - - - - - - - - -

// Middleware pour vérifier si un utilisateur est connecté
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res
      .status(401)
      .json({ message: "Non authentifié. Veuillez vous connecter." });
  }
  next();
};

// - - - - - - - - - INITIALISATION DE LA DATABASE - - - - - - - - -

initialiseDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Serveur sur écoute : http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Erreur lors de l'initialisation de la DATABASE :", err);
  });

process.on("SIGINT", async () => {
  console.log("Arrêt du serveur...");
  await closeDatabase();
  process.exit(0);
});

module.exports = { app };

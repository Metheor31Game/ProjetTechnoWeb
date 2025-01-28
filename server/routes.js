const express = require("express");
const routeur = express.Router();
const {
  getConnectionHome,
  getInscription,
  postInscription,
  getConnection,
  postConnection,
  logout,
  getDashboard,
  deleteAnnonce,
  detailAnnonce,
  getUpload,
  postUpload,
  getAnnonceById,
  postAnnonce,
  putAnnonceById,
  deleteAnnonceById,
} = require("./controller");

// Route principale
routeur.get("/", getConnectionHome());

// Route pour s'inscrire
routeur.get("/inscription", getInscription());

// Route pour gérer l'inscription (POST)
routeur.post("/inscription", postInscription());

// Route pour se connecter
routeur.get("/connection", getConnection());

// Route pour gérer la connexion (POST)
routeur.post("/connection", postConnection());

// Route pour se déconnecter
routeur.get("/logout", logout());

// Route pour le dashboard
routeur.get("/dashboard", requireAuth, getDashboard());

// Route pour supprimer des annonces
routeur.get("/delete", requireAuth, deleteAnnonce());

// Route pour afficher les détails d'une annonce
routeur.get("/annonce/details", requireAuth, detailAnnonce());

routeur.get("/upload", requireAuth, getUpload());

routeur.post("/upload", requireAuth, postUpload());

// - - - - - - - - - - - routes qui renvoient du JSON - - - - - - - - - - - - - -

// Route pour récupérer les annonces
routeur.get("/annonces/:id?", getAnnonceById());

routeur.post("/annonces", postAnnonce());

routeur.put("/annonces/:id", putAnnonceById());

routeur.delete("/annonces/:id", deleteAnnonceById());

// Route inconnue
routeur.use((req, res) => {
  res.status(404).json({ message: "Route introuvable." });
});

// Exportation de routeur
module.exports = routeur;

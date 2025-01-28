let getConnectionHome = (req, res) => {
  if (req.session.user) {
    res.status(200);
    // res.status(200).redirect("/dashboard");
  }
  res.status(200).render("home", {
    title: "Bienvenue",
    description: "Ceci est un site internet qui utilise handlebars",
  });
};

let getInscription = (req, res) => {
  res.status(200).render("inscription", {});
};

let postInscription = async (req, res) => {
  const { pseudo, nom, prenom, mail, mdp } = req.body;

  if (!pseudo || !nom || !prenom || !mail || !mdp) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    const connection = await initialiseDatabase();
    const hashedPassword = await bcrypt.hash(mdp, 10);

    await connection.query(
      "INSERT INTO utilisateur (pseudo, nom, prenom, mail, mdp) VALUES (?, ?, ?, ?, ?)",
      [pseudo, nom, prenom, mail, hashedPassword],
    );

    await connection.query("INSERT INTO dashboard (pseudo_user) VALUES (?)", [
      pseudo,
    ]);

    res.status(201).redirect("/connection");
  } catch (err) {
    console.error("Erreur lors de l'inscription :", err);
    res.status(500).json({ message: "Erreur lors de l'inscription." });
  }
};

let getConnection = (req, res) => {
  if (req.session.user) {
    res.status(200).redirect("/dashboard");
  }
  res.status(200).render("connection", {});
};

let postConnection = async (req, res) => {
  const { pseudo, mdp } = req.body;

  try {
    const connection = await initialiseDatabase();
    const [rows] = await connection.query(
      "SELECT pseudo, mdp FROM utilisateur WHERE pseudo = ?",
      [pseudo],
    );

    if (rows.length > 0) {
      const match = await bcrypt.compare(mdp, rows[0].mdp);
      if (match) {
        req.session.user = pseudo;
        return res.status(200).redirect("/dashboard");
      } else {
        return res
          .status(401)
          .render("connection", { message: "Mot de passe incorrect." });
      }
    } else {
      return res
        .status(404)
        .render("connection", { message: "Utilisateur non trouvé." });
    }
  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    res.status(500).json({ message: "Erreur lors de la connexion." });
  }
};

let logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erreur lors de la déconnexion." });
    }
    res.redirect("/connection");
  });
};

let getDashboard = async (req, res) => {
  const currentUser = req.session.user;

  try {
    const connection = await initialiseDatabase();
    const [dashboard] = await connection.query(
      "SELECT id_dashboard FROM dashboard WHERE pseudo_user = ?",
      [currentUser],
    );

    if (!dashboard[0]?.id_dashboard) {
      return res.status(404).json({ message: "Dashboard introuvable." });
    }

    const [annonces] = await connection.query(
      "SELECT * FROM annonce WHERE id_dashboard = ?",
      [dashboard[0].id_dashboard],
    );

    res.status(200).render("dashboard", {
      title: "Dashboard",
      annonces,
    });
  } catch (err) {
    console.error("Erreur lors de la récupération des annonces :", err);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

let deleteAnnonce = async (req, res) => {
  const ids = req.query.ids;

  if (!ids) {
    return res
      .status(400)
      .json({ message: "Aucun ID fourni pour suppression." });
  }

  const idArray = ids.split(",");

  try {
    const connection = await initialiseDatabase();
    const placeholders = idArray.map(() => "?").join(",");
    const query = `DELETE FROM annonce WHERE id IN (${placeholders})`;

    await connection.query(query, idArray);

    res.status(200).redirect("/dashboard");
  } catch (err) {
    console.error("Erreur lors de la suppression des annonces :", err);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression des annonces." });
  }
};

let detailAnnonce = async (req, res) => {
  const annonceId = req.query.id;

  if (!annonceId) {
    return res.status(400).json({ message: "ID de l'annonce manquant." });
  }

  try {
    const connection = await initialiseDatabase();
    const [rows] = await connection.query(
      "SELECT * FROM annonce WHERE id = ?",
      [annonceId],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Annonce introuvable." });
    }

    res.status(200).render("annonces", {
      title: "Détails de l'annonce",
      annonce: rows[0],
    });
  } catch (err) {
    console.error(
      "Erreur lors de la récupération des détails de l'annonce :",
      err,
    );
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

let getUpload = (req, res) => {
  res.render("upload", {});
};

let postUpload = async (req, res) => {
  const { titre, adresse, description, lien } = req.body;
  const date = new Date();
  const dateSansHeure = date.toLocaleDateString();
  if (!titre) {
    return res.status(400).json({ message: "Champ titre requis" });
  }

  try {
    const connection = await initialiseDatabase();

    // Insérer l'annonce dans la base de donnée
    const [dashboard] = await connection.query(
      "SELECT id_dashboard FROM dashboard WHERE pseudo_user = (?)",
      [req.session.user],
    );
    const result = await connection.query(
      "INSERT INTO annonce (id_dashboard, titre, date, adresse, description, lien) VALUES (?, ?, ?, ?, ?, ?)",
      [
        dashboard[0].id_dashboard,
        titre,
        dateSansHeure,
        adresse,
        description,
        lien,
      ],
    );

    // Rediriger l'utilisateur vers la page de connexion après l'inscription réussie
    res.redirect("/dashboard");
  } catch (err) {
    console.error("Erreur lors de l'ajout de l'annonce  : ", err);
    res.status(500).json({ message: "Erreur lors de l'ajout d'une annonce" });
  }
};

let getAnnonceById = async (req, res) => {
  try {
    const connection = await initialiseDatabase();
    //annonceId peut etre nul, donc cela défini si on veut une liste ou un seul élément
    const annonceId = req.params.id;

    if (annonceId) {
      const [rows] = await connection.query(
        "SELECT * FROM annonce WHERE id = ?",
        [annonceId],
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: "Annonce non trouvée." });
      }
      res.status(200).json(rows[0]);
    } else {
      const [rows] = await connection.query("SELECT * FROM annonce");
      res.status(200).json(rows);
    }
  } catch (err) {
    console.error("Erreur lors de la récupération des annonces :", err);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

let postAnnonce = async (req, res) => {
  try {
    const connection = await initialiseDatabase();
    //annonceId peut etre nul, donc cela défini si on veut une liste ou un seul élément
    const annonceId = req.params.id;

    if (annonceId) {
      const [rows] = await connection.query(
        "SELECT * FROM annonce WHERE id = ?",
        [annonceId],
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: "Annonce non trouvée." });
      }
      res.status(200).json(rows[0]);
    } else {
      const [rows] = await connection.query("SELECT * FROM annonce");
      res.status(200).json(rows);
    }
  } catch (err) {
    console.error("Erreur lors de la récupération des annonces :", err);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

let putAnnonceById = async (req, res) => {
  try {
    const connection = await initialiseDatabase();

    // Récupérer l'ID de l'annonce dans les paramètres de l'URL
    const annonceId = req.params.id;

    // Vérifier si l'ID de l'annonce est fourni
    if (!annonceId) {
      return res.status(400).json({ message: "ID de l'annonce requis." });
    }

    // Récupérer les informations du JSON dans le corps de la requête
    const { id_dashboard, titre, date, adresse, description, lien } = req.body;

    // Validation des données reçues
    if (!id_dashboard || !titre || !date || !adresse || !description || !lien) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    // Vérifier si l'annonce existe
    const [existingAnnonce] = await connection.query(
      "SELECT * FROM annonce WHERE id = ?",
      [annonceId],
    );
    if (existingAnnonce.length === 0) {
      return res.status(404).json({ message: "Annonce non trouvée." });
    }

    // Mettre à jour l'annonce dans la base de données
    await connection.query(
      "UPDATE annonce SET id_dashboard = ?, titre = ?, date = ?, adresse = ?, description = ?, lien = ? WHERE id = ?",
      [id_dashboard, titre, date, adresse, description, lien, annonceId],
    );

    // Réponse réussie
    res.status(200).json({
      message: "Annonce mise à jour avec succès.",
      annonceId: annonceId,
    });
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'annonce :", err);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

let deleteAnnonceById = async (req, res) => {
  try {
    const connection = await initialiseDatabase();

    // Récupérer l'ID de l'annonce dans les paramètres de l'URL
    const annonceId = req.params.id;

    // Vérifier si l'ID de l'annonce est fourni
    if (!annonceId) {
      return res.status(400).json({ message: "ID de l'annonce requis." });
    }

    // Vérifier si l'annonce existe dans la base de données
    const [existingAnnonce] = await connection.query(
      "SELECT * FROM annonce WHERE id = ?",
      [annonceId],
    );
    if (existingAnnonce.length === 0) {
      return res.status(404).json({ message: "Annonce non trouvée." });
    }

    // Supprimer l'annonce de la base de données
    await connection.query("DELETE FROM annonce WHERE id = ?", [annonceId]);

    // Réponse réussie
    res.status(200).json({
      message: "Annonce supprimée avec succès.",
      annonceId: annonceId,
    });
  } catch (err) {
    console.error("Erreur lors de la suppression de l'annonce :", err);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

module.exports = {
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
};

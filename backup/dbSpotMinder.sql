-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : jeu. 12 déc. 2024 à 10:03
-- Version du serveur : 8.0.40
-- Version de PHP : 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `dbSpotMinder`
--

-- --------------------------------------------------------

--
-- Structure de la table `annonce`
--

CREATE TABLE `annonce` (
  `id` int NOT NULL,
  `id_dashboard` int NOT NULL,
  `titre` varchar(60) NOT NULL,
  `date` varchar(20) NOT NULL,
  `adresse` varchar(80) NOT NULL,
  `description` varchar(220) NOT NULL,
  `lien` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `annonce`
--

INSERT INTO `annonce` (`id`, `id_dashboard`, `titre`, `date`, `adresse`, `description`, `lien`) VALUES
(1, 1, 'Appartement 3 pièces à louer', '2024-12-01', '12 Rue de la République, Lyon, 69001', 'Bel appartement de 3 pièces avec un grand séjour et une cuisine équipée.', ''),
(2, 1, 'Maison avec jardin', '2024-12-05', '45 Avenue des Champs-Élysées, Paris, 75008', 'Grande maison de 5 chambres avec un jardin spacieux et un garage', ''),
(3, 1, 'Studio à vendre', '2024-11-28', '78 Boulevard Saint-Germain, Paris, 75005', 'Studio de 30m² idéalement situé dans le quartier latin, parfait pour un investisseur.', '');

-- --------------------------------------------------------

--
-- Structure de la table `dashboard`
--

CREATE TABLE `dashboard` (
  `id_dashboard` int NOT NULL,
  `pseudo_user` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `dashboard`
--

INSERT INTO `dashboard` (`id_dashboard`, `pseudo_user`) VALUES
(1, 'Armand66'),
(2, 'Clem12'),
(3, 'Matheo31'),
(4, 'Thibault81');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `pseudo` varchar(20) NOT NULL COMMENT 'pseudo unique',
  `nom` varchar(20) NOT NULL COMMENT 'nom',
  `prenom` varchar(20) NOT NULL COMMENT 'prenom',
  `mail` varchar(60) NOT NULL COMMENT 'adresse email',
  `mdp` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`pseudo`, `nom`, `prenom`, `mail`, `mdp`) VALUES
('Armand66', 'Lecourt', 'Armand', 'armand@exemple.test', 'armandlol'),
('Clem12', 'Bessieres', 'Clement', 'contact.clementbessieres@gmail.com', 'clemclem'),
('Matheo31', 'Vigneres', 'Matheo', 'matheo.vigneres@gmail.com', 'matmat'),
('Thibault81', 'Malespine', 'Thibault', 'thibault@exemple.test', 'titi81');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `annonce`
--
ALTER TABLE `annonce`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_dashboard` (`id_dashboard`);

--
-- Index pour la table `dashboard`
--
ALTER TABLE `dashboard`
  ADD PRIMARY KEY (`id_dashboard`),
  ADD KEY `FK_USER_DASHBOARD` (`pseudo_user`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`pseudo`),
  ADD UNIQUE KEY `pseudo` (`pseudo`),
  ADD UNIQUE KEY `mail` (`mail`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `annonce`
--
ALTER TABLE `annonce`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `dashboard`
--
ALTER TABLE `dashboard`
  MODIFY `id_dashboard` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `annonce`
--
ALTER TABLE `annonce`
  ADD CONSTRAINT `FK_ANNONCE_DASHBOARD` FOREIGN KEY (`id_dashboard`) REFERENCES `dashboard` (`id_dashboard`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `NOT NULL` FOREIGN KEY (`id_dashboard`) REFERENCES `dashboard` (`id_dashboard`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `dashboard`
--
ALTER TABLE `dashboard`
  ADD CONSTRAINT `FK_USER_DASHBOARD` FOREIGN KEY (`pseudo_user`) REFERENCES `utilisateur` (`pseudo`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

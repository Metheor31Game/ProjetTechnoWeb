-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : mar. 17 déc. 2024 à 15:37
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
  `lien` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `annonce`
--

INSERT INTO `annonce` (`id`, `id_dashboard`, `titre`, `date`, `adresse`, `description`, `lien`) VALUES
(1, 1, 'Appartement 3 pièces à louer', '2024-12-01', '12 Rue de la République, Lyon, 69001', 'Bel appartement de 3 pièces avec un grand séjour et une cuisine équipée.', ''),
(2, 1, 'Maison avec jardin', '2024-12-05', '45 Avenue des Champs-Élysées, Paris, 75008', 'Grande maison de 5 chambres avec un jardin spacieux et un garage', ''),
(4, 1, 'Super Maison avec PC GAMER', '26 rue du PC GAMER', 'Une super maison avec un PC GAMER ENORME', 'https://www.bigmaisonavecbigpc.fr', NULL),
(5, 6, 'un titre', 'une adresse', 'c\'est une description de test visant à tester l\'ajout d\'une annonce.', 'www.leliendelannonce.fr', NULL),
(6, 6, 'la maison de matheo', 'là ou habite mathéo', 'la belle maison de mathéo', 'www.matheohomestandingtahlesouf.fr', NULL),
(7, 7, 'maison centre albi', 'place du vigan', 'une bete de maison', '', NULL),
(8, 7, 'maison a coté du stade', 'Stade lagrèze', 'maison chill beaucoup de pièces', '', NULL),
(9, 7, 'appartement + rooftop', 'puygouzon', 'bete d\'appart + ascenceur direct dans le salon', '', NULL);

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
(9, 'armand'),
(1, 'clement'),
(7, 'matheo'),
(6, 'test'),
(8, 'thibault');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `pseudo` varchar(20) NOT NULL COMMENT 'pseudo unique',
  `nom` varchar(20) NOT NULL COMMENT 'nom',
  `prenom` varchar(20) NOT NULL COMMENT 'prenom',
  `mail` varchar(60) NOT NULL COMMENT 'adresse email',
  `mdp` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`pseudo`, `nom`, `prenom`, `mail`, `mdp`) VALUES
('armand', 'Lecourt', 'Armand', 'armand@example.ex', '$2b$10$8WSfS2o8q1d5GKEQdbzWmuSF7MW9QUu.Ro3jWWKTGvCXYSTSkGMQi'),
('clement', 'Bessieres', 'Clement', 'clement@example.ex', '$2b$10$nU.VfQcsBI7jE4LDdHrileBYgZNQjhmWfaYHiLQfTci/gSILY.DXO'),
('matheo', 'Vigneres', 'Matheo', 'matheo@example.ex', '$2b$10$ow8ksvIc.pxvveFpAoXy6O0VwQVkQVxRNiBwyoZMh49XyJc8odadO'),
('test', 'testnom', 'testprenom', 'test@test.test', '$2b$10$7DxW.EhuKyWO6.quT80oxeZJmb8mWx47n25X4wADK1Vx7h7BmUkEq'),
('thibault', 'Malespine', 'Thibault', 'thibault@example.ex', '$2b$10$3u2Y/PkZWMXaXZKEEyF3/.53U7eoeKiTQpxcBES7BS655Dj8eT0RK');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `dashboard`
--
ALTER TABLE `dashboard`
  MODIFY `id_dashboard` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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

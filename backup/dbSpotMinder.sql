-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : mar. 20 mai 2025 à 07:33
-- Version du serveur : 8.0.42
-- Version de PHP : 8.2.27

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
  `description` varchar(1200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lien` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `annonce`
--

INSERT INTO `annonce` (`id`, `id_dashboard`, `titre`, `date`, `adresse`, `description`, `lien`) VALUES
(10, 10, 'Appart 3 pièces 71 m2', '20/05/2025', 'Albi', 'appart ok tier - 3 pièces', 'https://www.leboncoin.fr/ad/ventes_immobilieres/2987322626'),
(11, 10, 'Maison 9 pièces 260 m²', '20/05/2025', 'Albi', 'Albi, quartier Maladrerie proche golf, maison des années 1995 rénovée et agrandie au fil du temps, d\'environ 260 m² sur parcelle plate et arborée de 1737 m² avec double garage, 3 terrasses intimes et piscine. Vous trouverez 7 chambres dont 5 avec salle de bains, un beau salon avec cheminée insert, une cuisine aménagée et équipée,  une agréable salle à manger donnant sur la piscine et une terrasse, une lingerie et une grande salle de jeu de 35 m² en souplex. Chauffage au gaz de ville, climatisation, arrosage intégré, alarme, micro station conforme, double vitrage, nombreux rangements... Du volume, de la lumière, le tout niché en toute discrétion dans un beau jardin entretenu à seulement 2 km du centre ville ! Référence annonce : A231 Date de réalisation du diagnostic : 17/04/2025 Les honoraires sont à la charge du vendeur', 'https://www.leboncoin.fr/ad/ventes_immobilieres/2971972578'),
(12, 10, 'Maison de ville 4 pièces 82 m²', '20/05/2025', 'Albi', 'Jean-Baptiste GALUD, Conseiller Immobilier Indépendant, vous propose de découvrir, au coeur du quartier du Castelviel et de toutes ses commodités, cette maison de ville avec sa terrasse où vous aurez une vue imprenable sur la Cathédrale Sainte Cécile.     Elle dispose de deux entrées distinctes.     La première vous permettra d\'arriver, par des parties communes, dans la pièce à vivre qui se trouve au premier étage.     Elle se compose d\'un salon donnant directement sur la terrasse et sa vue sur la Cathédrale, d\'une cuisine et d\'une salle à manger.     Vous trouverez également à ce niveau une salle d\'eau avec WC et une chambre lumineuse.     Vous trouverez également l\'escalier vous menant au rez-de-chaussée, qui se compose lui d\'une chambre avec salle d\'eau et dressing, la deuxième entrée, et le garage !', 'https://www.leboncoin.fr/ad/ventes_immobilieres/2981882686'),
(13, 10, 'Maison de ville 6 pièces 183 m²', '20/05/2025', 'Albi Centre', 'Albi, proche Rochegude, au calme, charmante maison des années 30 d\'environ 183 m² habitables sur trois niveaux, sur une parcelle de 386 m² avec piscine et dépendance.  En rez-de chaussée vous trouverez un grand garage de 22 m², un studio indépendant très bien aménagé, une buanderie.  Au 1er étage, une belle entrée dessert une cuisine aménagée, une chambre, une salle d\'eau, un salon/séjour donnant sur une terrasse et le jardin.  Au second, un palier, une grande chambre et deux autres plus petites, deux dressings et une salle de bains.  Chauffage au gaz de ville, climatisation, piscine au sel et chauffée.', 'https://www.leboncoin.fr/ad/ventes_immobilieres/2970109421'),
(14, 11, 'Maison 5 pièces 171 m²', '20/05/2025', 'Quartier Ladoux - Porte de la Victoire - Le Cayrel - Cartayre - Ladoux', 'Située dans le hameau très recherché de Soulobres, à seulement 10 minutes du centre-ville de Millau, cette maison en pierre pleine de charme est une opportunité unique pour les amateurs d’authenticité.      Nichée au cœur d’un environnement calme et préservé, sans aucun vis-à-vis, cette bâtisse de caractère offre une belle pièce de vie agréable, sublimée par ses poutres apparentes, ses pierres naturelles, ses dalles de Fréjal au sol et son parquet en chêne massif, autant d’éléments qui confèrent un cachet rare et une atmosphère chaleureuse.', 'https://www.leboncoin.fr/ad/ventes_immobilieres/2989919151'),
(15, 11, 'Propriété 8 pièces 190 m²', '20/05/2025', 'La Rouquette 12200 ', 'Construite en 2011, la maison présente un niveau de finition de haute qualité. Le niveau principal dispose d\'un spacieux espace de vie ouvert de 69m², comprenant une cuisine entièrement équipée et un salon, s\'ouvrant sur un magnifique balcon/terrasse de 55m². Ce niveau comprend également Une chambre de 13m². Une salle d\'eau de 8m² Un WC séparé Une buanderie de 15m². Deux pièces supplémentaires (13m² et 18m², actuellement utilisées comme chambres) Une pièce intérieure sécurisée de 7m². La maison a été construite selon les normes relatives aux personnes handicapées. Au niveau inférieur, une grande chambre de 29m² avec accès direct au jardin. Un sous-sol de 50m² qui contient toutes les installations et équipements pour le chauffage et le traitement de l\'eau.', 'https://www.leboncoin.fr/ad/ventes_immobilieres/2923474469'),
(16, 11, 'Duplex 4 pièces 130 m²', '20/05/2025', 'Villefranche-de-Rouergue 12200', 'Centre ville, bel appartement duplex en pierre situé au 2ème étage sans ascenseur, d\'une surface habitabe de 130m2 comprenant une cuisine ouverte aménagée donnant sur un vaste séjour avec cheminée, très lumineux. A l\'étage se trouve 3 grandes chambres mansardées dont une avec un dressing, une salle  de bain avec baignoire et douche.. Chauffage au gaz de ville.  Proche de la gare et des commerces. Pas de travaux à envisger, habitable de suite. A découvrir ! -  Surface : 130 m² Honoraires à la charge du vendeur Date de réalisation du diagnostic énergétique : 24/02/2022', 'https://www.leboncoin.fr/ad/ventes_immobilieres/2974518931'),
(17, 11, 'Maison 6 pièces 208 m²', '20/05/2025', '  Roussennac 12220 ', '-D\'un séjour avec plafond cathédrale et sa charpente apparente, d\'une pièce de vie de 80 m2 avec cuisine américaine toute équipée donnant sur une terrasse attenante de 25 m2 couverte par un très bel appentis en bois.  - 2 chambres de 12m2 et 12m2 - 1 salle d\'eau - 1 bureau et salle de jeux.  A l\'étage vous aurez accès via un escalier avec coursive centrale donnant à 2 grandes chambres mansardées de 13m2 et 20m2. Une salle de bain baignoire balnéo et une douche multi jets.  A l\'extérieur vous trouverez une très belle terrasse de 150 m2 sa piscine de 4x10  au sel avec plage immergée chauffée et filtration autonome, rideau déroulant motorisé. -Un spa de 5 places et douche solaire. Le tout sur un terrain arboré d\'une surface de 5420 M² au calme sans vis-à-vis.  -Un garage de 57 m2 -Chauffage au sol et climatisation réversible sur l\'ensemble de la maison -Poêle à bois -Aspiration centralisée -Volets roulants centralisés -Chauffe eau thermodynamique -Fosse septique au norme -fibre -Possibilité d\'acquérir l\'ensemble du mobilier', 'https://www.leboncoin.fr/ad/ventes_immobilieres/2917173508'),
(18, 12, 'Appartement 3 pièces 58 m²', '20/05/2025', 'Toulouse 31000  · Quartier Compans-Caffarelli', ' Quartier Compans Caffarelli, dans une rue calme à 2 pas du métro , des commerces et des écoles.  Au 1er étage d\'une petite copropriété au calme de 5 lots, entretenue et sécurisée.  Découvrez ce T3 traversant se composant d\'une entrée avec placard, d\'un vaste séjour ouvert sur la cuisine aménagée et équipée, d\'une chambre avec placard, d\'une chambre / bureau et d\'une salle de bains avec WC séparé.  Balcon au niveau de l\'entrée de l\'appartement.  Parfait état.  A découvrir rapidement.', 'https://www.leboncoin.fr/ad/ventes_immobilieres/2930271850'),
(19, 12, 'Appartement 2 pièces 38 m²', '20/05/2025', 'Toulouse 31000  · Quartier Les Châlets', ' Situé dans l\'un des quartiers les plus prisés de Toulouse, ce joli appartement de type T2, d\'une superficie de 38 m², vous séduira par son charme et sa localisation idéale.      L\'appartement se compose d\'un séjour lumineux avec une belle exposition, d\'une cuisine aménagée et équipée, d\'une chambre confortable avec un placard intégré, d\'une salle d\'eau moderne avec WC. Il se trouve au premier étage d\'un immeuble sécurisé.      L\'emplacement est un véritable atout : le quartier des Chalets est calme et recherché, à proximité immédiate des commerces, des transports en commun, des écoles et de toutes les commodités. Vous serez également à quelques minutes du centre-ville et des principaux axes routiers, ce qui rend ce bien parfait pour une vie urbaine pratique et agréable.      Cet appartement est idéal pour un premier achat ou un investissement locatif.', 'https://www.leboncoin.fr/ad/ventes_immobilieres/2962126560'),
(20, 12, 'Appartement 3 pièces 66 m²', '20/05/2025', 'Toulouse 31000  · Quartier Saint-Aubin', ' Toulouse, centre ville, charmant T3 meublé de 66m2 traversant situé au 15 rue de l\'industrie. Ce bien comprend 3 pièces, dont 2 chambres, ainsi que d\'une cuisine séparée équipée. Profitez d\'un espace lumineux et bien agencé, à proximité des commodités et des transports en commun.', 'https://www.leboncoin.fr/ad/locations/2980656192'),
(21, 12, 'Appartement 3 pièces 84 m²', '20/05/2025', 'Toulouse 31000  · Quartier Capitole', 'Cet appartement est idéalement situé en plein coeur de Toulouse, entre la Garonne et le canal du Midi. Il se trouve dans une petite résidence avec ascenseur, ce qui facilite l\'accès aux étages.  L\'appartement est à la fois lumineux et spacieux, avec de grandes fenêtres qui laissent entrer la lumière naturelle. Il est aménagé de manière moderne et offre un espace confortable pour vivre.  Un avantage additionnel est la présence d\'un parking privé, ce qui vous permettra de garer votre véhicule en toute sécurité.  Cet appartement est parfaitement adapté pour ceux qui recherchent un lieu de vie central, proche des commerces, des transports en commun et des nombreuses activités que propose la ville de Toulouse.', 'https://www.leboncoin.fr/ad/ventes_immobilieres/2926867255');

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
(10, 'clement'),
(12, 'matheo'),
(11, 'mickael');

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
('clement', 'bessieres', 'clement', 'clement.clement@clement.clement', '$2b$10$eCMK2AWsFVJmKLv9VglYGup.cquTIqAYUoN6gJrwvTpg.2tV51MBy'),
('matheo', 'vigneres', 'matheo', 'matheo.matheo@matheo.matheo', '$2b$10$rgTqeso9ln/x2AEmbQCwUOBX3N67SBU1K6yVUHmcL7BMivbJo2jxa'),
('mickael', 'bardy', 'mickael', 'mickael.mickael@mickael.mickael', '$2b$10$Wz3jQu/meOxfbLomF84hB.Oat4cor/UZQN6lQ4JuRNpiGLbnZ9z9e');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `dashboard`
--
ALTER TABLE `dashboard`
  MODIFY `id_dashboard` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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

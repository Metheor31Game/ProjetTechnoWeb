-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Hôte : db
-- Généré le : mar. 20 mai 2025 à 07:43
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
(18, 12, 'Appartement 3 pièces 58 m²', '20/05/2025', 'Toulouse 31000  · Quartier Compans-Caffarelli', ' Quartier Compans Caffarelli, dans une rue calme à 2 pas du métro , des commerces et des écoles.  Au 1er étage d\'une petite copropriété au calme de 5 lots, entretenue et sécurisée.  Découvrez ce T3 traversant se composant d\'une entrée avec placard, d\'un vaste séjour ouvert sur la cuisine aménagée et équipée, d\'une chambre avec placard, d\'une chambre / bureau et d\'une salle de bains avec WC séparé.  Balcon au niveau de l\'entrée de l\'appartement.  Parfait état.  A découvrir rapidement.', 'https://www.leboncoin.fr/ad/ventes_immobilieres/2930271850'),
(19, 12, 'Appartement 2 pièces 38 m²', '20/05/2025', 'Toulouse 31000  · Quartier Les Châlets', ' Situé dans l\'un des quartiers les plus prisés de Toulouse, ce joli appartement de type T2, d\'une superficie de 38 m², vous séduira par son charme et sa localisation idéale.      L\'appartement se compose d\'un séjour lumineux avec une belle exposition, d\'une cuisine aménagée et équipée, d\'une chambre confortable avec un placard intégré, d\'une salle d\'eau moderne avec WC. Il se trouve au premier étage d\'un immeuble sécurisé.      L\'emplacement est un véritable atout : le quartier des Chalets est calme et recherché, à proximité immédiate des commerces, des transports en commun, des écoles et de toutes les commodités. Vous serez également à quelques minutes du centre-ville et des principaux axes routiers, ce qui rend ce bien parfait pour une vie urbaine pratique et agréable.      Cet appartement est idéal pour un premier achat ou un investissement locatif.', 'https://www.leboncoin.fr/ad/ventes_immobilieres/2962126560'),
(20, 12, 'Appartement 3 pièces 66 m²', '20/05/2025', 'Toulouse 31000  · Quartier Saint-Aubin', ' Toulouse, centre ville, charmant T3 meublé de 66m2 traversant situé au 15 rue de l\'industrie. Ce bien comprend 3 pièces, dont 2 chambres, ainsi que d\'une cuisine séparée équipée. Profitez d\'un espace lumineux et bien agencé, à proximité des commodités et des transports en commun.', 'https://www.leboncoin.fr/ad/locations/2980656192'),
(21, 12, 'Appartement 3 pièces 84 m²', '20/05/2025', 'Toulouse 31000  · Quartier Capitole', 'Cet appartement est idéalement situé en plein coeur de Toulouse, entre la Garonne et le canal du Midi. Il se trouve dans une petite résidence avec ascenseur, ce qui facilite l\'accès aux étages.  L\'appartement est à la fois lumineux et spacieux, avec de grandes fenêtres qui laissent entrer la lumière naturelle. Il est aménagé de manière moderne et offre un espace confortable pour vivre.  Un avantage additionnel est la présence d\'un parking privé, ce qui vous permettra de garer votre véhicule en toute sécurité.  Cet appartement est parfaitement adapté pour ceux qui recherchent un lieu de vie central, proche des commerces, des transports en commun et des nombreuses activités que propose la ville de Toulouse.', 'https://www.leboncoin.fr/ad/ventes_immobilieres/2926867255'),
(22, 13, 'Maison 11 pièces 300 m²', '20/05/2025', 'Capdenac-Gare 12700 ', ' Cette maison de caractère à moins de 15 minutes de Capdenac offre un potentiel étonnant! Elle dispose  de 8 chambres, d\'une cuisine - salle à manger de 34 m², d\'un séjour de 30 m², d\'une pièce de banquet de 100 m² avec bar et cheminée centrale, de deux salles d\'eau et d\'une salle de bain, d\'une cour avec terrasse couverte et puits, d\'un porche grillagé de 23,3 m², de deux caves de 20 et 30 m², et d\'un terrain attenant de 1984 m². Gros oeuvre et toitures sont en parfait état. Si le bien convient parfaitement pour une résidence d\'été, Il faudra cependant prévoir une rénovation intérieure globale pour y vivre confortablement à l\'année.', 'https://www.leboncoin.fr/ad/ventes_immobilieres/2985046131'),
(23, 13, 'Maison 4 pièces 80 m²', '20/05/2025', 'Bozouls 12340 ', 'Programme Terrain + Maison  Compris dans le prix : Maison + terrain  Au style tendance et moderne, cette maison 4 pièces offre un espace à vivre lumineux et accueillant. Composée d\'une cuisine ouverte, 3 chambres, cellier et garage, cette maison ne vous laissera pas indifférent tout en vous assurant un confort et une qualité de vie indéniable.  Ce projet vous est proposé sur un terrain de 802m² dans la commune de BOZOULS.  Pour plus de renseignement, veuillez contacter Mr TORLAK au [Coordonnées masquées] (Maisons Gloriettes) Toutes assurances comprises.', 'https://www.leboncoin.fr/ad/ventes_immobilieres/2981690714'),
(24, 13, 'Maison 4 pièces 88 m²', '20/05/2025', 'Rodez 12000  · Quartier Saint-Félix', 'Située à St Felix, maison de type 4 d\'environ 88m² assise sur un terrain d\'environ 575m² comprenant une entrée, une cuisine indépendante, un séjour avec cheminée, trois chambres, une salle d\'eau, une salle de bains, deux WC, une buanderie et un garage d\'environ 45m². Clim réversible, chauffage au gaz individuel. Proche de toutes commodités.', 'https://www.leboncoin.fr/ad/ventes_immobilieres/2951210155'),
(25, 13, 'Chateau 10 pièces 370 m²', '20/05/2025', 'Ambeyrac 12260 ', 'En rez-de-jardin se trouve une cuisine équipée, ornée de jolis murs en pierre et de belles poutres apparentes avec sa cheminée sur fond de briquettes. Après avoir passé une porte, on découvre un majestueux salon de 50 m2 traversant avec au sol de belles dalles en pierre mises en valeur par la luminosité grâce à ses grandes ouvertures donnant accès sur le jardin et sa piscine de 9x5m où vous profiterez d\'une splendide vue sur les méandres du Lot et la campagne. Toujours sur le rdc, une buanderie/chaufferie avec sa chaudière fioul et un atelier de 23 m2. Au dessus de ce dernier, vous découvrirez un espace de 31 m2, une mezzanine de 8 m2 et un bureau de 9 m2 avec un point d\'eau.', 'https://www.leboncoin.fr/ad/ventes_immobilieres/2933039346');

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
(13, 'michael');

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
('michael', 'bardy', 'michael', 'michael.michael@michael.michael', '$2b$10$JAnGEKSohYzNNmU/XRM7V.vcsvwSOphUtcTiwPh2GJDfyPPpssa7O');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT pour la table `dashboard`
--
ALTER TABLE `dashboard`
  MODIFY `id_dashboard` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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

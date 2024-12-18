
  - Page d'accueil :
    - Bouton connection/inscription

  - Page log in/sign in
    - log in : pseudo + mdp
      
    - sign in : pseudo / nom / prenom / email / mdp


  - page "Dashboard" :
    - liste de toutes les annonces
      
    - options supplémentaires plus tard ...

  - page descriptives du bien :
    
    - Champ de saisie : titre
    - Zone photo du bien
    - ajout carte/localisation du bien
    - Champ de saisie : description du bien
    - Zone ou texte ou Zone de bouton -> mettant en avant les point fort du bien
    - bouton d'enregistrement des modifications

- to do list :
  
    - Design
    - BDD (utilisateur, annonce : ok)

- commande a taper
  
  - npm install
  - cd docker && docker compose up -d (lance les containers accés mysql : localhost:10001)
  - importer la base de donnée dans mysql (prendre la db : dbSpotMinder.sql)
  - npm run dev (lance le server sur le port 3000)
    
  - télécharger les extensions prettier, eslint (si c'est pas fait)
    


- Pour le docker :
  - docker compose up -d -> Démarre le service
  - docker compose down -> Eteint le service
  - docker compose down -v -> Eteint le service et delete le volume (permet de clean le volume)

  - http://localhost:10001 -> accés à la bdd

- log admin :
  - root -> identifiant
  - adminspotminder -> mot de passe

- Gestion sign in/ log in :
  - utilisation de bcrypt (point fort : anti brutforce + sécurité a mettre dans le site (tentative de connexion))
  - stockage des hash des password dans la base de donnée

checklist eval fin 1er semestre :

    [ V ] Dépôt Git avec historique
    [ V ] package.json avec dépendances et scripts
    [ V ] Serveur express qui se lance
    [ V ] Base de données qui tourne
    [ V ] Le GET /elements renvoie une liste
    [ V ] Le GET /elements/un-id renvoie un élément en détail
    [ V ] le POST /elements ajoute des données à la base de données
    [ V ] DELETE /elements/un-id qui supprime un enregistrement
    [ V ] PUT ou PATCH /elements/un-id qui l’enregistrement
    [ V ] Présence d’un mécanisme d’authentification
    [ V ] Possibilité de créer un compte utilisateur de compte
    [ V ] Historique des commits clairs (qui a changé quoi quand)
    [ V ] Organisation du code en fichiers logiquement séparés
    [ V ] Gestion des autorisations et 403 en cas de d’accès à la ressource d’un tiers
    [ V ] POST avec réponse 200 ou 201
    [ V ] 401 en cas d’accès non authentifié
    [ V ] 404 en cas de route inconnue et en cas d’enregistrement inconnu
    [ V ] GET en 200
    
    [ ] Présence d’un test unitaire pertinent
    [ ] Présence d’un test end-to-end pertinent
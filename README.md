
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

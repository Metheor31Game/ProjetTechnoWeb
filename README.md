- Première idée :

  - Page log in/sign in (est-ce qu'on le partagera plus tard en deux pages ?)
    - log in : id / mdp
    - sign in : nom / prenom / email / mdp / ...
  - page principale :

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
  - initialisation du projet (à voir ensemble)
    - typescript
    - voir comment faire pour le design (bootstrap ???)
    - BDD ??
  - build quelques page afin de lancer le projet
    - ordre d'exécution :
      - page descriptive
      - page principale
      - page log in/sign in

- commande a taper
  - npm install
  - npm run dev (compile auto apres save)
  - télécharger les extensions prettier, eslint (si c'est pas fait)
  - 


- Pour le docker :
  - docker compose up -d -> Démarre le service
  - docker compose down -> Eteint le service
  - docker compose down -v -> Eteint le service et delete le volume (permet de clean le volume)

  - http://localhost:9000 -> accés à la bdd

  - spot -> identifiant
  - spot-passwd -> mot de passe

- Gestion sign in/ log in :
  - utilisation de bcrypt (point fort : anti brutforce + sécurité a mettre dans le site (tentative de connexion))
  - stockage des hash des password dans la base de donnée
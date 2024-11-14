#!/bin/bash

# Récupérer l'ID du dernier conteneur Docker créé
CONTAINER_ID=$(docker ps -lq)

# Vérifier si le conteneur est en cours d'exécution
if [ -z "$CONTAINER_ID" ]; then
    echo "Aucun conteneur en cours d'exécution."
    exit 1
fi

echo "Conteneur ID: $CONTAINER_ID"

# Utiliser le chemin complet de mysql si nécessaire
docker exec $CONTAINER_ID /usr/bin/mysql -u spot -p dbSpotMinder < ./backup/utilisateur.sql

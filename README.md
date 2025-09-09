# Projet: Admin Dashboard + Auth (GitHub Setup)

Ce dépôt est configuré pour n’inclure que deux dossiers lorsque vous publiez sur GitHub:

- `admin-dashboard`
- `auth`

Tout le reste (ex: `node_modules`, PDFs, fichiers temporaires, etc.) est ignoré par le `.gitignore` à la racine.

## Pourquoi cela fonctionne

Le fichier `.gitignore` à la racine ignore tout par défaut (`/*`), puis ré-autorise uniquement:

- `admin-dashboard/` (et tout son contenu)
- `auth/` (et tout son contenu)
- `README.md` et `.gitignore`

Chaque sous-projet possède aussi son propre `.gitignore` pour gérer les fichiers internes (ex: `node_modules`).

## Publier sur GitHub (étapes)

1. Ouvrez un terminal dans le dossier racine du projet: `projet mobile`
2. Initialisez Git:
   ```powershell
   git init
   ```
3. Ajoutez les fichiers suivis (seuls `admin-dashboard` et `auth` seront pris en compte grâce au `.gitignore`):
   ```powershell
   git add .
   ```
4. Vérifiez ce qui sera commité:
   ```powershell
   git status
   ```
   Vous devriez voir uniquement `admin-dashboard/`, `auth/`, et potentiellement `README.md` et `.gitignore`.
5. Faites un premier commit:
   ```powershell
   git commit -m "Initial commit: admin-dashboard + auth only"
   ```
6. Ajoutez votre dépôt GitHub (remplacez l’URL par la vôtre):
   ```powershell
   git remote add origin https://github.com/<votre-utilisateur>/<votre-repo>.git
   ```
7. Poussez vers GitHub:
   ```powershell
   git branch -M main
   git push -u origin main
   ```

## Remarques
- Si vous ajoutez d’autres dossiers que vous souhaitez publier, modifiez le `.gitignore` racine pour les autoriser (ex: ajouter `!nouveau-dossier/` et `!nouveau-dossier/**`).
- Les fichiers sensibles (ex: `.env` dans `auth`) sont déjà ignorés par le `.gitignore` du sous-projet.

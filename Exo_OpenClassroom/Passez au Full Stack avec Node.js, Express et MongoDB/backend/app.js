const express = require('express');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path');


// Importation de notre BDD MongoDB
mongoose.connect('mongodb+srv://Ascorio:mrVmdciSXWOppPGm@cluster0.ckqqw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();


// Middleware générale permettant d'accéder à notre API depuis n'importe quelle origine (évite les problèmes de CORS) pour toute les requêtes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json()); // Met à disposition les json envoyé par le front via le req.body. Anciennement : app.use(bodyParser.json()); et const bodyParser = require('body-parser');

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);




// // Chaque app.use est un middleware. Il prend en compte la requête, la réponse, et si on passe au middleware suivant
// app.use((req, res, next) => {
//     console.log("Requête reçue");
//     res.status(201); // Changement du code d'état de la réponse (404, 400, 500, etc)
//     res.json({ message: "Votre requête reçu a bien été reçu"}); //Renvoie un fichier json
//     next(); //Permet de passer au prochain middleware



// --------------------------------------------------------
// Anciennement, sans router :
// --------------------------------------------------------

// //Middleware des objets envoyés du front en post
// app.post('/api/stuff', (req, res, next) => {
//     delete req.body._id; // On supprime l'élément qui n'est pas donnée dans notre modèle
//     const thing = new Thing({
//         // title: req.body.title, // On peut mettre chaque élément comme cela
//         ...req.body // On préfèrera utiliser cette écriture pour que cela le face automatiquement
//     });
//     thing.save() // On sauvegarde les données
//         .then(() => res.status(201).json({ message: 'Objet enregistré'})) // On renvoit la réponse au front pour dire que c'est bien passé
//         .catch(error => res.status(400).json({ error})); // On renvoit cela s'il y a une erreur
// });


// // Middleware des objets renvoyés

// // Récupération d'UN élément via un id
// app.get('/api/stuff/:id', (req, res, next) => { // le :id signifie à Express que l'url est dynamique et que l'id change
//     Thing.findOne({ _id: req.params.id }) // On recherche l'élément qui a le même id que celui dans l'url
//     .then(thing => res.status(200).json(thing)) // On renvoie les infos de l'élément 
//     .catch(error => res.status(404).json({ error }));
// });

// // Le .get permet de seulement sélectionner les requêtes en get
// app.get('/api/stuff', (req, res, next) => { // Le premier paramètre est l'url
//     Thing.find() // On renvoit toute les données de notre tableau Things
//         .then(things => res.status(200).json(things))
//         .catch(error => res.status(400).json({ error }));
// });


// // Middleware qui modifie les données

// app.put('/api/stuff/:id', (req, res, next) => {
//     Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) // Le premier paramètre sert à trouver l'objet, le deuxième ce qu'on va lui mettre. En l'occurence, on rajoute les choses du req.body, en vérifiant bien que l'id est le bon
//         .then(() => res.status(200).json({message: 'Objet modifié'} ))
//         .catch(error => res.status(400).json({ error }));
// });


// // Middleware qui supprime les données
// app.delete('/api/stuff/:id', (req, res, next) => {
//     Thing.deleteOne({ _id: req.params.id })
//         .then(() => res.status(200).json({message: 'Objet supprimé'} ))
//         .catch(error => res.status(400).json({ error }));
// });

module.exports = app; //export du fichier app.js
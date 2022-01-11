const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');


mongoose.connect('mongodb+srv://Ascorio:mrVmdciSXWOppPGm@cluster0.ckqqw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());


// Middleware générale permettant d'accéder à notre API depuis n'importe quelle origine (évite les problèmes de CORS) pour toute les requêtes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// 3ème route, Création
app.post('/api/products', (req, res, next) => {
    const product = new Product({
        ...req.body
    });
    product.save()
        .then(() => res.status(201).json({ product }))
        .catch(error => res.status(400).json({ error}));
});

// 1ère route, retourne tous les produits
app.get('/api/products', (req, res, next) => {

    Product.find()
        .then(products => res.status(200).json({products}))
        .catch(error => res.status(400).json({ error }));
});

// 2ème route, récupération d'UN élément via un id
app.get('/api/products/:id', (req, res, next) => {
    Product.findOne({ _id: req.params.id }) 
    .then(product => res.status(200).json({product}))
    .catch(error => res.status(404).json({ error }));
});

// 4ème route, modification d'un produit
app.put('/api/products/:id', (req, res, next) => {
    Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({message: 'Modified!'} ))
        .catch(error => res.status(400).json({ error }));
});


// 5ème route, suppression d'un produit
app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({message: 'Deleted!'} ))
        .catch(error => res.status(400).json({ error }));
});

module.exports = app; //export du fichier app.js
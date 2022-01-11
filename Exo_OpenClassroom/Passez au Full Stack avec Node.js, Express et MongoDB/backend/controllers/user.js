const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // On utilise le hash de bcryp, on lui met en paramètre ce qu'il a à haser, puis le nombre de hash qu'on fait
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash, // On met notre mot de passe hashé
        });
        user.save() // On sauvegarde l'utilisateur
        .then(() => res.status(201).json({ message: 'Utilisateur crée' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then (user => {
        if (!user) { // On vérifie que l'utilisateur existe
            return res.status(401).json({ error: 'Utilisateur non trouvé'});
        }
        bcrypt.compare(req.body.password, user.password) // On compare le mot de passe donné avec celui en BDD
        .then(valid => {
            if (!valid) { // On vérifie que le mot de passe est correct
                return res.status(401).json({ error: 'Mot de passe incorrect'});
            }
            res.status(200).json({ // On renvoit l'ID de l'utiliseur ainsi qu'un token
                userId: user._id,
                token: jwt.sign( // Encode un nouveau token
                    { userId: user._id}, // Premier paramètre : le payload (données encodées dans le token) qui contien ce qu'on veut
                    'RANDOM_TOKEN_SECRET', // Deuxième paramètre : La chaîne secrète pour encoder le token
                    { expiresIn: '24h' } // Troisième paramètre : La durée de vie du token
                )
            });
        })
        .catch();
    })
    .catch(error => res.status(500).json({ error }));
};
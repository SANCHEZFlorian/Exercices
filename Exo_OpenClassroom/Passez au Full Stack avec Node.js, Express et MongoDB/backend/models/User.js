const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // Permet de ne pas avoir d'erreur de champs unique qui existent avec MongoDB

const userSchema = mongoose.Schema({ //
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator); // On passe le schéma des données des utilisateurs dans le validator qui va mieux gérer les champs uniques

module.exports = mongoose.model('User', userSchema);
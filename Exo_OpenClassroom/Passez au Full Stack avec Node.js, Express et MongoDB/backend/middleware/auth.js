const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try { // Permet de tester les requêtes
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Vérification du token avec la même clé mise dans le controller user
        const userId = decodedToken.userId; // On extrait l'id de l'utilisateur du token
        req.auth = { userId } // On met dans la requête l'id contenu dans le token à la place de celui dans la requête. On peut l'écrire comme ça : req.userId = userId;
        if (req.body.userId && req.body.userId !== userId) { // On vérifie qu'il y a bien un ID d'utilisateur et s'il est différent que celui dans le token, on renvoit une erreur
            throw 'User ID non valable';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée' });
    }
};
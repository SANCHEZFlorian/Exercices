const multer = require('multer');

const MIME_TYPES = { // Ce "dictionnaire" permet de savoir quel extension équivaut à quel mimetype
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({ // Cette fonction sert à Multer pour avoir la logique nécessaire pour savoir où et comment enregistrer les fichiers entrants
    destination: (req, file, callback) => { // Ce paramètre sert uniquement à la destination d'enregistrement
        callback(null, 'images');
    },
    filename: (req, file, callback) => { // Ce paramètre sert pour définir le nom du fichier là où il va être enregistrer
        const name = file.originalname.split(' ').join('_'); // Coupe le nom du fichier original à chaque espace puis les remplaces par des underscores
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});


module.exports = multer({ storage }).single('image');
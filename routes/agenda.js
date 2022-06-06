const imageRepository = require('../repository/aws');
const aws = new imageRepository();
const multer = require('multer');
const { S3 } = require('aws-sdk');
const upload = multer();
var router = require('express').Router();
const { query } = require('../database/connection');
var connection = require('../database/connection');
var queries = require('../database/queries/agenda');

router.get('/lista', (req, res) => {
    connection.query(queries.listar, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.render('templates/agendas', { agenda: result });
        }
    })
})

router.get('/editar/:id', (req, res) => {
    connection.query(queries.agenda(req.params.id), (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.render('templates/editar', { agenda: result });
        }
    })
})
router.post('/editar/:id', (req, res) => {
    var data = {
        id: req.params.id,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        fecha_nac: req.body.fecha_nac,
    }
    connection.query(queries.actualizar(data), (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/agenda/lista');
        }
    })
})

router.get('/uploadImage:id', (req, res) => {
    connection.query(queries.agenda(req.params.id), (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.render('templates/agregarimagen', { agenda: result });
        }
    })
})

router.post('/uploadImage:id', upload.single('imagen'), async (req, res, next) => {
    const id = req.params.id
    const imagen = req.file.buffer;
    const type = req.file.mimetype
    const key = `${id}.${type.split('/')[1]}`
    var data = {
        id : id,
        imagen: key        
    }
    //const imageUrl = `https://azgendabucket.s3.amazonaws.com/${key}`
    await aws.uploadImage(id, imagen, type);
    connection.query(queries.actualizarimagen(data));

    return res.redirect('/agenda/lista');
});

router.get('/updateImage:id', (req, res) => {
    connection.query(queries.agenda(req.params.id), (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.render('templates/editarimagen', { agenda: result });
        }
    })
})

router.post('/updateImage:id', upload.single('imagenupdate'), async (req, res, next) => {
    const id = req.params.id
    const imagen = req.file.buffer;
    const type = req.file.mimetype
    const key = `${id}.${type.split('/')[1]}`
    const keydelete = req.body.imagendelete;
    var data = {
        id : id,
        imagen: key        
    }

    await aws.deleteImage(keydelete)

    await aws.uploadImage(id, imagen, type);
    connection.query(queries.actualizarimagen(data));

    return res.redirect('/agenda/lista');
});



router.post('/eliminar:id', async (req, res) => {
    const key = req.body.imagendelete;
    await aws.deleteImage(key);
    connection.query(queries.eliminar(req.params.id), (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/agenda/lista');
        }
    })
})

router.get('/agregar', (req, res) => {
    res.render('templates/agregar');
})

router.post('/agregar', (req, res) => {
    var data = {
        id: req.body.id,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        fecha_nac: req.body.fecha_nac,
    }
    connection.query(queries.agregar(data), (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/agenda/lista');
        }
    })
})
module.exports = router;
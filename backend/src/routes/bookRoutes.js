const express = require('express');
const router = express.Router();

const bookController = require('../controller/bookController');
router.post('/createBook',bookController.createBook);
router.get('/getAllBook',bookController.getAllBooks);
router.get('/getBookById/:id',bookController.getBookById);
router.put('/updateBook/:id',bookController.updateBook);
router.delete('/deleteBook/:id',bookController.deleteBook);


module.exports = router;
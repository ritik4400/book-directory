const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: { type: String ,required: true },
    author: { type: String ,required: true },
    isbn: { type: String ,required: true },
    publishedDate: { type: Date ,default: Date.now },
})

const Book = mongoose.model('book',bookSchema);
module.exports = Book;
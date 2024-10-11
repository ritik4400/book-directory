const DBbook = require('../model/bookModel');

exports.createBook = async(req,res)=>{
    try{
        const {title , author , isbn} = req.body;
        const book = new DBbook({
            title,
            author,
            isbn
        })
        const newBook = await book.save();
        res.status(201).json(newBook)
    }catch(err){
        console.log(err,message);
        res.status(400).json({message:err.massage})
        
    }
}

exports.getBookById = async (req, res) => {
    try {
      const { id } = req.params;
      const book = await DBbook.findById(id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
      res.json(book);
    } catch (err) {
        console.log(err);
        
      res.status(500).json({ message: err.message });
    }
  };

exports.getAllBooks = async(req,res)=>{
    try{
        const book = await DBbook.find();
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book)
    }catch(err){
        console.log(err.message);
        res.status(400).json({message:err.massage})
    }
}

exports.updateBook = async(req,res)=>{
    try{
        const { id } = req.params;
        const {title , author , isbn} = req.body;
        const updatedBook= await  DBbook.findByIdAndUpdate(
            id,
            {title , author , isbn},
            {new:true,runValidators: true}
        );
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(updatedBook)
    }catch(err){
        console.log(err.message);
        res.status(400).json({message:err.massage})
    }
}

exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        // Find the book by ID and delete it
        const deletedBook = await DBbook.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message });
    }
};
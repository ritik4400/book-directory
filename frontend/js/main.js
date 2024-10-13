document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookForm');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const isbnInput = document.getElementById('isbn');
    const bookList = document.getElementById('bookList');
    const updateBtn = document.getElementById('updateBtn');
    
    let currentBookId = null;
    const baseURL = 'http://localhost:5000/book';  // Base URL for your API

    // Fetch all books from backend
    const fetchBooks = async () => {
        try {
            const response = await fetch(baseURL);  // Fetching from the '/books' endpoint
            const books = await response.json();
            displayBooks(books);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    // Display all books
    const displayBooks = (books) => {
        bookList.innerHTML = '';
        books.forEach(book => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span><strong>${book.title}</strong> by ${book.author} (ISBN: ${book.isbn})</span>
                <button class="editBtn" data-id="${book._id}">Edit</button>
                <button class="deleteBtn" data-id="${book._id}">Delete</button>
            `;
            bookList.appendChild(li);
        });
    };

    // Add a new book (POST)
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newBook = {
            title: titleInput.value,
            author: authorInput.value,
            isbn: isbnInput.value
        };
        try {
            const response = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook)
            });
            const book = await response.json();
            console.log('Book added:', book);
            fetchBooks();  // Refresh the book list
            form.reset();  // Reset the form after adding
        } catch (error) {
            console.error('Error adding book:', error);
        }
    });

    // Delete a book (DELETE)
    bookList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('deleteBtn')) {
            const bookId = e.target.dataset.id;
            try {
                await fetch(`${baseURL}/${bookId}`, {
                    method: 'DELETE'
                });
                console.log('Book deleted');
                fetchBooks();  // Refresh the book list
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        }
    });

    // Edit book functionality (load data for editing)
    bookList.addEventListener('click', (e) => {
        if (e.target.classList.contains('editBtn')) {
            const bookId = e.target.dataset.id;
            loadBookForEdit(bookId);  // Load the book's data into the form for editing
        }
    });

    // Load book for editing (GET by ID)
    const loadBookForEdit = async (id) => {
        currentBookId = id;
        try {
            const response = await fetch(`${baseURL}/${id}`);  // Fetching the specific book by ID
            const book = await response.json();
            titleInput.value = book.title;
            authorInput.value = book.author;
            isbnInput.value = book.isbn;
            updateBtn.style.display = 'inline';  // Show the update button
        } catch (error) {
            console.error('Error loading book for edit:', error);
        }
    };

    // Update a book (PUT)
    updateBtn.addEventListener('click', async () => {
        const updatedBook = {
            title: titleInput.value,
            author: authorInput.value,
            isbn: isbnInput.value
        };
        try {
            await fetch(`${baseURL}/${currentBookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBook)  // Send the updated data
            });
            console.log('Book updated');
            fetchBooks();  // Refresh the book list
            form.reset();  // Reset the form
            updateBtn.style.display = 'none';  // Hide the update button after update
        } catch (error) {
            console.error('Error updating book:', error);
        }
    });

    // Initial fetch to populate book list
    fetchBooks();
});

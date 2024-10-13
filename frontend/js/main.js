document.getElementById('createBookForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const res = await fetch('http://localhost:5000/book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author, isbn })
    });
    
    const data = await res.json();
    alert('Book Created: ' + JSON.stringify(data));
});

document.getElementById('getAllBooks').addEventListener('click', async function() {
    const res = await fetch('http://localhost:5000/book');
    const data = await res.json();

    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    data.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author}`;
        bookList.appendChild(li);
    });
});

document.getElementById('getBookById').addEventListener('click', async function() {
    const bookId = document.getElementById('bookId').value;
    
    const res = await fetch(`http://localhost:5000/book/${bookId}`);
    const data = await res.json();

    const bookDetails = document.getElementById('bookDetails');
    if (data.title) {
        bookDetails.textContent = `Title: ${data.title}, Author: ${data.author}, ISBN: ${data.isbn}`;
    } else {
        bookDetails.textContent = 'Book not found';
    }
});

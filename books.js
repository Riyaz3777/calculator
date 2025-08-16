let books = JSON.parse(localStorage.getItem("books")) || [];
const bookForm = document.getElementById("book-form");
const bookList = document.getElementById("book-list");
const editIndex = document.getElementById("editIndex");
const searchInput = document.getElementById("searchInput");
const filterAvailability = document.getElementById("filterAvailability");

function renderBooks(){
  bookList.innerHTML="";
  const searchText=searchInput.value.toLowerCase();
  const filter=filterAvailability.value;
  books.filter(book=>{
    const matchesSearch=book.title.toLowerCase().includes(searchText)||book.author.toLowerCase().includes(searchText);
    const matchesFilter=filter==='all'||(filter==='available'&&book.available)||(filter==='issued'&&!book.available);
    return matchesSearch&&matchesFilter;
  }).forEach((book,index)=>{
    bookList.innerHTML+=`
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.category}</td>
        <td>${book.available?'Available ✅':'Issued ❌'}</td>
        <td>
          <button onclick="editBook(${index})">✏️ Edit</button>
          <button onclick="deleteBook(${index})">🗑️ Delete</button>
        </td>
      </tr>
    `;
  });
}

bookForm.addEventListener("submit",e=>{
  e.preventDefault();
  const title=document.getElementById("title").value;
  const author=document.getElementById("author").value;
  const category=document.getElementById("category").value;
  if(editIndex.value==="") books.push({title,author,category,available:true});
  else { books[editIndex.value]={title,author,category,available:true}; editIndex.value=""; }
  localStorage.setItem("books",JSON.stringify(books));
  bookForm.reset();
  renderBooks();
});

function editBook(index){
  const book=books[index];
  document.getElementById("title").value=book.title;
  document.getElementById("author").value=book.author;
  document.getElementById("category").value=book.category;
  editIndex.value=index;
}

function deleteBook(index){
  books.splice(index,1);
  localStorage.setItem("books",JSON.stringify(books));
  renderBooks();
}

searchInput.addEventListener("input",renderBooks);
filterAvailability.addEventListener("change",renderBooks);
renderBooks();

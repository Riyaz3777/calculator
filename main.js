// Dark/Light Mode Toggle
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Update Home Page stats if available
if(document.getElementById('totalBooks')){
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const members = JSON.parse(localStorage.getItem("members")) || [];
  const issuedBooks = JSON.parse(localStorage.getItem("issuedBooks")) || [];
  document.getElementById("totalBooks").textContent = books.length;
  document.getElementById("availableBooks").textContent = books.filter(b=>b.available).length;
  document.getElementById("issuedBooks").textContent = issuedBooks.filter(b=>!b.returned).length;
  document.getElementById("totalMembers").textContent = members.length;
}

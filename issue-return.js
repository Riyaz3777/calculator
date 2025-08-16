let books = JSON.parse(localStorage.getItem("books")) || [];
let members = JSON.parse(localStorage.getItem("members")) || [];
let issuedBooks = JSON.parse(localStorage.getItem("issuedBooks")) || [];

const memberSelect = document.getElementById("memberSelect");
const bookSelect = document.getElementById("bookSelect");
const issueForm = document.getElementById("issue-form");
const issueList = document.getElementById("issue-list");

// Populate dropdowns
function loadDropdowns() {
  memberSelect.innerHTML = `<option value="">-- Select Member --</option>`;
  members.forEach(member => {
    memberSelect.innerHTML += `<option value="${member.memberId}">${member.name} (${member.memberId})</option>`;
  });

  bookSelect.innerHTML = `<option value="">-- Select Book --</option>`;
  books.filter(book => book.available).forEach((book, index) => {
    bookSelect.innerHTML += `<option value="${index}">${book.title}</option>`;
  });
}

// Render issued books table
function renderIssuedBooks() {
  issueList.innerHTML = "";
  issuedBooks.forEach((record, index) => {
    const book = books[record.bookIndex];
    const member = members.find(m => m.memberId === record.memberId);
    issueList.innerHTML += `
      <tr>
        <td>${member ? member.name : "Unknown"}</td>
        <td>${book ? book.title : "Unknown"}</td>
        <td>${record.issueDate}</td>
        <td>${record.dueDate}</td>
        <td>${record.returned ? "Returned ✅" : "Issued ❌"}</td>
        <td>
          ${!record.returned ? `<button onclick="returnBook(${index})">Return</button>` : ""}
        </td>
      </tr>
    `;
  });
}

// Issue a book
issueForm.addEventListener("submit", e => {
  e.preventDefault();

  const memberId = memberSelect.value;
  const bookIndex = bookSelect.value;
  const dueDate = document.getElementById("dueDate").value;

  if (memberId === "" || bookIndex === "" || dueDate === "") {
    alert("Please fill all fields!");
    return;
  }

  // Create issue record
  const record = {
    memberId,
    bookIndex: parseInt(bookIndex),
    issueDate: new Date().toLocaleDateString(),
    dueDate,
    returned: false
  };

  issuedBooks.push(record);
  localStorage.setItem("issuedBooks", JSON.stringify(issuedBooks));

  // Mark book as unavailable
  books[bookIndex].available = false;
  localStorage.setItem("books", JSON.stringify(books));

  issueForm.reset();
  loadDropdowns();      // Refresh dropdowns
  renderIssuedBooks();   // Refresh table
});

// Return a book
function returnBook(index) {
  const record = issuedBooks[index];
  record.returned = true;
  books[record.bookIndex].available = true;

  localStorage.setItem("issuedBooks", JSON.stringify(issuedBooks));
  localStorage.setItem("books", JSON.stringify(books));

  loadDropdowns();
  renderIssuedBooks();
}

// Initialize
loadDropdowns();
renderIssuedBooks();

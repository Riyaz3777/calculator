// Load data
const books = JSON.parse(localStorage.getItem("books")) || [];
const members = JSON.parse(localStorage.getItem("members")) || [];
const issuedBooks = JSON.parse(localStorage.getItem("issuedBooks")) || [];

// Update summary stats
document.getElementById("totalBooks").textContent = books.length;
document.getElementById("availableBooks").textContent = books.filter(b => b.available).length;
document.getElementById("issuedBooks").textContent = issuedBooks.filter(b => !b.returned).length;
document.getElementById("totalMembers").textContent = members.length;

// Prepare data for category chart
const categoryCount = {};
books.forEach(book => {
  categoryCount[book.category] = (categoryCount[book.category] || 0) + 1;
});

const ctx = document.getElementById('categoryChart').getContext('2d');
const categoryChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: Object.keys(categoryCount),
    datasets: [{
      label: 'Number of Books',
      data: Object.values(categoryCount),
      backgroundColor: 'rgba(54, 162, 235, 0.6)'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Books by Category' }
    }
  }
});

/**
 * Rendering Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('filter-tabs')) {
    renderFilterTabs();
  }
  if (document.getElementById('blog-grid')) {
    renderBlogGrid('All');
  }

  // Handle Filtering
  document.getElementById('filter-tabs').addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-tab')) {
      // Update active state
      document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
      e.target.classList.add('active');

      // Re-render grid
      const category = e.target.getAttribute('data-category');
      renderBlogGrid(category);
    }
  });
});


function renderFilterTabs() {
  const container = document.getElementById('filter-tabs');
  
  container.innerHTML = blogData.categories.map((cat, index) => {
    return `<button class="filter-tab ${index === 0 ? 'active' : ''}" data-category="${cat}">${cat}</button>`;
  }).join('');
}

function renderBlogGrid(filterCategory) {
  const container = document.getElementById('blog-grid');
  
  let postsToRender = blogData.posts;
  
  if (filterCategory !== 'All') {
    postsToRender = blogData.posts.filter(post => post.category === filterCategory);
  }

  if (postsToRender.length === 0) {
    container.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--text-light); font-family: var(--font-serif); font-style: italic;">No archival records found for this category.</p>`;
    return;
  }

  container.innerHTML = postsToRender.map(post => `
    <article class="blog-card">
      <div class="card-img-wrapper">
        <span class="badge dark-badge card-badge">${post.category}</span>
        <img src="${post.image}" alt="${post.title}" loading="lazy">
      </div>
      <div class="card-meta">
        <span>${post.date}</span>
        <span>•</span>
        <span>${post.readTime}</span>
      </div>
      <h3 class="card-title">
        <a href="#">${post.title}</a>
      </h3>
      <p class="card-excerpt">${post.excerpt}</p>
      <div class="card-author">
        <span>By ${post.author}</span>
      </div>
    </article>
  `).join('');
}

// Newsletter Logic
function setupNewsletter() {
  const submitButtons = document.querySelectorAll('[id^="newsletter-submit"]');
  
  submitButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Find the associated email input
      const container = btn.closest('.newsletter-form');
      const emailInput = container.querySelector('input[type="email"]');
      
      if (emailInput && emailInput.value) {
        // Mock successful subscription
        alert(`Thank you for subscribing to the Terroir Dispatch with ${emailInput.value}!`);
        emailInput.value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', setupNewsletter);

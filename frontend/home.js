const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');
const username = localStorage.getItem('username');

const createBlogContent = document.getElementById('createBlogContent');
const logoutBtn = document.getElementById('logoutBtn');
const myBlogsLink = document.getElementById('myBlogsLink');
const analyticsLink = document.getElementById('analyticsLink');
const profileLink = document.getElementById('profileLink');

// Check authentication status
if (token) {
  createBlogContent.innerHTML = `
    <h3>✍️ Create a New Blog</h3>
    <form id="createBlogForm">
      <div class="form-group">
        <label for="title">Blog Title:</label>
        <input type="text" id="title" placeholder="Enter blog title" required>
      </div>
      <div class="form-group">
        <label for="content">Blog Content:</label>
        <textarea id="content" placeholder="Write your blog content here..." rows="6" required></textarea>
      </div>
      <button type="submit" class="btn-primary">Publish Blog</button>
    </form>
  `;

  logoutBtn.style.display = 'block';
  document.getElementById('createBlogForm').addEventListener('submit', createBlog);
} else {
  createBlogContent.innerHTML = `
    <div class="auth-prompt">
      <p>📝 Please login to create a blog</p>
      <a href="login.html" class="btn-primary">Login</a>
      <a href="register.html" class="btn-secondary">Sign Up</a>
    </div>
  `;
  myBlogsLink.style.display = 'none';
  analyticsLink.style.display = 'none';
  profileLink.style.display = 'none';
}

// Create Blog
async function createBlog(e) {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  try {
    const response = await fetch('http://localhost:3000/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, content })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || 'Failed to create blog');
      return;
    }

    alert('Blog published successfully!');
    document.getElementById('createBlogForm').reset();
    loadBlogs();
  } catch (error) {
    console.error('Error creating blog:', error);
    alert('An error occurred while creating the blog');
  }
}

// Load Blogs
async function loadBlogs() {
  try {
    const response = await fetch('http://localhost:3000/api/blogs');
    const blogs = await response.json();

    const blogDiv = document.getElementById('blogs');
    blogDiv.innerHTML = '';

    if (blogs.length === 0) {
      blogDiv.innerHTML = '<p class="no-blogs">No blogs available yet. Be the first to create one!</p>';
      return;
    }

    blogs.forEach(blog => {
      const blogCard = document.createElement('div');
      blogCard.className = 'blog-card';
      blogCard.innerHTML = `
        <div class="blog-header">
          <h3>${blog.title || 'Untitled'}</h3>
          <span class="blog-author">By ${blog.author || 'Anonymous'}</span>
        </div>
        <p class="blog-content">${blog.content}</p>
        <div class="blog-footer">
          <span class="blog-date">${new Date(blog.createdAt).toLocaleDateString()}</span>
          <span class="blog-views">👁️ ${blog.views || 0} views</span>
        </div>
        <button class="btn-read-more" onclick="viewBlog('${blog._id}')">Read More</button>
      `;
      blogDiv.appendChild(blogCard);
    });
  } catch (error) {
    console.error('Error loading blogs:', error);
    document.getElementById('blogs').innerHTML = '<p class="error-message">Failed to load blogs</p>';
  }
}

// View Single Blog
function viewBlog(blogId) {
  window.location.href = `blog-detail.html?id=${blogId}`;
}

// Logout
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  window.location.href = 'home.html';
});

// Initial load
loadBlogs();

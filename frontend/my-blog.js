const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');

if (!token) {
  window.location.href = 'login.html';
}

async function loadMyBlogs() {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userId}/blogs`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const blogs = await response.json();
    const myBlogsDiv = document.getElementById('myBlogs');

    if (blogs.length === 0) {
      myBlogsDiv.innerHTML = '<p class="no-blogs">You haven\'t created any blogs yet.</p>';
      return;
    }

    myBlogsDiv.innerHTML = '';
    blogs.forEach(blog => {
      const blogCard = document.createElement('div');
      blogCard.className = 'blog-card-edit';
      blogCard.innerHTML = `
        <div class="blog-header">
          <h3>${blog.title}</h3>
          <div class="blog-actions">
            <button class="btn-edit" onclick="editBlog('${blog._id}')">Edit</button>
            <button class="btn-delete" onclick="deleteBlog('${blog._id}')">Delete</button>
          </div>
        </div>
        <p class="blog-content">${blog.content.substring(0, 100)}...</p>
        <div class="blog-footer">
          <span class="blog-date">${new Date(blog.createdAt).toLocaleDateString()}</span>
          <span class="blog-views">👁️ ${blog.views} views</span>
        </div>
      `;
      myBlogsDiv.appendChild(blogCard);
    });
  } catch (error) {
    console.error('Error loading blogs:', error);
  }
}

async function deleteBlog(blogId) {
  if (!confirm('Are you sure you want to delete this blog?')) return;

  try {
    const response = await fetch(`http://localhost:3000/api/blogs/${blogId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      alert('Blog deleted successfully');
      loadMyBlogs();
    }
  } catch (error) {
    console.error('Error deleting blog:', error);
  }
}

function editBlog(blogId) {
  window.location.href = `edit-blog.html?id=${blogId}`;
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.clear();
  window.location.href = 'home.html';
});

loadMyBlogs();

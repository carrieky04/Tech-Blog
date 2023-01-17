

const blogPostLink = async () => {
    const response = await fetch('/post/:id', {
      method: 'GET',
    });
  
    if (response.ok) {
      document.location.replace('post');
    } else {
      alert(response.statusText);
    }
  };
  
  document.querySelector('#blog-Post').addEventListener('click', blogPostLink);
  
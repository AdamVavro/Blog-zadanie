import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonfakery.com',
  timeout: 10000,
});

// funkcia na získanie zoznamu blogov z externého API
export async function getBlogs() {
  const response = await apiClient.get('/blogs');
  return response.data;
}

//funkcie načíta detail jedného blogu z API na základe jeho ID
export async function getBlog(id) {
  const blogs = await getBlogs();
  const blog = blogs.find((blog) => blog.id === id);
  return blog || null;
}
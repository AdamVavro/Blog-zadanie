// lib/api.js
import axios from 'axios';

export async function getBlogs() {
  const response = await axios.get('https://jsonfakery.com/blogs');
  return response.data;
}

export async function getBlog(id) {
    const response = await axios.get(`https://jsonfakery.com/blogs/${id}`);
    return response.data;
}
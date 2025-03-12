// import knižnice axios
import axios from 'axios';

// funkcia na získanie zoznamu blogov z externého API
export async function getBlogs() {
  const response = await axios.get('https://jsonfakery.com/blogs');
  return response.data;
}

//funkcie načíta detail jedného blogu z API na základe jeho ID
export async function getBlog(id) {
    const response = await axios.get(`https://jsonfakery.com/blogs/${id}`);
    return response.data;
}
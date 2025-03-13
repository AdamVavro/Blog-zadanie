// import knižnice axios
import axios from 'axios';

// funkcia na získanie zoznamu blogov z externého API
export async function getBlogs() {
  const response = await axios.get('https://jsonfakery.com/blogs');
 // console.log(response);
  return response.data;
}

//funkcie načíta detail jedného blogu z API na základe jeho ID
export async function getBlog(id) {
  const blogs = await getBlogs();
  const blog = blogs.find((blog) => blog.id === id);
  //console.log('Found blog:', blog);
  return blog;
}
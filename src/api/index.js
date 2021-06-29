// import axios from 'axios';
// const url = 'http://localhost:5000/posts';

// export const fetchPosts = ()=> axios.get(url);
// export const createPost =(newPost) => axios.post(url,newPost)
  
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  
  return req;
});

export const fetchPosts = () => API.get('/posts');
export const fetchUsers = () => API.get('/user');
export const createPost = (newPost) => API.post('/posts', newPost);
export const signIn = (bodyData) => API.post('/user/signin', bodyData);
export const signUp = (bodyData) => API.post('/user/signup', bodyData);
export const friendsReq= (id_f) => API.patch(`/user/${id_f}/friendsReq`);
export const friendsAcc= (id_f) => API.patch(`/user/${id_f}/friendsAcc`);
export const friendsRef= (id_f) => API.patch(`/user/${id_f}/friendsRef`);
// export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);


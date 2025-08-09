import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Protected from './Component/AuthLayout.jsx';
import Home from './pages/Home.jsx';
import AllPosts from './pages/AllPosts.jsx';
import AddPost from './pages/AddPost.jsx';
import EditPost from './pages/EditPost.jsx';
import Post from './pages/Post.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route
        path="/login"
        element={
          <Protected authentication={false}>
            <Login />
          </Protected>
        }
      />
      <Route
        path="/signup"
        element={
          <Protected authentication={false}>
            <Signup />
          </Protected>
        }
      />
      <Route
        path='/all-posts'
        element={
          <Protected authentication>
            {" "}
            <AllPosts/>
          </Protected>
        }
      />
      <Route
        path='/add-post'
        element={
          <Protected authentication>
            {" "}
            <AddPost/>
          </Protected>
        }
      />  
      <Route
        path='/edit-post/:slug'
        element={
          <Protected>
            {" "}
            <EditPost/>

          </Protected>
        }
      />
      <Route
        path='/post/:slug'
        element={
          <Post />
        }
      />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

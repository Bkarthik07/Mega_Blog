import React, { useEffect, useState } from 'react';
import './App.css'
import { Footer, Header } from './Component';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login,logout } from './store/authSlice';
import { Outlet } from "react-router-dom";
function App() {
  //To access environment variables we
  // console.log(import.meta.env.VITE_APPWRITE_URL);

  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userDate)=>{
      if(userDate){
        dispatch(login({userDate}));
      }
      else{
        dispatch(logout());
      }
    })
    .finally(()=> setLoading(false))
  },[])


  return !loading?(
    <div className='min-h-screen flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
      <Header />
      <main className="flex-1">
        <Outlet /> {/* This renders nested routes */}
      </main>
      <Footer />
      </div>
    </div>
  ):null
}

export default App

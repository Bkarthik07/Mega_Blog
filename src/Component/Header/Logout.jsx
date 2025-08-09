import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function Logout() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      onClick={logoutHandler}
      className="bg-[#f97316] hover:bg-[#fb923c] text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
    >
      Logout
    </button>
  );
}

export default Logout;

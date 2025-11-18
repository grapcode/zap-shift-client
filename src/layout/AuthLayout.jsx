import React from 'react';
import Logo from '../components/Logo';
import { NavLink, Outlet } from 'react-router';
import authImg from '../assets/authImage.png';

const AuthLayout = () => {
  return (
    <div className="grid md:grid-cols-2 h-screen">
      {/* Left - White */}
      <div className="bg-white flex flex-col max-w-7xl mx-auto w-full mt-10">
        <NavLink to="/">
          <Logo />
        </NavLink>
        <Outlet />
      </div>

      {/* Right - Base Background */}
      <div className="bg-base-200 flex items-center justify-center">
        <img src={authImg} alt="" className=" object-cover" />
      </div>
    </div>
  );
};

export default AuthLayout;

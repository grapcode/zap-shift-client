import React from 'react';
import logo from '../assets/logo.png';

const Logo = () => {
  return (
    <div className="flex  justify-center items-end">
      <img src={logo} alt="" />
      <h2 className="text-3xl font-bold -ms-2">ZapShift</h2>
    </div>
  );
};

export default Logo;

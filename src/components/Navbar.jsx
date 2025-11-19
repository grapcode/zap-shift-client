import React from 'react';
import { Link, NavLink } from 'react-router';
import MyContainer from './my-components/MyContainer';
import { IoReorderThreeOutline } from 'react-icons/io5';
import Logo from './Logo';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, setUser, logOutUser } = useAuth();

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        toast.success('Logged out successfully.');
        setUser(null);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  // nav links
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/aboutUS">AboutUS</NavLink>
      </li>
      <li>
        <NavLink to="/sendParcel">Send Parcel</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/dashboard/my-parcels">My Parcels</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-base-100 shadow-sm">
      <MyContainer>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <IoReorderThreeOutline size={32} />
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>
            {/* logo */}
            <div className="flex gap-3 justify-center items-center ">
              <Link to="/" className="text-2xl font-bold text-primary">
                <Logo />
              </Link>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>

          <div className="navbar-end">
            {/* dropdown */}
            {/* <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1">
                <img
                  className="w-12 rounded-full border border-secondary p-1"
                  src="https://i.ibb.co.com/wFZ5C2D7/photo-1581184953987-5668072c8420.jpg"
                  alt=""
                />
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div> */}

            {user ? (
              <button onClick={handleLogout} className="btn btn-primary">
                LogOut
              </button>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            )}
            <Link to="/rider" className="btn btn-secondary text-primary ml-3">
              Be a Rider
            </Link>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Navbar;

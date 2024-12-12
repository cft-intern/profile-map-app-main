import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='bg-primary p-4'>
      <div className='container mx-auto flex flex-col justify-center md:flex-row md:justify-between items-center'>
        <h1 className='text-white text-2xl font-bold'>USERS PROFILE MAP APP</h1>
        <div className='space-x-6'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              ` ${
                isActive ? 'text-gray-800 underline ' : 'text-white'
              } text-lg font-medium `
            }
          >
            Home
          </NavLink>
          <NavLink
            to='/admin'
            className={({ isActive }) =>
              ` ${
                isActive ? 'text-gray-800 underline ' : 'text-white'
              } text-lg font-medium `
            }
          >
            Admin
          </NavLink>
          <NavLink
            to='/map'
            className={({ isActive }) =>
              ` ${
                isActive ? 'text-gray-800 underline ' : 'text-white'
              } text-lg font-medium `
            }
          >
            Map
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

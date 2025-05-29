import React from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/favorites', label: 'Favorites' },
];

const Navbar = () => {
  return (
    <nav className="w-full sticky top-0 z-50 text-white p-4 flex justify-between bg-blue-600">
      <Link to="/" className="font-bold text-xl">
        Product Dashboard
      </Link>
        <div className="w-1/2 flex justify-between">
          {navLinks.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className="hover:underline"
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

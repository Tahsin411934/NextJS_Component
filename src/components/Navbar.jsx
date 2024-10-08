"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); 
  const links = ["Home", "About", "Services", "Contact"];

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('sidebar');
      const menuBtn = document.getElementById('menu-btn');
      if (isOpen && !sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex items-center justify-between relative">
          <div className="text-white text-xl font-bold">My Website</div>
          <div className="md:hidden">
            <button
              id="menu-btn"
              className="text-white focus:outline-none relative z-20 flex flex-col space-y-1"
              onClick={toggleSidebar}
            >
              <span className={`block h-1 w-6 bg-white transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block h-1 w-6 bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-1 w-6 bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </button>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6 list-none">
            {links.map(link => (
              <li key={link}>
                <Link
              href={`/${link.toLowerCase()}`}
              className={`py-2 px-4 rounded-md transition duration-300 
                ${pathname === `/${link.toLowerCase()}` ? 'bg-blue-700 text-white' : 'text-blue-200 hover:bg-blue-600 hover:text-white'}`}
            >
              {link}
            </Link>
              </li>
            ))}
          </div>
        </div>
      </nav>

      <div
        id="sidebar"
        className={`fixed top-0 right-0 h-full bg-green-500 transition-all duration-300 z-10 md:hidden overflow-hidden ${isOpen ? 'w-3/4 opacity-100' : 'w-0 opacity-0'}`}
      >
        <div className="flex flex-col space-y-4 mt-12">
          {links.map(link => (
            <a key={link} href="#" className={`block py-2 px-4 text-white hover:bg-blue-700 rounded-md transition duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
              {link}
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Custom styles for smooth transition */
        .menu-transition {
          transition: all 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Navbar;

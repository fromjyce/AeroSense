"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="w-full p-4 bg-transparent">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="AirSense"
            width={55}
            height={55}
          />
          <Link href="/" className="text-3xl font-bold poppins dela_gothic_one">
            AeroSense
          </Link>
        </div>
        <button
          onClick={toggleMenu}
          className="block md:hidden text-3xl focus:outline-none icon-colour"
        >
          ☰
        </button>
        <nav className="hidden md:flex space-x-8">
          <Link href="/about" className="poppins font-bold text-lg px-4 py-2 hover:text-green hover:underline">
            About
          </Link>
          <Link href="/#simulate" passHref className="poppins font-bold text-lg px-4 py-2 hover:text-green hover:underline">
            Simulate
          </Link>
          <Link href="/#predict" passHref className="poppins px-4 font-bold text-lg py-2 bg-green text-white rounded hover:bg-opacity-80">
            Predict
          </Link>
        </nav>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center space-y-6 z-50">
          <button onClick={closeMenu} className="absolute top-4 right-4 text-white text-4xl focus:outline-none hb-close-item">
            &times;
          </button>
          <Link href="/about" onClick={closeMenu} className="text-white text-2xl font-bold poppins transition-colors duration-300 hb-menu-item">
            About
          </Link>
          <Link href="/#simulate" passHref onClick={closeMenu} className="text-white text-2xl font-bold poppins transition-colors duration-300 hb-menu-item">
            Simulate
          </Link>
          <Link href="/#predict" passHref onClick={closeMenu} className="text-white text-2xl font-bold poppins bg-green py-2 px-4 rounded transition-colors duration-300 hb-menu-item">
            Predict
          </Link>
        </div>
      )}
    </header>
  );
}

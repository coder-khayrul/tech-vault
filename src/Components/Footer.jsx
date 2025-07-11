import React from "react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-indigo-950 text-indigo-100 py-10 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          {/* Logo/Brand */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-indigo-100">TechScope</h1>
            <p className="text-sm text-indigo-300 mt-1">
              Discover & Review Top Tech Products
            </p>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col md:flex-row gap-6 text-sm text-indigo-300">
            <a href="/" className="hover:text-indigo-100 transition">Home</a>
            <a href="/about" className="hover:text-indigo-100 transition">About</a>
            <a href="/reviews" className="hover:text-indigo-100 transition">Reviews</a>
            <a href="/submit" className="hover:text-indigo-100 transition">Submit Product</a>
            <a href="/contact" className="hover:text-indigo-100 transition">Contact</a>
          </div>
        </div>

        <Separator className="my-6 bg-indigo-700" />

        {/* Copyright */}
        <div className="text-center text-lg text-indigo-400">
          &copy; {new Date().getFullYear()} AppOrbit. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-[#2D3D73] via-indigo-600 to-purple-600 text-white py-10 px-2 lg:px-6 box-border">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8 border-red-600">
        <div>
          <h1 className="text-2xl font-extrabold mb-2 tracking-wide">EduQuest</h1>
          <p className="text-sm text-gray-100">
            Level up your learning! Play, practice, and master new topics with fun, interactive quizzes.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Explore</h2>
          <ul className="space-y-2 text-sm text-gray-100">
            <li><a href="/" className="hover:text-white">Quizzes</a></li>
            <li><a href="#" className="hover:text-white">Leaderboard</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Support</h2>
          <ul className="space-y-2 text-sm text-gray-100">
            <li><a href="#" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Follow Us</h2>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-white"><FaFacebook /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="mt-2 border-t border-white/20 pt-4 text-center text-sm text-gray-200">
        © 2025 EduQuest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

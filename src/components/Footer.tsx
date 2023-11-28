import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className="bg-gradient-to-b from-gray-300 via-gray-400 to-gray-600 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">Tech Alchemist&apos;s Profile</h2>
          <p className="text-gray-300">Navigating the coding cosmos, one project at a time</p>
        </div>

        <div className="flex space-x-4">
          <Link
            href="https://www.linkedin.com/in/arpitdhamija/"
            target="_blank"
            className="text-gray-300 hover:text-gray-100 transition duration-300"
          >
            <Linkedin className='text-black'/>
          </Link>
          <Link
            href="mailto:appydam@gmail.com"
            className="text-gray-300 hover:text-gray-100 transition duration-300"
          >
            <Mail className='text-black'/>
          </Link>
          <Link
            href="https://github.com/appydam"
            target="_blank"
            className="text-gray-300 hover:text-gray-100 transition duration-300"
          >
            <Github className='text-black'/>
          </Link>
          <Link
            href="https://twitter.com/arpit_dhamija"
            target="_blank"
            className="text-gray-300 hover:text-gray-100 transition duration-300"
          >
            <Twitter className='text-black'/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;

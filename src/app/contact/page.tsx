import Navbar from '@/components/Navbar';
import React from 'react'

type Props = {}

const ContactPage = (props: Props) => {
    return (
        <div className="w-screen min-h-screen bg-[conic-gradient(var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600">
          <Navbar/>
          <div className="min-h-screen flex items-center justify-center  text-gray-600">
            <div className="text-center bg-[conic-gradient(var(--tw-gradient-stops))] from-gray-400 via-gray-200 to-gray-50 p-5 rounded-2xl">
              <h1 className="text-4xl font-bold mb-4 animate__animated animate__fadeIn">Contact Us</h1>
              <p className="text-lg animate__animated animate__fadeIn animate__delay-1s">
                Coming soon..
              </p>
            </div>
          </div>
        </div>
      );
}

export default ContactPage
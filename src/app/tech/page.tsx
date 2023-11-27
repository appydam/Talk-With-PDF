// pages/index.tsx

import Navbar from '@/components/Navbar';
import TechStack from '@/components/TechStack';
import React from 'react';


const TechPage = () => {
  return (
    <div className="w-screen min-h-screen bg-[conic-gradient(var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600">
       <Navbar/>
        {/* <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-3xl w-full text-center bg-[conic-gradient(var(--tw-gradient-stops))] from-gray-400 via-gray-200 to-gray-50 p-5 rounded-2xl">
                <h1 className="text-4xl font-bold mb-8">Technologies Used</h1>
                <TechStack />
            </div>
            
        </div>

        
        <div>
            <p>Coming Soon..</p>
            AI tech blogs in Advance Deep Learning and building AI applications
        </div> */}

        <div className="text-center translate-y-72"> 
        
            <div className="max-w-3xl mx-auto bg-[conic-gradient(var(--tw-gradient-stops))] from-gray-500 via-gray-100 to-gray-200 p-5 rounded-2xl">
            <h1 className="text-4xl font-bold mb-4">Technologies Used <span className='text-sm'>in this project</span></h1>
            <TechStack />
            </div>

        
            <div className="min-h-screen p-5 rounded-2xl mt-24">
                <p className='text-3xl'>Coming Soon..</p>
                AI tech <b>blogs</b> in Advance Deep Learning and building AI applications
            </div>
        </div>
        
    </div>
  );
};

export default TechPage;

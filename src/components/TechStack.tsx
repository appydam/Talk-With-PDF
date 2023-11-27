// components/TechList.tsx

import React from 'react';

const TechStack: React.FC = () => {
  const technologies = [
    'Next.js', 'React.js', 'TailwindCSS', 'Lucid', 'OpenAI', 'Pinecone DB',
    'Shadcn', 'DrizzleORM', 'Clerk auth', 'Neon DB', 'AWS S3', 'Stripe',
    'Vercel SDK', 'Retrieval Augmented Generation', 'Edge Computing'
  ];

  return (
    <div className="flex flex-wrap justify-center items-center space-x-4">
      {technologies.map((tech, index) => (
        <div
          key={index}
          className="bg-gray-800 p-5 rounded-lg shadow-md text-white -m-1.5"
        >
          {tech}
        </div>
      ))}
    </div>
  );
};

export default TechStack;

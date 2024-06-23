import React from 'react';
import Navbar from '../components/Navbar';
import Title from '../components/Title';
import FormL1 from '../components/FormL1';
import FormL2 from '../components/FormL2';
import FormL3 from '../components/FormL3';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-5xl mx-auto py-8 px-4">
        <Title title={"Level 1 (Form)"} />
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <FormL1 />
        </div>
        <Title title={"Level 2 (Form)"} />
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <FormL2 />
        </div>
        <Title title={"Level 3 (Form)"} />
        <div className="bg-white shadow-lg rounded-lg p-6">
          <FormL3 />
        </div>
      </div>
    </div>
  );
};

export default Home;

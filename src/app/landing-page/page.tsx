import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
const Custom403: NextPage = () => {
  return (
    <div className="container">
      <div className="grid min-h-screen place-content-center">
        <div className="flex flex-col items-center">
          <div className="my-4 text-center">
            <h1 className="text-2xl text-brand-700">Hello user</h1>
            <p className=""></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom403;

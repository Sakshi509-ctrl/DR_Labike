import React from 'react';
import { Link } from 'react-router-dom';

const BlogsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fefd] flex flex-col items-center pt-24 pb-20 px-2">
      <div className="max-w-5xl w-full mx-auto">
        <h1 className="text-5xl font-extrabold text-left mb-4 mt-2 text-gray-600" style={{fontFamily: 'inherit'}}>Need Of Delievery Of Healthcare At Doorstep Is A Need Or Necessity?</h1>
        <div className="text-green-500 text-lg font-semibold mb-4">Uncategorized / drlabike</div>
        <p className="text-xl text-gray-500 mb-8">
          Generally we avoid hard tasks,because of which our healthcare is still have huge gaps, because we are not ready to identify the tough but Actual answer. We all need to understand 78% population of the country living in rural areas which are far off from resource reach locations related to healthcare in terms of knowledge [...]
        </p>
        <Link to="/blogs/1" className="text-green-500 text-lg font-semibold hover:underline">Read More »</Link>
      </div>
    </div>
  );
};

export default BlogsPage; 
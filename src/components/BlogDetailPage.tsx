import React from "react";
import Header from "./Header";
import Footer from "./footer";


const BlogDetailPage = () => {
    return (
      <div>
        <Header />
        <div className="p-10 bg-gray-50 min-h-screen">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 mt-24 ml-24">
            Need Of Delivery Of Healthcare At Doorstep Is A Need Or Necessity?
          </h1>
          <p className="text-green-600 mb-2 hover:text-black ml-24">/Uncategorized /By drlabike</p>
          
          <div className="ml-24 max-w-4xl">
            <p className="text-gray-600 mb-4">
              Generally we avoid hard tasks,because of which our healthcare is still have huge gaps, because we are not ready to identify the tough but Actual answer. We all need to understand 78% population of the country living in rural areas which are far off from resource reach locations related to healthcare in terms of knowledge and also the resources.
            </p>
            
            <p className="text-gray-600 mb-6">
              So let's talk for a minute about what makes healthcare delievery at doorstep is a necessity specifically in rural healthcare.
            </p>
            
            <ol className="list-decimal list-inside space-y-4 ml-4">
              <li className="text-gray-600">
                Delay of diagnosis resulting in the catastroph of family: specifically in rural areas, people tend to avoid going to medical center till disease becomes unbearable and there is no alternate left and these delays specifically lead to disease damage which is not returnable. like kidney damage, lever damage, heart attack.
              </li>
              <li className="text-gray-600">
                 Productivity loss happens at both the fronts a. When productive class has to leave their work to some urban location for medical checkup b. Because of irreparable damage it result into permanent loss of productivity for the country.
              </li>
              <li className="text-gray-600">
                To go to far off location for medical diagnosis, they have to engage many people, which again badly imapact family.
              </li>
            </ol>
            
            <p className="text-gray-600 mt-6">
              We have to find out ways to deliver quality healthcare to the people at doorstep. Innovations which can engage complete care.
            </p><br></br><br></br><br></br>
          </div>
        </div>
        <div className="flex justify-end mr-24">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-10 mt-0 " onClick={() => window.open('/medicalBlogs', '_self')}>
            Click here
          </button>
        </div>
        <Footer />
        <div className="w-full flex justify-center font-bold text-gray-600 mt-4 mb-4">
            <h6>Copyright © 2025 DrLaBike: Gateway to Pathology Lab Ownership | Powered by Swasthmnathan Meditech Pvt Ltd</h6>
          </div>
      </div>
    );
  };
  
  export default BlogDetailPage;
  
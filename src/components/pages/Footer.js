import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-6 mt-auto hover:text-white">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full sm:w-1/2 md:w-auto mb-4 sm:mb-0">
          <h4 className="text-xl font-semibold">About</h4>
          <p className="my-2">Mail Box</p>
          <p className="my-2">Mail Box Blog</p>
          <a className="underline-none text-sm font-semibold">
            2.37 GB of 15 GB used
          </a>
        </div>
        <div className="w-full sm:w-1/2 md:w-auto mb-4 sm:mb-0">
          <h4 className="text-xl font-semibold">Help</h4>
          <p className="my-2">User Guides</p>
          <p className="my-2">FAQ</p>
          <p className="my-2">Contact Support</p>
        </div>
        <div className="w-full sm:w-1/2 md:w-auto">
          <h4 className="text-xl font-semibold">Legal</h4>
          <p className="my-2">Terms of Service</p>
          <p className="my-2">Privacy Policy</p>
          <p className="my-2">Security Policy</p>
        </div>
      </div>
      <div className="container mx-auto mt-6 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Mail Box. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

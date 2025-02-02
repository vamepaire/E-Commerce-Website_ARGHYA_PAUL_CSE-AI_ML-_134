import React from "react";
// Import social media icons from React Icons
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-black text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
              amet elementum tortor.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-green-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="hover:text-green-400">
                  Shop
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-green-400">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-green-400">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Social Media</h3>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl hover:text-green-400"
                >
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl hover:text-green-400"
                >
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl hover:text-green-400"
                >
                  <FaInstagram />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: support@shopmate.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Address: 123 Shopmate St, City, Country</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm">&copy; 2025 ShopMate. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

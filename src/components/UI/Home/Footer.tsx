"use client"
import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <motion.h3 
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              About Us
            </motion.h3>
            <p className="text-gray-300 leading-relaxed">
              PremiumHaat is your gateway to luxury. We curate the finest products from across the globe, 
              bringing elegance and sophistication to your doorstep.
            </p>
          </div>
          <div>
            <motion.h3 
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Quick Links
            </motion.h3>
            <ul className="space-y-3">
              {["Products", "Categories", "About Us", "Contact"].map((item, index) => (
                <motion.li 
                  key={item}
                  animate={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                  >
                    <span className="mr-2">→</span> {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <motion.h3 
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Customer Service
            </motion.h3>
            <ul className="space-y-3">
              {["FAQ", "Shipping", "Returns", "Privacy Policy"].map((item, index) => (
                <motion.li 
                  key={item}
                  animate={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center"
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                  >
                    <span className="mr-2">→</span> {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <motion.h3 
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Newsletter
            </motion.h3>
            <p className="text-gray-300 mb-4">
              Stay in the loop with our latest collections and exclusive offers.
            </p>
            {isSubscribed ? (
              <motion.p 
                animate={{ opacity: 1 }}
                className="text-green-400"
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                Thank you for subscribing!
              </motion.p>
            ) : (
              <form className="flex" onSubmit={handleSubmit}>
                <Input
                  required
                  className="mr-2"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button isIconOnly aria-label="Subscribe" color="primary" type="submit">
                  <FaPaperPlane size={18} />
                </Button>
              </form>
            )}
          </div>
        </div>
        <motion.div 
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} PremiumHaaT. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-6 md:mt-0">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                  href="#"
                >
                  <Icon size={22} />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react'
import { Link } from "@nextui-org/react"
import { FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

const SubNav = () => {
  return (
    <div className="w-full hidden md:block bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full md:w-2/5 py-2 px-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-gray-600 dark:text-gray-300" />
              <Link className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100" href="mailto:contact@example.com">
                contact@example.com
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link aria-label="Facebook" href="https://facebook.com" rel="noopener noreferrer" target="_blank">
                <FaFacebook className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" />
              </Link>
              <Link aria-label="Twitter" href="https://twitter.com" rel="noopener noreferrer" target="_blank">
                <FaTwitter className="text-gray-600 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300" />
              </Link>
              <Link aria-label="Instagram" href="https://instagram.com" rel="noopener noreferrer" target="_blank">
                <FaInstagram className="text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubNav


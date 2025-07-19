"use client"

import type React from "react"
import { useState } from "react"
import { Input, Textarea, Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react"
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaTwitter } from "react-icons/fa"
import Link from "next/link"

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    // console.log("Form submitted:", formData)
    // Reset form after submission
    setFormData({ name: "", email: "", message: "" })
    alert("Thank you for your message! We will get back to you soon.") // Simple alert for demonstration
  }

  return (
    <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-xl mb-12 md:mb-16 lg:mb-20">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in-up">Get in Touch</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-fade-in-up delay-200">
          We&apos;d love to hear from you! Reach out to us for any inquiries, feedback, or support.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 md:mb-16 lg:mb-20">
        {/* Contact Form Card */}
        <Card className="p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-4">
            <h2 className="text-2xl font-semibold text-purple-700 dark:text-purple-300">Send Us a Message</h2>
          </CardHeader>
          <CardBody>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                required
                label="Name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                variant="bordered"
                color="primary"
                size="lg"
              />
              <Input
                required
                label="Email"
                name="email"
                placeholder="Enter your email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="bordered"
                color="primary"
                size="lg"
              />
              <Textarea
                required
                label="Message"
                name="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
                variant="bordered"
                color="primary"
                size="lg"
                minRows={5}
              />
              <Button color="primary" type="submit" size="lg" className="w-full shadow-lg hover:shadow-xl">
                Send Message
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* Contact Information & Location Cards */}
        <div className="space-y-8">
          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-4">
              <h2 className="text-2xl font-semibold text-purple-700 dark:text-purple-300">Contact Information</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                <div className="flex items-center">
                  <FaPhone className="text-purple-600 mr-3 text-xl" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-purple-600 mr-3 text-xl" />
                  <span>contact@example.com</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-purple-600 mr-3 text-xl" />
                  <span>123 E-commerce Blvd, Suite 400, Retail City, RC 98765</span>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-4">
              <h2 className="text-2xl font-semibold text-purple-700 dark:text-purple-300">Our Location</h2>
            </CardHeader>
            <CardBody>
              <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden shadow-inner">
                <iframe
                  allowFullScreen
                  className="border-0 w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57930.34533866941!2d89.3290377913663!3d24.841756993375142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc54e7e81df441%3A0x27133ed921fe73f4!2sBogra!5e0!3m2!1sen!2sbd!4v1736096501574!5m2!1sen!2sbd"
                  title="PremiumHaat Map"
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      <Divider className="my-8 md:my-12 bg-purple-200 dark:bg-purple-800" />

      {/* FAQ or Social Media Section (Optional, can be expanded) */}
      <section className="text-center py-12 bg-purple-100 rounded-lg shadow-md dark:bg-purple-950">
        <h2 className="text-3xl font-bold mb-4 text-purple-800 dark:text-purple-200">Connect With Us</h2>
        <p className="text-lg mb-6 text-purple-700 dark:text-purple-300">
          Follow us on social media for updates and special offers!
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            isIconOnly
            color="primary"
            aria-label="LinkedIn"
            size="lg"
            variant="shadow"
            as={Link}
            href="https://linkedin.com"
            target="_blank"
          >
            <FaLinkedin className="text-2xl" />
          </Button>
          <Button
            isIconOnly
            color="primary"
            aria-label="Twitter"
            size="lg"
            variant="shadow"
            as={Link}
            href="https://twitter.com"
            target="_blank"
          >
            <FaTwitter className="text-2xl" />
          </Button>
        </div>
      </section>
    </main>
  )
}

export default ContactUsPage

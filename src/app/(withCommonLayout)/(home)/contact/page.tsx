'use client'

import React, { useState } from 'react'
import { Input, Textarea, Button, Card, CardBody, CardHeader } from "@nextui-org/react"
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    // console.log('Form submitted:', formData)
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-600">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <CardHeader>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          </CardHeader>
          <CardBody>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                required
                label="Name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                required
                label="Email"
                name="email"
                placeholder="Enter your email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Textarea
                required
                label="Message"
                name="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
              />
              <Button color="primary" type="submit">
                Send Message
              </Button>
            </form>
          </CardBody>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <CardHeader>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaPhone className="text-purple-600 mr-2" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-purple-600 mr-2" />
                  <span>contact@example.com</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-purple-600 mr-2" />
                  <span>123 Tech Street, San Francisco, CA 94122</span>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="p-6">
            <CardHeader>
              <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
            </CardHeader>
            <CardBody>
              <div className="aspect-w-16 aspect-h-9">
              <iframe
        allowFullScreen
        className="border border-[gray]"
        height="200"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57930.34533866941!2d89.3290377913663!3d24.841756993375142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc54e7e81df441%3A0x27133ed921fe73f4!2sBogra!5e0!3m2!1sen!2sbd!4v1736096501574!5m2!1sen!2sbd"
        title="PremiumHaat Map"
        width="100%"
       />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ContactUsPage


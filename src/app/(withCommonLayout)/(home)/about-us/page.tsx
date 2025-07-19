"use client"

import { Card, CardBody, CardHeader, Avatar, Divider, Button } from "@nextui-org/react"
import { FaLinkedin, FaTwitter } from "react-icons/fa"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-xl mb-12 md:mb-16 lg:mb-20">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in-up">Your Journey, Our Passion</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-fade-in-up delay-200">
          Discover the story behind our commitment to quality, innovation, and customer satisfaction.
        </p>
        <Button as={Link} className="animate-fade-in-up delay-400" color="secondary" href="/products" size="lg">
          Explore Our Products
        </Button>
      </section>

      {/* Our Story Section */}
      <section className="mb-12 md:mb-16 lg:mb-20 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300">Our Story</h2>
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardBody>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Founded in 2023, our journey began with a passion for bringing high-quality, unique products directly to
                your doorstep. We noticed a gap in the market for a curated online shopping experience that prioritizes
                both exceptional products and outstanding customer service. From humble beginnings, we&apos;ve grown into a
                thriving e-commerce destination, committed to making your shopping experience delightful and effortless.
              </p>
            </CardBody>
          </Card>
        </div>
        <div className="flex justify-center">
          <Image
            alt="Our Story - E-commerce warehouse interior"
            className="rounded-lg object-cover shadow-xl border-4 border-purple-100 dark:border-purple-900"
            height={400}
            src="https://i.pravatar.cc/150?u=john-doe"
            width={600}
          />
        </div>
      </section>

      <Divider className="my-8 md:my-12 bg-purple-200 dark:bg-purple-800" />

      {/* Our Mission Section */}
      <section className="mb-12 md:mb-16 lg:mb-20">
        <h2 className="text-3xl font-bold mb-4 text-purple-700 dark:text-purple-300">Our Mission</h2>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <h3 className="text-2xl font-semibold text-purple-800 dark:text-purple-200">Delivering Quality and Joy</h3>
          </CardHeader>
          <CardBody>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Our mission is to empower individuals to discover and acquire products that enhance their lives, all
              within a seamless and trustworthy online environment. We are dedicated to sourcing the finest items,
              ensuring competitive pricing, and providing unparalleled customer support. We believe that every purchase
              should bring joy and satisfaction.
            </p>
          </CardBody>
        </Card>
      </section>

      <Divider className="my-8 md:my-12 bg-purple-200 dark:bg-purple-800" />

      {/* Our Team Section */}
      <section className="mb-12 md:mb-16 lg:mb-20">
        <h2 className="text-3xl font-bold mb-6 text-purple-700 dark:text-purple-300">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "John Doe", role: "Founder & CEO", avatarUrl: "https://i.pravatar.cc/150?u=john-doe" },
            { name: "Jane Smith", role: "Chief Product Officer", avatarUrl: "https://i.pravatar.cc/150?u=jane-smith" },
            { name: "Mike Johnson", role: "Head of Operations", avatarUrl: "https://i.pravatar.cc/150?u=mike-johnson" },
            { name: "Sarah Brown", role: "Marketing Lead", avatarUrl: "https://i.pravatar.cc/150?u=sarah-brown" },
            {
              name: "Tom Wilson",
              role: "Customer Success Manager",
              avatarUrl: "https://i.pravatar.cc/150?u=tom-wilson",
            },
            { name: "Emily Davis", role: "Lead Developer", avatarUrl: "https://i.pravatar.cc/150?u=emily-davis" },
          ].map((member) => (
            <Card key={member.name} className="p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardBody className="flex flex-col items-center text-center">
                <Avatar
                  alt={`Photo of ${member.name}`}
                  className="w-28 h-28 text-large mb-4 shadow-md"
                  name={member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")} // Generate initials for fallback
                  src={member.avatarUrl}
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{member.role}</p>
                <div className="flex mt-4 space-x-2">
                  <Button
                    isIconOnly
                    color="primary"
                    aria-label={`LinkedIn profile of ${member.name}`}
                    size="sm"
                    variant="light"
                  >
                    <FaLinkedin className="text-blue-600 text-xl" />
                  </Button>
                  <Button
                    isIconOnly
                    color="primary"
                    aria-label={`Twitter profile of ${member.name}`}
                    size="sm"
                    variant="light"
                  >
                    <FaTwitter className="text-blue-400 text-xl" />
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <Divider className="my-8 md:my-12 bg-purple-200 dark:bg-purple-800" />

      {/* Our Values Section */}
      <section className="mb-12 md:mb-16 lg:mb-20">
        <h2 className="text-3xl font-bold mb-4 text-purple-700 dark:text-purple-300">Our Values</h2>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardBody>
            <ul className="list-disc list-inside text-lg space-y-3 text-gray-700 dark:text-gray-300">
              <li>
                <span className="font-semibold text-gray-900 dark:text-gray-100">Customer Focus:</span> Your
                satisfaction is our top priority, guiding every decision we make.
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-gray-100">Quality Assurance:</span> We stand by
                the excellence of our products, ensuring durability and performance.
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-gray-100">Integrity & Transparency:</span>{" "}
                Building trust through honest practices and clear communication.
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-gray-100">Innovation:</span> Constantly seeking
                new ways to enhance your shopping experience and product offerings.
              </li>
              <li>
                <span className="font-semibold text-gray-900 dark:text-gray-100">Community:</span> Fostering connections
                with our customers and giving back to the communities we serve.
              </li>
            </ul>
          </CardBody>
        </Card>
      </section>

      {/* Final Call to Action Section */}
      <section className="text-center py-12 bg-purple-100 rounded-lg shadow-md dark:bg-purple-950">
        <h2 className="text-3xl font-bold mb-4 text-purple-800 dark:text-purple-200">Ready to explore?</h2>
        <p className="text-lg mb-6 text-purple-700 dark:text-purple-300">
          Discover our wide range of products designed with you in mind.
        </p>
        <Button as={Link} className="shadow-lg hover:shadow-xl" color="primary" href="/products" size="lg">
          Shop Now
        </Button>
      </section>
    </main>
  )
}

'use client'

import { Card, CardBody, CardHeader, Avatar, Divider, Button } from "@nextui-org/react";
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-600">About Us</h1>
      
      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-4">Our Story</h2>
        <Card className="mb-6">
          <CardBody>
            <p className="text-lg">
              Founded in 2023, our company has been at the forefront of innovation in the tech industry. 
              We started with a simple idea: to make technology accessible to everyone. 
              Today, we are proud to say that we have helped millions of people around the world connect, 
              create, and achieve their goals through our cutting-edge products and services.
            </p>
          </CardBody>
        </Card>
       
      </section>

      <Divider className="my-8" />

      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <Card>
          <CardHeader>
            <h3 className="text-2xl font-semibold">Empowering Through Technology</h3>
          </CardHeader>
          <CardBody>
            <p className="text-lg">
              Our mission is to empower individuals and businesses through innovative technology solutions. 
              We strive to create products that are not only powerful and efficient but also intuitive and 
              accessible to users of all skill levels.
            </p>
          </CardBody>
        </Card>
      </section>

      <Divider className="my-8" />

      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
          {[
            { name: "John Doe", role: "CEO", avatar: "JD" },
            { name: "Jane Smith", role: "CTO", avatar: "JS" },
            { name: "Mike Johnson", role: "Lead Developer", avatar: "MJ" },
            { name: "Sarah Brown", role: "UX Designer", avatar: "SB" },
            { name: "Tom Wilson", role: "Marketing Director", avatar: "TW" },
            { name: "Emily Davis", role: "Customer Support Lead", avatar: "ED" },
          ].map((member) => (
            <Card key={member.name} className="p-4">
              <CardBody className="flex flex-col items-center text-center">
                <Avatar
                  src={`https://i.pravatar.cc/150?u=${member.name}`}
                  className="w-24 h-24 text-large mb-4"
                  name={member.avatar}
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
                <div className="flex mt-4 space-x-2">
                  <Button isIconOnly color="primary" aria-label="LinkedIn" size="sm">
                    <FaLinkedin />
                  </Button>
                  <Button isIconOnly color="primary" aria-label="Twitter" size="sm">
                    <FaTwitter />
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <Divider className="my-8" />

      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Our Values</h2>
        <Card>
          <CardBody>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>Innovation: We constantly push the boundaries of what is possible.</li>
              <li>Integrity: We believe in transparency and ethical business practices.</li>
              <li>Collaboration: We work together to achieve greatness.</li>
              <li>Customer-Centric: Our users are at the heart of everything we do.</li>
              <li>Diversity: We celebrate and embrace our differences.</li>
            </ul>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}


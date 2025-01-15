"use client";
import React, { useState } from "react";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const questionsAndAnswers = [
    {
      question: "What is the warranty on this product?",
      answer:
        "This product comes with a 1-year warranty covering manufacturing defects.",
    },
    {
      question: "Can I return this product?",
      answer:
        "Yes, you can return the product within 30 days for a full refund, provided it is in unused condition.",
    },
    {
      question: "Does this product come with free shipping?",
      answer:
        "Yes, we offer free shipping on all orders for this product within the country.",
    },
  ];

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <h3 className="text-center text-4xl font-medium mt-5">FAQ</h3>
      <div className="space-y-4 mt-6 container h-[60vh]  mx-auto px-8 mt-1-">
        {questionsAndAnswers.map((item, index) => (
          <div key={index} className="border-b border-gray-300">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left py-4 text-lg font-semibold text-gray-800 focus:outline-none flex justify-between items-center"
            >
              {item.question}
              <span
                className={`ml-2 transform ${openIndex === index ? "rotate-180" : ""}`}
              >
                &#9660;
              </span>
            </button>
            {openIndex === index && (
              <div className="text-gray-600 pb-4">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;

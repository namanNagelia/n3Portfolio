import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-[#D9FDFE] font-thickPoppins mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-[#E63E60]"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-[#D9FDFE] font-thickPoppins mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-[#E63E60]"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="message"
          className="block text-[#D9FDFE] font-thickPoppins mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-[#E63E60]"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 font-thickPoppins text-white bg-gradient-to-b from-[#E63E60] to-[#A32972] rounded-lg hover:opacity-90 transition duration-300"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;

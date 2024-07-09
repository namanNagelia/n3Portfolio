/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Field, Label, Switch } from "@headlessui/react";

export default function Example() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="isolate px-6 py-10 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <form
        action="#"
        method="POST"
        className="lg:mx-32 lg:w-[50%] mx-auto w-full"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="full-name"
              className="block text-sm font-semibold leading-6 text-white/80"
            >
              Full name
            </label>
            <div className="mt-2.5">
              <input
                id="full-name"
                name="full-name"
                required
                type="text"
                autoComplete="given-name"
                className="block w-full bg-[#29233D] border-[#51496D] border-1 ring-0 focus:border-2 focus:border-[#51496D] focus:ring-0 focus:ring-offset-0 font-poppins rounded-md px-3.5 py-2 text-gray-100 shadow-sm placeholder:text-gray-900 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-white/80"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                required
                type="email"
                autoComplete="email"
                className="block w-full bg-[#29233D] border-[#51496D] border-1 ring-0 focus:border-2 focus:border-[#51496D] focus:ring-0 focus:ring-offset-0 font-poppins rounded-md px-3.5 py-2 text-gray-100 shadow-sm placeholder:text-gray-900 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-gray-100"
            >
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="block w-full bg-[#29233D] border-[#51496D] border-1 ring-0 focus:border-2 focus:border-[#51496D] focus:ring-0 focus:ring-offset-0 font-poppins rounded-md px-3.5 py-2 text-gray-100 shadow-sm placeholder:text-gray-900 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Let's talk
          </button>
        </div>
      </form>
    </div>
  );
}

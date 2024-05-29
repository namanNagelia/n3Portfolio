// pages/index.js
import Image from "next/image";
import React from "react";
import Background from "./components/Background";

export default function Home() {
  return (
    <div
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
    >
      <Background />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="relative z-10 flex flex-col items-center justify-center text-center mt-16">
          <h1 className="text-6xl font-georgia text-white">Naman Nagelia</h1>
          <h2 className="text-3xl font-georgia text-white mt-4">
            Software and AI Developer
          </h2>
        </div>
      </main>
    </div>
  );
}

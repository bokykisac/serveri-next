"use client";

import { HardHat } from "lucide-react";

export default function UnderConstruction() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
      <HardHat className="mb-4 h-16 w-16 text-yellow-500" />
      <h1 className="text-3xl font-bold text-gray-800">
        Page Under Construction
      </h1>
      <p className="mt-2 text-gray-600">
        We&apos;re working hard to bring this page to you. Stay tuned!
      </p>
      <button
        className="mt-6 rounded bg-yellow-500 px-4 py-2 font-semibold text-white hover:bg-yellow-600"
        onClick={() => window.history.back()}
      >
        Go Back
      </button>
    </div>
  );
}

"use client";

import Link from "next/link";
import React, { useState, ChangeEvent, FormEvent } from "react";

export default function Home() {
  return (
    <div className="mx-auto flex flex-col items-center py-32 ">
      <h1 className="text-center text-white font-semibold tracking-tighter text-4xl md:text-6xl">
        Welcome To
      </h1>
      <h1 className="text-center text-blue-400 font-semibold md:text-6xl tracking-tighter text-4xl">
        The Document Manager
      </h1>
      <p className="mt-4 text-gray-400 text-sm">
        Create, edit, and manage your documents with ease.
      </p>
      <Link
        href="/documents"
        className="relative mt-8 py-2 px-6 w-fit bg-slate-900 rounded-xl "
      >
        <span className="text-gray-300 text-sm ">View All Documents</span>
      </Link>
    </div>
  );
}

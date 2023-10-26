"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

export interface FormData {
  author: string;
  title: string;
  content: string;
}

export default function NewDocumentPage() {
  const [formData, setFormData] = useState<FormData>({
    author: "",
    title: "",
    content: "",
  });

  const router = useRouter();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setFormData({
        author: "",
        title: "",
        content: "",
      });
    } else {
      console.log("Error adding the document");
    }
  };

  return (
    <div>
      <h1>Add a document</h1>
      <div>
        <label
          htmlFor="email"
          className="block text-xs mb-1 mt-6 uppercase font-semibold leading-6 text-gray-900"
        >
          Title
        </label>
        <div className="mt-2">
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <label
          htmlFor="author"
          className="block text-xs mb-1 mt-6 uppercase font-semibold leading-6 text-gray-900"
        >
          Author
        </label>
        <div className="mt-2">
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            required
          />
        </div>

        <label
          htmlFor="content"
          className="block text-xs mb-1 mt-6 uppercase font-semibold leading-6 text-gray-900"
        >
          Content:
        </label>
        <textarea
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          id="content"
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          required
        />
        <button type="submit" onClick={handleSubmit}>
          Skicka
        </button>
      </div>
    </div>
  );
}

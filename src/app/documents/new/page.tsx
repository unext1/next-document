"use client";

import React, { useState, ChangeEvent, FormEvent, useMemo } from "react";
import dynamic from "next/dynamic";

export interface FormData {
  author: string;
  title: string;
}

export default function NewDocumentPage() {
  const [content, setContent] = useState("");
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const [formData, setFormData] = useState<FormData>({
    author: "",
    title: "",
  });

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
      });
      setContent("");
    } else {
      console.log("Error adding the document");
    }
  };

  return (
    <div>
      <h1 className="uppercase font-semibold tracking-wider">
        Create Document
      </h1>
      <div>
        <label
          htmlFor="email"
          className="block text-xs mb-1 mt-6 uppercase font-semibold leading-6 text-gray-400"
        >
          Title
        </label>
        <div className="mt-2">
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none px-4 focus:ring-blue-400 sm:text-sm sm:leading-6"
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
          className="block text-xs mb-1 mt-6 uppercase font-semibold leading-6 text-gray-400"
        >
          Author
        </label>
        <div className="mt-2">
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-none px-4 focus:ring-blue-400 sm:text-sm sm:leading-6"
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
          className="block text-xs mb-1 mt-6 uppercase font-semibold leading-6 text-gray-400"
        >
          Content:
        </label>
        <div>
          <ReactQuill
            theme="snow"
            modules={{
              toolbar: [
                ["bold", "italic", "underline", "strike"],
                ["blockquote", "code-block"],

                [{ header: 1 }, { header: 2 }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ script: "sub" }, { script: "super" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ direction: "rtl" }],

                [{ size: ["small", false, "large", "huge"] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],

                [{ font: [] }],
                [{ align: [] }],

                ["clean"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "link",
              "align",
              "blockquote",
              "list",
              "bullet",
              "script",
            ]}
            value={content}
            onChange={setContent}
          />
        </div>
        <button
          type="submit"
          className="relative mt-8 py-2 px-6 w-fit bg-slate-900 rounded-xl "
          onClick={handleSubmit}
        >
          Add New Document
        </button>
      </div>
    </div>
  );
}

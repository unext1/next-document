"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AllDocs() {
  const [docs, setDocs] = useState<DocType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getAllDocuments = async () => {
      const res = await fetch("/api");
      const docs = await res.json();
      setDocs(docs);
      setIsLoading(false);
    };
    getAllDocuments();
  }, []);

  const handleDelete = async ({ id }: { id: number }) => {
    const response = await fetch(`/api/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setDocs((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
    }
  };

  if (isLoading) {
    return <div>Loading Data...</div>;
  }

  return (
    <>
      <h2 className="uppercase font-semibold tracking-wider">
        {docs.length >= 1 ? "All Documents" : "No documents Found"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {docs
          ? docs.map((i) => (
              <div
                key={i.id}
                className="hover:scale-105 transition-all bg-slate-900 p-6 rounded-xl"
              >
                <div className="flex justify-between">
                  <Link
                    href={`/documents/${i.id}`}
                    className="text-xl font-bold capitalize"
                  >
                    {i.title}
                  </Link>
                  <div
                    className="bg-red-500  cursor-pointer rounded-xl px-2 py-1 text-xs my-auto"
                    onClick={() => handleDelete({ id: i.id })}
                  >
                    X
                  </div>
                </div>
                <Link
                  href={`/documents/${i.id}`}
                  className="text-sm text-gray-400 capitalize"
                >
                  {i.author}
                </Link>
                <div
                  className="text-sm mt-3 text-gray-400 truncate-custom"
                  dangerouslySetInnerHTML={{ __html: i.content }}
                />
              </div>
            ))
          : null}
      </div>
    </>
  );
}

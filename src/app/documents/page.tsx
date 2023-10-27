"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AllDocs() {
  const [docs, setDocs] = useState<DocType[]>([]);

  const router = useRouter();

  useEffect(() => {
    const getAllDocuments = async () => {
      const res = await fetch("/api");
      const docs = await res.json();
      setDocs(docs);
    };
    getAllDocuments();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {docs.map((i) => (
        <Link
          key={i.id}
          href={`/documents/${i.id}`}
          prefetch={false}
          className="hover:scale-105 transition-all bg-slate-900 p-6 rounded-xl"
          onClick={() => router.refresh()}
        >
          <div className="flex justify-between">
            <div className="text-xl font-bold capitalize">{i.title}</div>
            <div className="bg-red-500 rounded-xl px-1 text-xs my-auto">X</div>
          </div>
          <div className="text-sm text-gray-400 capitalize">{i.author}</div>
          <div className="text-sm mt-3 text-gray-400">{i.content}</div>
        </Link>
      ))}
    </div>
  );
}

"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DocumentPage = () => {
  const params = useParams();
  const documentId = params.id;

  const [singleDoc, setSingleDoc] = useState<DocType | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSingleDoc = async () => {
      try {
        const result = await fetch(`/api/${documentId}`);
        const document = await result.json();
        setSingleDoc(document);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getSingleDoc();
  }, [documentId]);

  if (isLoading) {
    return <p>Loading Data...</p>;
  }

  return (
    <div>
      {singleDoc && (
        <div>
          <h1>Document {documentId} Page</h1>
          <p>Title: {singleDoc.title}</p>
          <p>Author: {singleDoc.author}</p>
          <p>Content: {singleDoc.content}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentPage;

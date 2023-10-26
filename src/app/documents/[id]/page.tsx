"use client";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

const DocumentPage = () => {
  const params = useParams();
  const documentId = params.id;
  return (
    <div>
      <h1>Document {documentId} Page</h1>
    </div>
  );
};

export default DocumentPage;

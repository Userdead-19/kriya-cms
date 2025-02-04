"use client";

import PaperItem from "@/app/components/paperItem";
import { useParams } from "next/navigation";
import { PaperSearch } from "@/app/components/paperSearch";

export default function EventPage() {
  const params = useParams();
  console.log(params);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Event Management System</h1>
      <PaperSearch />
      <PaperItem paperid={params.id} />
    </main>
  );
}

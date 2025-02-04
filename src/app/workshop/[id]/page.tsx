"use client";

import { WorkshopItem } from "../../components/WorkshopItem";
import { WorkshopSearch } from "../../components/WorkshopSearch";
import { useParams } from "next/navigation";

export default function WorkshopPage() {
  const params = useParams();
  console.log(params);
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Workshop Management System</h1>
      <WorkshopSearch />
      <WorkshopItem workshopId={params.id} />
    </main>
  );
}

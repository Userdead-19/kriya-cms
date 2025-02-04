"use client";

import { EventItem } from "../../components/eventItem";
import { EventSearch } from "../../components/eventSearch";
import { useParams } from "next/navigation";

export default function EventPage() {
  const params = useParams();
  console.log(params);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Event Management System</h1>
      <EventSearch />
      <EventItem eventId={params.id} />
    </main>
  );
}

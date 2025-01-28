import { EventItem } from "../../components/eventItem";
import { EventSearch } from "../../components/eventSearch";

export default function EventPage({ params }: { params: { id: string } }) {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Event Management System</h1>
      <EventSearch />
      <EventItem eventId={params.id} />
    </main>
  );
}

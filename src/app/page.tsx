import { EventSearch } from "./components/eventSearch";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Event Management System</h1>
      <p className="mb-4">Enter an event ID to view and edit event details.</p>
      <EventSearch />
    </main>
  );
}

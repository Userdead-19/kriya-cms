"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function EventSearch() {
  const [eventId, setEventId] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/event/${eventId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Input
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        placeholder="Enter Event ID"
        className="w-full"
      />
      <Button type="submit">Search</Button>
    </form>
  );
}

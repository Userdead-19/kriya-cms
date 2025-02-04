"use client";

import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";

// Define the Event type
interface Event {
  _id?: string;
  ppid: string;
  image: string;
  eventName: string;
  contact1: [string, number];
  contact2: [string, number];
  eventMail: string[];
  theme: string;
  topic: string;
  rules: string;
  date: string;
  time: string;
  deadline: string;
  teamSize: string;
  hall: string;
  closed: boolean;
}

export default function PaperItem({ paperid }: { paperid: any }) {
  const [events, setEvents] = useState<Event | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://kriyabackend.psgtech.ac.in/api/cms/presentation-events/${paperid}`
      );
      setEvents(response.data);
      setError(null);
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (err: any) => {
    if (err.response) {
      console.error("Server Error:", err.response.data);
      setError(err.response.data.message || "Failed to fetch events");
    } else if (err.request) {
      console.error("No Response:", err.request);
      setError("No response from server");
    } else {
      console.error("Error:", err.message);
      setError(`Unexpected error: ${err.message}`);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEvents((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleUpdateEvent = async () => {
    try {
      const response = await axios.put(
        `https://kriyabackend.psgtech.ac.in/api/cms/presentation-events/${paperid}`,
        events
      );

      // Update the events list

      setEditing(false);
    } catch (err: any) {
      handleError(err);
    }
  };

  const renderEventDetails = (event: Event) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <strong>Event Name:</strong> {event.eventName}
        </div>
        <div>
          <strong>PPID:</strong> {event.ppid}
        </div>
        <div>
          <strong>Team Size:</strong> {event.teamSize}
        </div>
        <div>
          <strong>Hall:</strong> {event.hall}
        </div>
        <div>
          <strong>Date:</strong> {event.date}
        </div>
        <div>
          <strong>Time:</strong> {event.time}
        </div>
      </div>
      <div>
        <strong>Theme:</strong>
        <p>{event.theme}</p>
      </div>
      <div>
        <strong>Topic:</strong>
        <p>{event.topic}</p>
      </div>
      <div>
        <strong>Rules:</strong>
        <p>{event.rules}</p>
      </div>
      <div>
        <strong>Contacts:</strong>
        <p>
          1. {event.contact1[0]} - {event.contact1[1]}
        </p>
        <p>
          2. {event.contact2[0]} - {event.contact2[1]}
        </p>
      </div>
    </div>
  );

  const renderEventEdit = (event: Event) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Event Name</Label>
          <Input
            name="eventName"
            value={event.eventName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label>PPID</Label>
          <Input
            name="ppid"
            value={event.ppid}
            onChange={handleInputChange}
            readOnly
          />
        </div>
        <div>
          <Label>Team Size</Label>
          <Input
            name="teamSize"
            value={event.teamSize}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label>Hall</Label>
          <Input name="hall" value={event.hall} onChange={handleInputChange} />
        </div>
        <div>
          <Label>Date</Label>
          <Input name="date" value={event.date} onChange={handleInputChange} />
        </div>
        <div>
          <Label>Time</Label>
          <Input name="time" value={event.time} onChange={handleInputChange} />
        </div>
      </div>
      <div>
        <Label>Theme</Label>
        <Textarea
          name="theme"
          value={event.theme}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label>Topic</Label>
        <Textarea
          name="topic"
          value={event.topic}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label>Rules</Label>
        <Textarea
          name="rules"
          value={event.rules}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Contact 1 Name</Label>
          <Input
            name="contact1.0"
            value={event.contact1[0]}
            onChange={(e) => {
              const newContact = [...event.contact1];
              newContact[0] = e.target.value;
              setEvents((prev) =>
                prev
                  ? { ...prev, contact1: newContact as [string, number] }
                  : null
              );
            }}
          />
          <Label>Contact 1 Number</Label>
          <Input
            type="number"
            name="contact1.1"
            value={event.contact1[1]}
            onChange={(e) => {
              const newContact = [...event.contact1];
              newContact[1] = Number(e.target.value);
              setEvents((prev) =>
                prev
                  ? { ...prev, contact1: newContact as [string, number] }
                  : null
              );
            }}
          />
        </div>
        <div>
          <Label>Contact 2 Name</Label>
          <Input
            name="contact2.0"
            value={event.contact2[0]}
            onChange={(e) => {
              const newContact = [...event.contact2];
              newContact[0] = e.target.value;
              setEvents((prev) =>
                prev
                  ? { ...prev, contact2: newContact as [string, number] }
                  : null
              );
            }}
          />
          <Label>Contact 2 Number</Label>
          <Input
            type="number"
            name="contact2.1"
            value={event.contact2[1]}
            onChange={(e) => {
              const newContact = [...event.contact2];
              newContact[1] = Number(e.target.value);
              setEvents((prev) =>
                prev
                  ? { ...prev, contact2: newContact as [string, number] }
                  : null
              );
            }}
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="closed"
          checked={event.closed}
          onCheckedChange={(checked) =>
            setEvents((prev) => (prev ? { ...prev, closed: !!checked } : null))
          }
        />
        <Label htmlFor="closed">Event Closed</Label>
      </div>
    </div>
  );

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="details">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">Event Details</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>{events?.eventName}</CardTitle>
            </CardHeader>
            <CardContent>
              {editing ? (
                <>
                  {renderEventEdit(events as Event)}
                  <div className="flex space-x-2 mt-4">
                    <Button onClick={handleUpdateEvent}>Save</Button>
                    <Button variant="outline" onClick={() => setEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {renderEventDetails(events as Event)}
                  <Button className="mt-4" onClick={() => setEditing(true)}>
                    Edit Event
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

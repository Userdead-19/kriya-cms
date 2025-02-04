"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Event } from "../types/events";
import axios from "axios";

export function EventItem({ eventId }: { eventId: any }) {
  const [event, setEvent] = useState<Event | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      setLoading(true); // Start loading state
      const response = await axios.get(
        `https://kriyabackend.psgtech.ac.in/api/cms/events/${eventId}`
      );

      const data = response.data;
      if (!data) {
        throw new Error("No data received from the server.");
      }

      setEvent(data); // Set the event data
      setError(null); // Clear any previous error
    } catch (err: any) {
      if (err.response) {
        // Server responded with an error status
        console.error("Server Error:", err.response.data);
        setError(
          err.response.data.message ||
            "Failed to fetch the event. Please try again."
        );
      } else if (err.request) {
        // No response received
        console.error("No Response:", err.request);
        setError("No response from the server. Please check your network.");
      } else {
        // Unexpected errors (e.g., invalid code or network issues)
        console.error("Error:", err.message);
        setError(`An unexpected error occurred: ${err.message}`);
      }
      setEvent(null); // Clear any previously set event data
    } finally {
      setLoading(false); // End loading state
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEvent((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleCheckboxChange = (checked: boolean) => {
    console.log(checked);
    setEvent((prev) => (prev ? { ...prev, closed: checked } : null));
  };

  const handleUpdate = async () => {
    if (!event) {
      setError("No event data to update");
      return;
    }

    try {
      const response = await axios.put(
        `https://kriyabackend.psgtech.ac.in/api/cms/events/${eventId}`,
        event
      );

      const updatedEvent = response.data;
      setEvent(updatedEvent); // Update the state with the updated event
      setEditing(false); // Exit editing mode
      setError(null); // Clear any previous errors
    } catch (err: any) {
      if (err.response) {
        // Server responded with a status other than 2xx
        console.error("Server Error:", err.response.data);
        setError(
          err.response.data.message ||
            "An error occurred while updating the event"
        );
      } else if (err.request) {
        // Request was made but no response received
        console.error("No Response:", err.request);
        setError(
          "No response received from the server. Please try again later."
        );
      } else {
        // Other errors (e.g., network issues or invalid code)
        console.error("Error:", err.message);
        setError(`An unexpected error occurred: ${err.message}`);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!event) return <div>No event found</div>;

  const renderField = (
    name: string,
    label: string,
    component: React.ReactNode
  ) => (
    <div className="mb-4">
      <Label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </Label>
      {component}
    </div>
  );

  if (editing) {
    return (
      <div className="border p-4 mb-4 rounded-md space-y-4">
        {renderField(
          "eventId",
          "Event ID",
          <Input
            id="eventId"
            name="eventId"
            value={event.eventId}
            onChange={handleInputChange}
            readOnly
          />
        )}
        {renderField(
          "eventName",
          "Event Name",
          <Input
            id="eventName"
            name="eventName"
            value={event.eventName}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "category",
          "Category",
          <Input
            id="category"
            name="category"
            value={event.category}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "one_line_desc",
          "One Line Description",
          <Input
            id="one_line_desc"
            name="one_line_desc"
            value={event.one_line_desc}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "description",
          "Description",
          <Textarea
            id="description"
            name="description"
            value={event.description}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "round_title_1",
          "Round 1 Title",
          <Input
            id="round_title_1"
            name="round_title_1"
            value={event.round_title_1}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "round_desc_1",
          "Round 1 Description",
          <Textarea
            id="round_desc_1"
            name="round_desc_1"
            value={event.round_desc_1}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "round_title_2",
          "Round 2 Title",
          <Input
            id="round_title_2"
            name="round_title_2"
            value={event.round_title_2}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "round_desc_2",
          "Round 2 Description",
          <Textarea
            id="round_desc_2"
            name="round_desc_2"
            value={event.round_desc_2}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "contact_name_1",
          "Contact Name 1",
          <Input
            id="contact_name_1"
            name="contact_name_1"
            value={event.contact_name_1}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "roll_1",
          "Roll 1",
          <Input
            id="roll_1"
            name="roll_1"
            value={event.roll_1}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "contact_mobile_1",
          "Contact Mobile 1",
          <Input
            id="contact_mobile_1"
            name="contact_mobile_1"
            type="number"
            value={event.contact_mobile_1.toString()}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "contact_name_2",
          "Contact Name 2",
          <Input
            id="contact_name_2"
            name="contact_name_2"
            value={event.contact_name_2}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "roll_2",
          "Roll 2",
          <Input
            id="roll_2"
            name="roll_2"
            value={event.roll_2}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "contact_mobile_2",
          "Contact Mobile 2",
          <Input
            id="contact_mobile_2"
            name="contact_mobile_2"
            type="number"
            value={event.contact_mobile_2.toString()}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "hall",
          "Hall",
          <Input
            id="hall"
            name="hall"
            value={event.hall}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "eventRules",
          "Event Rules",
          <Textarea
            id="eventRules"
            name="eventRules"
            value={event.eventRules}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "teamSize",
          "Team Size",
          <Input
            id="teamSize"
            name="teamSize"
            type="number"
            value={event.teamSize.toString()}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "date",
          "Date",
          <Input
            id="date"
            name="date"
            value={event.date}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "timing",
          "Timing",
          <Input
            id="timing"
            name="timing"
            value={event.timing}
            onChange={handleInputChange}
          />
        )}
        {renderField(
          "closed",
          "Closed",
          <div className="flex items-center space-x-2">
            <Checkbox
              id="closed"
              checked={event.closed}
              onCheckedChange={handleCheckboxChange}
            />
            <label htmlFor="closed">Event is closed</label>
          </div>
        )}
        {renderField(
          "image",
          "Image URL",
          <Input
            id="image"
            name="image"
            value={event.image}
            onChange={handleInputChange}
          />
        )}
        <div className="flex space-x-2">
          <Button onClick={handleUpdate}>Update</Button>
          <Button variant="outline" onClick={() => setEditing(false)}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border p-4 mb-4 rounded-md space-y-4">
      <img
        src={event.image || "/placeholder.svg"}
        alt={event.eventName}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-2xl font-bold">{event.eventName}</h2>
      <div>
        <strong>Event ID:</strong> {event.eventId}
      </div>
      <div>
        <strong>Category:</strong> {event.category}
      </div>
      <div>
        <strong>One Line Description:</strong> {event.one_line_desc}
      </div>
      <div>
        <strong>Description:</strong> {event.description}
      </div>
      <div>
        <h3 className="text-xl font-semibold">{event.round_title_1}</h3>
        <p>{event.round_desc_1}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold">{event.round_title_2}</h3>
        <p>{event.round_desc_2}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <p>
          <strong>Contact 1:</strong> {event.contact_name_1} ({event.roll_1}) -{" "}
          {event.contact_mobile_1}
        </p>
        <p>
          <strong>Contact 2:</strong> {event.contact_name_2} ({event.roll_2}) -{" "}
          {event.contact_mobile_2}
        </p>
      </div>
      <div>
        <strong>Hall:</strong> {event.hall}
      </div>
      <div>
        <h3 className="text-lg font-semibold">Event Rules</h3>
        <p style={{ whiteSpace: "pre-line" }}>{event.eventRules}</p>
      </div>
      <div>
        <strong>Team Size:</strong> {event.teamSize}
      </div>
      <div>
        <strong>Date:</strong> {event.date}
      </div>
      <div>
        <strong>Timing:</strong> {event.timing}
      </div>
      <div>
        <strong>Status:</strong> {event.closed ? "Closed" : "Open"}
      </div>
      <Button onClick={() => setEditing(true)}>Edit</Button>
    </div>
  );
}

"use server"

import fs from "fs/promises"
import path from "path"
import type { Event } from "../types/events"

const dbPath = path.join(process.cwd(), "src/app/db/events.json")

export async function getEvents(): Promise<Event[]> {
    const data = await fs.readFile(dbPath, "utf8")
    return JSON.parse(data)
}

export async function getEventById(id: string): Promise<Event | null> {
    const events = await getEvents()
    return events.find((event: Event) => event.eventId === id) || null
}

export async function updateEvent(eventData: Event): Promise<{ success: boolean; message: string }> {
    const events = await getEvents()
    const index = events.findIndex((e: Event) => e.eventId === eventData.eventId)

    if (index !== -1) {
        events[index] = { ...events[index], ...eventData }
        await fs.writeFile(dbPath, JSON.stringify(events, null, 2))
        return { success: true, message: "Event updated successfully" }
    }

    return { success: false, message: "Event not found" }
}


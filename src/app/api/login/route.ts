import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(request: Request) {
    const { username, password } = await request.json()

    // Simulate a network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Read the JSON file
    console.log(process.cwd())
    const filePath = path.join(process.cwd(), "src", "app", "api", "users.json")
    const fileContents = fs.readFileSync(filePath, "utf8")
    const users = JSON.parse(fileContents)

    // Check if the user exists and the password is correct
    const user = users.find(
        (u: { username: string; password: string }) => u.username === username && u.password === password,
    )

    if (user) {
        return NextResponse.json({ message: "Login successful" }, { status: 200 })
    } else {
        return NextResponse.json({ message: "Invalid username or password" }, { status: 401 })
    }
}


import { NextResponse } from "next/server";
import client from "@/connDb/pgsql";

export async function POST(request: Request) {
  try {
    console.log("API endpoint hit");
    const { email, password } = await request.json();

    const result = await client.query(
      "SELECT * FROM Entity_Information WHERE email = $1 AND password = $2",
      [email, password]
    );
    console.log(result.rows);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    const user = result.rows[0];
    if (user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error inserting data into PostgreSQL:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

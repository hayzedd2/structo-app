import { apiUrl } from "@/config";
import { structSchema } from "@/schema";
import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const validatedData = structSchema.safeParse(reqBody);
    if (!validatedData.success) {
      const errors = validatedData.error.errors
        .map((err) => err.message)
        .join(", ");
      return Response.json({ message: errors }, { status: 500 });
    }
    const response = await axios.post(
      `${apiUrl}/generate-mock`,
      validatedData.data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
        validateStatus: (status) => status < 500,
      }
    );
    return Response.json(response.data);
  } catch (error: any) {
    if (error.code === "ECONNABORTED") {
      return Response.json(
        { message: "Request timed out, please try again" },
        { status: 408 }
      );
    }
    return Response.json(
      { message: error.response?.data?.error || "Something went wrong" },
      { status: error.response?.status || 500 }
    );
  }
}

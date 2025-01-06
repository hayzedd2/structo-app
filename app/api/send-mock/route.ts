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
      }
    );
    return Response.json(response.data);
  } catch (error: any) {
    if (error.code == "ERR_BAD_RESPONSE") {
      return Response.json(
        {
          message: "Server is being warmed up, please try again.",
        },
        {
          status: 400,
        }
      );
    }
    return Response.json(
      { message: error.response?.data?.error || "Something went wrong" },
      { status: error.response?.status || 500 }
    );
  }
}

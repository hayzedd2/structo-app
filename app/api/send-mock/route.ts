import { apiUrl } from "@/config";
import { structSchema } from "@/schema";
import axios from "axios";
import { NextRequest } from "next/server";

interface Person{
  name:string
  age:number
  dob: Date
  address:string
  country:string
}
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const validatedData = structSchema.safeParse(reqBody);
    if (!validatedData.success) {
      const errors = validatedData.error.errors
        .map((err) => err.message)
        .join(", ");
      console.log(validatedData);
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
    return Response.json(
      { message: error.response?.data?.error || "Something went wrong" },
      { status: error.response?.status || 500 }
    );
  }
}

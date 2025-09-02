import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

interface APIError {
  message: string;
}

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forgot-password`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    const err = error as AxiosError<APIError>;
    const message = err.response?.data?.message || "Failed to fetch data";

    return NextResponse.json(
      { message },
      { status: err.response?.status || 500 },
    );
  }
};

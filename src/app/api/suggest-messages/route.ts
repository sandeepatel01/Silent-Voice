import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: openai("gpt-4-turbo"),
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, message, headers } = error;
      return NextResponse.json(
        {
          name,
          status,
          message,
          headers,
        },
        { status }
      );
    } else {
      console.log("An Unexpected Error Occured", error);
      throw error;
    }
  }
}

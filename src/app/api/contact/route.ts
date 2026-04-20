import { SendContactMessage } from "@/application/usecases/SendContactMessage";
import {
  isContactMessage,
  type ContactResult,
} from "@/domain/entities/ContactMessage";
import { createContactMessageGateway } from "@/infrastructure/factories/createContactMessageGateway";
import { NextResponse } from "next/server";

function getStatusCode(result: ContactResult): number {
  if (result.success) {
    return 200;
  }

  switch (result.code) {
    case "validation_error":
      return 400;
    case "delivery_unavailable":
      return 503;
    default:
      return 502;
  }
}

export async function POST(request: Request) {
  const payload: unknown = await request.json().catch(() => null);

  if (!isContactMessage(payload)) {
    return NextResponse.json<ContactResult>(
      {
        success: false,
        code: "validation_error",
        error: "Os dados enviados são inválidos.",
      },
      { status: 400 },
    );
  }

  const sendContactMessage = new SendContactMessage(createContactMessageGateway());
  const result = await sendContactMessage.execute(payload);

  return NextResponse.json<ContactResult>(result, {
    status: getStatusCode(result),
  });
}

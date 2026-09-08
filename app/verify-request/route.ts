import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return redirect("/login");
  }

  const verificationRequest = await prisma.verificationRequest.findFirst({
    where: { token },
  });

  if (!verificationRequest) {
    return redirect("/login");
  }

  // Redirect to the client's dashboard where they can process the request
  return redirect(`/client/verification-requests/${verificationRequest.id}`);
}

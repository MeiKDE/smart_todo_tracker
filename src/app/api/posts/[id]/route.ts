import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/utils/api-helpers";
import { handlePrismaError } from "@/utils/error-handler";

// UPDATE
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("Test PUT");
    const session = await getServerSession(authOptions);
    if (!session) {
      return errorResponse("Unauthorized");
    }

    const { title, content } = await req.json();
    const post = await prisma.post.update({
      where: { id: params.id },
      data: { title, content },
    });

    return successResponse(post);
  } catch (error) {
    return errorResponse(handlePrismaError(error));
  }
}

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log("Test DELETE");
    const session = await getServerSession(authOptions);
    if (!session) {
      return errorResponse("Unauthorized");
    }

    await prisma.post.delete({
      where: { id: params.id },
    });

    return successResponse({ message: "Post deleted successfully" });
  } catch (error) {
    return errorResponse(handlePrismaError(error));
  }
}

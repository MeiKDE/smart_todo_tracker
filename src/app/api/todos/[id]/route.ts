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
    const session = await getServerSession(authOptions);
    if (!session) {
      return errorResponse("Unauthorized");
    }

    const { text, completed } = await req.json();
    const todo = await prisma.todo.update({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      data: {
        ...(text !== undefined && { text }),
        ...(completed !== undefined && { completed }),
      },
    });

    return successResponse(todo);
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
    const session = await getServerSession(authOptions);
    if (!session) {
      return errorResponse("Unauthorized");
    }

    await prisma.todo.delete({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    return successResponse({ message: "Todo deleted successfully" });
  } catch (error) {
    return errorResponse(handlePrismaError(error));
  }
}

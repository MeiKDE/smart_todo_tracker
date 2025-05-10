import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/utils/api-helpers";
import { handlePrismaError } from "@/utils/error-handler";

// CREATE
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return errorResponse("Unauthorized");
    }

    const { text } = await req.json();
    if (!text) {
      return errorResponse("Text is required");
    }

    const todo = await prisma.todo.create({
      data: {
        text,
        userId: session.user.id,
      },
    });

    return successResponse(todo);
  } catch (error) {
    return errorResponse(handlePrismaError(error));
  }
}

// READ (Get all todos for current user)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return errorResponse("Unauthorized");
    }

    const todos = await prisma.todo.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        id: "asc",
      },
    });

    return successResponse(todos);
  } catch (error) {
    return errorResponse(handlePrismaError(error));
  }
}

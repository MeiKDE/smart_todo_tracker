import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/utils/api-helpers";
import { handlePrismaError } from "@/utils/error-handler";

// CREATE
export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (!text) {
      return errorResponse("Text is required");
    }

    const todo = await prisma.todo.create({
      data: {
        text,
        completed: false,
        selected: false,
      },
    });

    return successResponse(todo);
  } catch (error) {
    return errorResponse(handlePrismaError(error));
  }
}

// GET
export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return successResponse(todos);
  } catch (error) {
    return errorResponse(handlePrismaError(error));
  }
}

// UPDATE
export async function PUT(req: Request) {
  try {
    const { id, text, completed, selected } = await req.json();

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        text,
        completed,
        selected,
      },
    });

    return successResponse(updatedTodo);
  } catch (error) {
    return errorResponse(handlePrismaError(error));
  }
}

// DELETE
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.todo.delete({
      where: { id },
    });

    return successResponse({ message: "Todo deleted successfully" });
  } catch (error) {
    return errorResponse(handlePrismaError(error));
  }
}

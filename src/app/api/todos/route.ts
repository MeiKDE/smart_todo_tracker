import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-helpers";
import { handlePrismaError } from "@/lib/error-handler";

// CREATE
export async function POST(req: Request) {
  console.log("CREATE- POST");
  try {
    const { text } = await req.json();
    if (!text) {
      return errorResponse("Text is required");
    }

    const todo = await prisma.todo.create({
      data: { text },
    });

    return successResponse(todo);
  } catch (error) {
    return errorResponse(handlePrismaError(error));
  }
}

// GET
export async function GET() {
  console.log("GET");
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return successResponse(todos);
  } catch (error) {
    return errorResponse(handlePrismaError(error));
  }
}

// UPDATE
export async function PUT(req: Request) {
  console.log("UPDATE- PUT");
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
  console.log("DELETE");
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

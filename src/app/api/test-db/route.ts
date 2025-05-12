import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-helpers";

export async function GET() {
  try {
    // Try a simple query
    const count = await prisma.todo.count();
    return successResponse({
      message: "Database connection successful",
      count,
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return errorResponse("Database connection failed");
  }
}

export async function POST() {
  try {
    const testTodo = await prisma.todo.create({
      data: {
        text: "Test todo item",
        userId: "test-user",
      },
    });

    return successResponse({
      message: "Test todo created successfully",
      todo: testTodo,
    });
  } catch (error: unknown) {
    console.error("Failed to create test todo:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return errorResponse(`Failed to create todo: ${errorMessage}`);
  }
}

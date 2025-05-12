import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/utils/api-helpers";
import { handlePrismaError } from "@/utils/error-handler";

// CREATE
export async function POST(req: Request) {
  console.log("test POST");
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return errorResponse("Unauthorized");
    }

    const { title, content } = await req.json();
    if (!title || !content) {
      return errorResponse("Title and content are required");
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: session.user.id,
      },
    });

    return successResponse(post);
  } catch (error) {
    return errorResponse(handlePrismaError(error));
  }
}

// READ (Get all posts)
export async function GET() {
  console.log("test GET");
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return successResponse(posts);
  } catch (error) {
    return errorResponse(handlePrismaError(error));
  }
}

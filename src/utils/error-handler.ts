import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const handlePrismaError = (error: any) => {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return "A record with this value already exists.";
      case "P2025":
        return "Record not found.";
      default:
        return "Database error occurred.";
    }
  }
  return "An unexpected error occurred.";
};

import { NextResponse } from "next/server";

export const successResponse = (data: any) => {
  return NextResponse.json({ success: true, data }, { status: 200 });
};

export const errorResponse = (message: string, status = 400) => {
  return NextResponse.json({ success: false, error: message }, { status });
};

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ msg: "No id provided" }, { status: 400 });
    }
    const parsedId = parseInt(id);
    const budget = await prisma.budgets.findUnique({
      where: { id: parsedId },
    });

    if (!budget) {
      return NextResponse.json({ msg: "No budget found" }, { status: 400 });
    }

    return NextResponse.json(budget, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

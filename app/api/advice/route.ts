import getFinancialAdvice from "@/lib/generateAdvice";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { totalBudget, totalIncome, totalSpent } = await req.json();
    const advice = await getFinancialAdvice(
      totalBudget,
      totalIncome,
      totalSpent
    );
    return NextResponse.json({ advice }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "Failed to get financial advice" },
      { status: 500 }
    );
  }
}

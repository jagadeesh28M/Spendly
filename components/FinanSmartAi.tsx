"use client";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface FinancialData {
  totalBudget: string | number;
  totalIncome: string | number;
  totalSpent: string | number;
}

function FinanSmartAi({ totalBudget, totalIncome, totalSpent }: FinancialData) {
  const [advice, setAdvice] = useState("Loading financial advice...");

  useEffect(() => {
    async function fetchAdvice() {
      try {
        const res = await fetch("/api/advice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ totalBudget, totalIncome, totalSpent }),
        });
        const data = await res.json();
        if (data.advice) {
          setAdvice(data.advice);
        } else {
          setAdvice(
            "Sorry, I couldn't fetch the financial advice at this moment. Please try again later."
          );
        }
      } catch {
        setAdvice(
          "Sorry, I couldn't fetch the financial advice at this moment. Please try again later."
        );
      }
    }

    fetchAdvice();
  }, [totalBudget, totalIncome, totalSpent]);

  return (
    <div className="h-auto w-full border border-white rounded-md p-5 my-10">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold flex gap-2 items-center">
            Spendly AI <Sparkles />
          </h1>
          {advice}
        </div>
      </div>
    </div>
  );
}

export default FinanSmartAi;

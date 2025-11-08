import { useMemo } from "react";
import type { Transaction } from "../../../types/api";

interface TransactionChartProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export default function TransactionChart({
  transactions,
  isLoading,
}: TransactionChartProps) {
  const chartData = useMemo(() => {
    if (!transactions.length) return [];

    const dailyTotals = transactions.reduce((acc, tx) => {
      const date = new Date(tx.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      
      if (!acc[date]) {
        acc[date] = { date, amount: 0, timestamp: new Date(tx.date).getTime() };
      }
      
      const amount = tx.type === "deposit" ? tx.amount : -tx.amount;
      acc[date].amount += amount;
      
      return acc;
    }, {} as Record<string, { date: string; amount: number; timestamp: number }>);

    return Object.values(dailyTotals).sort((a, b) => a.timestamp - b.timestamp);
  }, [transactions]);

  const { minAmount, range } = useMemo(() => {
    if (!chartData.length) {
      return { minAmount: 0, range: 0 };
    }
    
    const amounts = chartData.map((d) => d.amount);
    const max = Math.max(...amounts);
    const min = Math.min(...amounts, 0);
    
    return {
      minAmount: min,
      range: max - min,
    };
  }, [chartData]);

  const pathData = useMemo(() => {
    if (!chartData.length) return "";
    
    const getY = (amount: number) => {
      if (range === 0) return 50;
      return 100 - ((amount - minAmount) / range) * 100;
    };
    
    const points = chartData.map((d, i) => {
      const x = (i / (chartData.length - 1)) * 100;
      const y = getY(d.amount);
      return { x, y };
    });
    
    if (points.length < 2) return `M ${points[0].x},${points[0].y}`;
    
    let path = `M ${points[0].x},${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;
      const midY = (current.y + next.y) / 2;
      
      if (i === 0) {
        path += ` Q ${current.x},${current.y} ${midX},${midY}`;
      } else {
        path += ` T ${midX},${midY}`;
      }
    }
    
    const lastPoint = points[points.length - 1];
    path += ` T ${lastPoint.x},${lastPoint.y}`;
    
    return path;
  }, [chartData, range, minAmount]);

  const getYPosition = (amount: number) => {
    if (range === 0) return 50;
    return 100 - ((amount - minAmount) / range) * 100;
  };

  if (isLoading) {
    return (
      <div className="w-full h-[200px] bg-gray-100 animate-pulse rounded-lg"></div>
    );
  }

  if (!chartData.length) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center text-[#56616B]">
        No transaction data available
      </div>
    );
  }

  const firstDate = chartData[0]?.date || "";
  const lastDate = chartData[chartData.length - 1]?.date || "";

  return (
    <div className="w-full">
      <div className="relative w-full h-[200px]">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Zero line */}
          {minAmount < 0 && (
            <line
              x1="0"
              y1={getYPosition(0)}
              x2="100"
              y2={getYPosition(0)}
              stroke="#EFF1F6"
              strokeWidth="0.5"
              vectorEffect="non-scaling-stroke"
            />
          )}
          
          {/* Chart line */}
          <path
            d={pathData}
            fill="none"
            stroke="#FF5403"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
      {/* Date labels */}
      <div className="flex justify-between mt-4 leading-6 text-[#56616B] border-t border-[#DBDEE5] pt-2.5 font-medium">
        <span>{firstDate}</span>
        <span>{lastDate}</span>
      </div>
    </div>
  );
}

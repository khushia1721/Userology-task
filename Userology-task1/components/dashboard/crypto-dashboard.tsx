"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/lib/redux/store";
import {
  fetchCryptoData,
  toggleFavorite,
} from "@/lib/redux/slices/cryptoSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Star,
  TrendingDown,
  TrendingUp,
  ChevronRight,
  LineChart,
  BarChart3,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function CryptoDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, favorites } = useSelector(
    (state: RootState) => state.crypto
  );

  useEffect(() => {
    dispatch(fetchCryptoData());

    // Refresh data every 60 seconds
    const interval = setInterval(() => {
      dispatch(fetchCryptoData());
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  if (loading === "pending" && !data.length) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-xl border border-border/40"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
            <div className="p-6 space-y-4 relative">
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <Skeleton className="h-12 w-12 rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-4 w-10" />
                  </div>
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
              <div className="flex justify-between items-end pt-4">
                <Skeleton className="h-8 w-28" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <Skeleton className="h-1 w-full mt-2" />
              <Skeleton className="h-5 w-full mt-2" />
              <Skeleton className="h-10 w-full mt-3 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="glass-card">
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
          <h3 className="text-xl font-semibold mb-2">Error</h3>
          <p className="text-muted-foreground mb-4 text-center">{error}</p>
          <Button
            onClick={() => dispatch(fetchCryptoData())}
            variant="default"
            className="mt-2"
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-10">
      {favorites.length > 0 && (
        <div className="data-section">
          <h2 className="text-xl font-semibold mb-5 data-section-header flex items-center">
            <Star className="mr-2 h-5 w-5 text-yellow-500 fill-yellow-500" />
            Favorite Cryptocurrencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data
              .filter((crypto) => favorites.includes(crypto.id))
              .map((crypto) => (
                <CryptoCard
                  key={crypto.id}
                  crypto={crypto}
                  isFavorite={favorites.includes(crypto.id)}
                  onToggleFavorite={() => dispatch(toggleFavorite(crypto.id))}
                />
              ))}
          </div>
        </div>
      )}

      <div className="data-section">
        <h2 className="text-xl font-semibold mb-5 data-section-header">
          All Cryptocurrencies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((crypto) => (
            <CryptoCard
              key={crypto.id}
              crypto={crypto}
              isFavorite={favorites.includes(crypto.id)}
              onToggleFavorite={() => dispatch(toggleFavorite(crypto.id))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface CryptoCardProps {
  crypto: {
    id: string;
    name: string;
    symbol: string;
    price: number;
    change24h: number;
    marketCap: number;
  };
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

function CryptoCard({ crypto, isFavorite, onToggleFavorite }: CryptoCardProps) {
  const isPositiveChange = crypto.change24h >= 0;

  // Get crypto styling
  const getCryptoStyle = (id: string) => {
    switch (id.toLowerCase()) {
      case "bitcoin":
        return {
          iconText: "₿",
          bgStyle:
            "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20",
          iconBgStyle: "bg-amber-100 dark:bg-amber-900/30",
          graphColor: "#f59e0b",
          shadowColor: "rgba(245, 158, 11, 0.1)",
          borderColor: "border-amber-200/40 dark:border-amber-800/30",
          accent: "#f59e0b",
        };
      case "ethereum":
        return {
          iconText: "Ξ",
          bgStyle:
            "bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20",
          iconBgStyle: "bg-indigo-100 dark:bg-indigo-900/30",
          graphColor: "#6366f1",
          shadowColor: "rgba(99, 102, 241, 0.1)",
          borderColor: "border-indigo-200/40 dark:border-indigo-800/30",
          accent: "#6366f1",
        };
      case "cardano":
        return {
          iconText: "₳",
          bgStyle:
            "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
          iconBgStyle: "bg-blue-100 dark:bg-blue-900/30",
          graphColor: "#0ea5e9",
          shadowColor: "rgba(14, 165, 233, 0.1)",
          borderColor: "border-blue-200/40 dark:border-blue-800/30",
          accent: "#0ea5e9",
        };
      default:
        return {
          iconText: "Ͼ",
          bgStyle:
            "bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20",
          iconBgStyle: "bg-purple-100 dark:bg-purple-900/30",
          graphColor: "#8b5cf6",
          shadowColor: "rgba(139, 92, 246, 0.1)",
          borderColor: "border-purple-200/40 dark:border-purple-800/30",
          accent: "#8b5cf6",
        };
    }
  };

  const style = getCryptoStyle(crypto.id);

  // Generate random mini sparkline data
  const generateSparkline = () => {
    const dataPoints = 30;
    const variance = 0.05; // Max 5% variance between points
    const trend = isPositiveChange ? 0.3 : -0.3; // Overall trend direction

    let currentValue = 100; // Starting value
    const values = [];

    for (let i = 0; i < dataPoints; i++) {
      const randomChange = (Math.random() * 2 - 1) * variance; // Random value between -variance and +variance
      const trendInfluence = (i / dataPoints) * trend; // Increasing trend influence
      currentValue = currentValue * (1 + randomChange + trendInfluence);
      values.push(currentValue);
    }

    return values;
  };

  const sparklineData = generateSparkline();
  const normalizedData = sparklineData.map((value) => {
    // Normalize to 0-30 range for SVG height
    const min = Math.min(...sparklineData);
    const max = Math.max(...sparklineData);
    return 30 - ((value - min) / (max - min)) * 30;
  });

  // Create SVG path from data points
  const createSparklinePath = () => {
    const width = 100; // SVG width
    const points = normalizedData
      .map((y, i) => `${(i / (normalizedData.length - 1)) * width},${y}`)
      .join(" L ");
    return `M 0,${normalizedData[0]} L ${points}`;
  };

  return (
    <div
      className={`relative group overflow-hidden rounded-2xl border ${style.borderColor} transition-all duration-300 hover:shadow-lg ${style.bgStyle}`}
      style={{ boxShadow: `0 5px 20px -5px ${style.shadowColor}` }}
    >
      <div
        className="absolute h-40 w-40 rounded-full blur-3xl opacity-10 -bottom-20 -right-20 group-hover:opacity-20 transition-opacity"
        style={{
          background: `radial-gradient(circle at center, ${style.accent}, transparent 70%)`,
        }}
      ></div>

      <div className="p-6 space-y-4 relative">
        <div className="flex justify-between">
          <div className="flex items-start gap-3">
            <div
              className={`flex items-center justify-center w-11 h-11 rounded-xl ${style.iconBgStyle} font-mono text-xl`}
            >
              {style.iconText}
            </div>
            <div>
              <h3 className="text-base font-semibold leading-tight">
                {crypto.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">
                  {crypto.symbol}
                </span>
                {crypto.id === "bitcoin" && (
                  <span className="text-[10px] font-medium bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 px-1.5 py-0.5 rounded-sm">
                    BTC
                  </span>
                )}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFavorite}
            className={`rounded-full ${
              isFavorite ? "text-yellow-500" : "text-muted-foreground"
            } hover:bg-background/50`}
          >
            <Star
              className="h-[18px] w-[18px]"
              fill={isFavorite ? "currentColor" : "none"}
              strokeWidth={2}
            />
          </Button>
        </div>

        <div className="flex items-end justify-between pt-1 relative">
          <div>
            <span className="text-2xl font-bold">
              $
              {crypto.price.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </span>
            <div
              className={`inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                isPositiveChange
                  ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                  : "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300"
              }`}
            >
              {isPositiveChange ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {Math.abs(crypto.change24h).toFixed(2)}%
            </div>
          </div>
          <div className="absolute bottom-0 right-0">
            <svg width="100" height="30" className="opacity-60">
              <path
                d={createSparklinePath()}
                fill="none"
                stroke={style.accent}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="h-1 w-full bg-background/50 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-500 ease-in-out"
            style={{
              width: `${Math.min(100, Math.max(5, Math.random() * 100))}%`,
              background: `linear-gradient(to right, ${style.accent}80, ${style.accent})`,
            }}
          ></div>
        </div>

        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <BarChart3 className="h-3 w-3" />
            <span>
              Vol: $
              {(crypto.marketCap * Math.random() * 0.1).toLocaleString(
                undefined,
                { maximumFractionDigits: 0 }
              )}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Layers className="h-3 w-3" />
            <span>
              Cap: $
              {crypto.marketCap.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </div>

        <Link
          href={`/crypto/${crypto.id}`}
          className="flex items-center justify-between w-full mt-1 px-4 py-2 rounded-xl bg-background/60 hover:bg-background/80 backdrop-blur-sm border border-border/30 text-sm font-medium transition-colors"
        >
          View Detailed Analysis
          <ChevronRight className="h-4 w-4 text-primary/70" />
        </Link>
      </div>
    </div>
  );
}

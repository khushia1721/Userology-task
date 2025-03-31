"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import WeatherDashboard from "@/components/dashboard/weather-dashboard";
import CryptoDashboard from "@/components/dashboard/crypto-dashboard";
import NewsDashboard from "@/components/dashboard/news-dashboard";
import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton";
import NotificationsProvider from "@/components/notifications/notifications-provider";
import { Cloud, CircleDollarSign, Newspaper, RefreshCw } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("weather");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabRefs = {
    weather: useRef<HTMLButtonElement>(null),
    crypto: useRef<HTMLButtonElement>(null),
    news: useRef<HTMLButtonElement>(null),
  };

  // Update tab indicator position
  const updateIndicator = (id: string) => {
    const currentTab = tabRefs[id as keyof typeof tabRefs].current;
    if (currentTab) {
      const { offsetLeft, offsetWidth } = currentTab;
      setIndicatorStyle({
        transform: `translateX(${offsetLeft}px)`,
        width: `${offsetWidth}px`,
      });
    }
  };

  // Handle tab change
  const handleTabChange = (id: string) => {
    setActiveTab(id);
    updateIndicator(id);
  };

  // Initialize and handle window resize
  useEffect(() => {
    updateIndicator(activeTab);
    window.addEventListener("resize", () => updateIndicator(activeTab));
    return () =>
      window.removeEventListener("resize", () => updateIndicator(activeTab));
  }, [activeTab]);

  // Current time display
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8">
      <NotificationsProvider />

      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-0">
          <div className="space-y-1">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-1">
              <RefreshCw className="h-3 w-3 mr-1.5 animate-spin-slow" />
              Live Data
            </div>
            <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              Crypto<span className="text-primary">Weather</span> Nexus
            </h1>
            <p className="text-muted-foreground">
              Your integrated dashboard for real-time market, weather, and news
              intelligence.
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-sm text-muted-foreground">
              {currentTime.toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="text-2xl font-mono">
              {currentTime.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Custom tabs implementation */}
      <div className="custom-tabs">
        <div className="custom-tabs-list">
          <button
            ref={tabRefs.weather}
            onClick={() => handleTabChange("weather")}
            className="custom-tab"
            data-state={activeTab === "weather" ? "active" : ""}
          >
            <Cloud className="h-4 w-4" />
            Weather Dashboard
          </button>
          <button
            ref={tabRefs.crypto}
            onClick={() => handleTabChange("crypto")}
            className="custom-tab"
            data-state={activeTab === "crypto" ? "active" : ""}
          >
            <CircleDollarSign className="h-4 w-4" />
            Cryptocurrency Markets
          </button>
          <button
            ref={tabRefs.news}
            onClick={() => handleTabChange("news")}
            className="custom-tab"
            data-state={activeTab === "news" ? "active" : ""}
          >
            <Newspaper className="h-4 w-4" />
            Latest News
          </button>
          <div className="custom-tab-indicator" style={indicatorStyle} />
        </div>

        <div className="mt-6 relative">
          {activeTab === "weather" && (
            <div className="animate-in">
              <Suspense fallback={<DashboardSkeleton />}>
                <WeatherDashboard />
              </Suspense>
            </div>
          )}

          {activeTab === "crypto" && (
            <div className="animate-in">
              <Suspense fallback={<DashboardSkeleton />}>
                <CryptoDashboard />
              </Suspense>
            </div>
          )}

          {activeTab === "news" && (
            <div className="animate-in">
              <Suspense fallback={<DashboardSkeleton />}>
                <NewsDashboard />
              </Suspense>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

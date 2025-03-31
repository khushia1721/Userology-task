"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/lib/redux/store";
import {
  fetchWeatherData,
  toggleFavorite,
} from "@/lib/redux/slices/weatherSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Star,
  Droplets,
  Thermometer,
  Wind,
  ExternalLink,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function WeatherDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, favorites } = useSelector(
    (state: RootState) => state.weather
  );

  useEffect(() => {
    dispatch(fetchWeatherData());

    // Refresh data every 5 minutes
    const interval = setInterval(() => {
      dispatch(fetchWeatherData());
    }, 300000);

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
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-7 w-32" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
              <div className="flex justify-between items-center pt-4">
                <Skeleton className="h-14 w-14 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-4">
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
              <Skeleton className="h-10 w-full mt-2 rounded-lg" />
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
            onClick={() => dispatch(fetchWeatherData())}
            variant="default"
            className="mt-2"
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Filter favorite cities
  const favoriteCities = data.filter((city) => favorites.includes(city.city));

  // Filter non-favorite cities
  const otherCities = data.filter((city) => !favorites.includes(city.city));

  return (
    <div className="space-y-10">
      {favoriteCities.length > 0 && (
        <div className="data-section">
          <h2 className="text-xl font-semibold mb-5 data-section-header flex items-center">
            <Star className="mr-2 h-5 w-5 text-yellow-500 fill-yellow-500" />
            Favorite Locations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteCities.map((city) => (
              <WeatherCard
                key={city.city}
                city={city}
                isFavorite={true}
                onToggleFavorite={() => dispatch(toggleFavorite(city.city))}
              />
            ))}
          </div>
        </div>
      )}

      {otherCities.length > 0 && (
        <div className="data-section">
          <h2 className="text-xl font-semibold mb-5 data-section-header">
            {favoriteCities.length > 0 ? "Other Locations" : "All Locations"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherCities.map((city) => (
              <WeatherCard
                key={city.city}
                city={city}
                isFavorite={false}
                onToggleFavorite={() => dispatch(toggleFavorite(city.city))}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface WeatherCardProps {
  city: {
    city: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
    condition: string;
  };
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

function WeatherCard({ city, isFavorite, onToggleFavorite }: WeatherCardProps) {
  // Get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();

    // Clear and sunny conditions
    if (
      conditionLower.includes("sunny") ||
      conditionLower.includes("clear sky")
    )
      return "☀️";

    // Partly cloudy conditions
    if (
      conditionLower.includes("partly cloudy") ||
      conditionLower.includes("scattered clouds")
    )
      return "⛅";

    // Cloudy conditions
    if (
      conditionLower.includes("cloudy") ||
      conditionLower.includes("broken clouds")
    )
      return "☁️";
    if (conditionLower.includes("overcast")) return "☁️";

    // Rain conditions
    if (
      conditionLower.includes("light rain") ||
      conditionLower.includes("drizzle")
    )
      return "🌦️";
    if (conditionLower.includes("moderate rain")) return "🌧️";
    if (
      conditionLower.includes("heavy rain") ||
      conditionLower.includes("shower")
    )
      return "🌧️";
    if (conditionLower.includes("rain")) return "🌧️";

    // Thunderstorm conditions
    if (
      conditionLower.includes("thunder") ||
      conditionLower.includes("lightning")
    )
      return "⛈️";

    // Snow conditions
    if (
      conditionLower.includes("light snow") ||
      conditionLower.includes("flurries")
    )
      return "🌨️";
    if (conditionLower.includes("snow")) return "❄️";
    if (conditionLower.includes("blizzard")) return "❄️";

    // Fog and mist conditions
    if (conditionLower.includes("fog")) return "🌫️";
    if (conditionLower.includes("mist")) return "🌫️";
    if (conditionLower.includes("haze")) return "🌫️";

    // Special conditions
    if (
      conditionLower.includes("sleet") ||
      conditionLower.includes("freezing rain")
    )
      return "🌨️";
    if (conditionLower.includes("hail")) return "🌨️";
    if (conditionLower.includes("dust") || conditionLower.includes("sand"))
      return "💨";
    if (
      conditionLower.includes("tornado") ||
      conditionLower.includes("hurricane")
    )
      return "🌪️";

    // Default for clear or unknown conditions
    if (conditionLower.includes("clear")) return "🌤️";

    return "🌤️"; // Default icon
  };

  // Get card styling based on weather conditions
  const getCardStyle = () => {
    const conditionLower = city.condition.toLowerCase();
    const temp = city.temperature;

    // Hot and sunny
    if (
      (conditionLower.includes("sunny") || conditionLower.includes("clear")) &&
      temp > 25
    ) {
      return {
        backgroundStyle:
          "bg-gradient-to-br from-amber-50 to-blue-50 dark:from-amber-950/20 dark:to-blue-950/30",
        shadowColor: "rgba(251, 191, 36, 0.2)",
        iconBackgroundStyle: "bg-amber-50 dark:bg-amber-900/20",
        accentColor: "bg-amber-500",
      };
    }

    // Cloudy
    if (
      conditionLower.includes("cloud") ||
      conditionLower.includes("overcast")
    ) {
      return {
        backgroundStyle:
          "bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900/40 dark:to-blue-950/30",
        shadowColor: "rgba(148, 163, 184, 0.2)",
        iconBackgroundStyle: "bg-slate-100 dark:bg-slate-800/50",
        accentColor: "bg-slate-500",
      };
    }

    // Rainy
    if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
      return {
        backgroundStyle:
          "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
        shadowColor: "rgba(59, 130, 246, 0.2)",
        iconBackgroundStyle: "bg-blue-50 dark:bg-blue-900/20",
        accentColor: "bg-blue-500",
      };
    }

    // Thunderstorm
    if (
      conditionLower.includes("thunder") ||
      conditionLower.includes("lightning")
    ) {
      return {
        backgroundStyle:
          "bg-gradient-to-br from-purple-50 to-slate-50 dark:from-purple-950/30 dark:to-slate-950/40",
        shadowColor: "rgba(147, 51, 234, 0.2)",
        iconBackgroundStyle: "bg-purple-50 dark:bg-purple-900/20",
        accentColor: "bg-purple-500",
      };
    }

    // Snowy
    if (conditionLower.includes("snow") || conditionLower.includes("ice")) {
      return {
        backgroundStyle:
          "bg-gradient-to-br from-sky-50 to-slate-50 dark:from-sky-950/20 dark:to-slate-950/30",
        shadowColor: "rgba(186, 230, 253, 0.2)",
        iconBackgroundStyle: "bg-sky-50 dark:bg-sky-900/20",
        accentColor: "bg-sky-500",
      };
    }

    // Foggy
    if (
      conditionLower.includes("fog") ||
      conditionLower.includes("mist") ||
      conditionLower.includes("haze")
    ) {
      return {
        backgroundStyle:
          "bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/30 dark:to-slate-950/20",
        shadowColor: "rgba(209, 213, 219, 0.2)",
        iconBackgroundStyle: "bg-gray-100 dark:bg-gray-800/40",
        accentColor: "bg-gray-500",
      };
    }

    // Default - cool and clear
    return {
      backgroundStyle:
        "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
      shadowColor: "rgba(96, 165, 250, 0.15)",
      iconBackgroundStyle: "bg-blue-50 dark:bg-blue-900/20",
      accentColor: "bg-blue-500",
    };
  };

  const cardStyle = getCardStyle();

  return (
    <div
      className={`relative group overflow-hidden rounded-2xl border border-border/40 transition-all duration-300 hover:shadow-lg ${cardStyle.backgroundStyle}`}
      style={{ boxShadow: `0 5px 20px -5px ${cardStyle.shadowColor}` }}
    >
      <div
        className="absolute h-32 w-32 rounded-full blur-3xl opacity-20 -top-10 -right-10 animate-pulse-slow group-hover:opacity-30 group-hover:blur-2xl transition-all"
        style={{
          background: `radial-gradient(circle at center, ${cardStyle.accentColor}, transparent 70%)`,
        }}
      ></div>

      <div className="p-6 space-y-4 relative">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-1.5">
              <MapPin className="h-4 w-4 text-primary/70" />
              <h3 className="text-lg font-semibold">{city.city}</h3>
            </div>
            <Badge
              variant="outline"
              className="mt-1.5 font-normal px-2 bg-background/50"
            >
              {city.condition}
            </Badge>
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

        <div className="flex justify-between items-center pt-2">
          <div
            className={`flex items-center justify-center h-16 w-16 rounded-2xl ${cardStyle.iconBackgroundStyle}`}
          >
            <span className="text-4xl">{getWeatherIcon(city.condition)}</span>
          </div>
          <div className="text-right">
            <div className="flex items-end space-x-1">
              <span className="text-4xl font-bold">{city.temperature}</span>
              <span className="text-xl font-medium mb-1">°C</span>
            </div>
            <span className="text-xs text-muted-foreground">
              Feels like {city.temperature - 2 + Math.floor(Math.random() * 5)}
              °C
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-3">
          <div className="flex flex-col justify-center items-center bg-background/50 backdrop-blur-sm rounded-xl p-2 border border-border/30">
            <Thermometer className="h-4 w-4 text-primary/70 mb-1" />
            <span className="text-xs font-medium">{city.temperature}°C</span>
          </div>
          <div className="flex flex-col justify-center items-center bg-background/50 backdrop-blur-sm rounded-xl p-2 border border-border/30">
            <Droplets className="h-4 w-4 text-blue-500/70 mb-1" />
            <span className="text-xs font-medium">{city.humidity}%</span>
          </div>
          <div className="flex flex-col justify-center items-center bg-background/50 backdrop-blur-sm rounded-xl p-2 border border-border/30">
            <Wind className="h-4 w-4 text-slate-500/70 mb-1" />
            <span className="text-xs font-medium">{city.windSpeed} km/h</span>
          </div>
        </div>

        <a
          href={`https://wttr.in/${encodeURIComponent(city.city)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full mt-4 px-4 py-2 rounded-xl bg-background/60 hover:bg-background/80 backdrop-blur-sm border border-border/30 text-sm font-medium transition-colors"
        >
          View Detailed Forecast
          <ChevronRight className="h-4 w-4 text-primary/70" />
        </a>
      </div>
    </div>
  );
}

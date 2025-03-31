"use client";

import type React from "react";

import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Clock,
  X,
  AlertTriangle,
  TrendingUp,
  Cloud,
  CircleDollarSign,
  Sparkles,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/lib/redux/store";
import { clearNotifications } from "@/lib/redux/slices/notificationsSlice";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Notification } from "@/lib/types";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useSelector(
    (state: RootState) => state.notifications.items
  );
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setUnreadCount(notifications.length);
  }, [notifications]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClearNotifications = () => {
    dispatch(clearNotifications());
    setUnreadCount(0);
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const date = new Date(timestamp);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "price_alert":
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case "weather_alert":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-xl shadow-sm border-b"
          : "bg-transparent"
      )}
    >
      <div className="container max-w-7xl flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative overflow-hidden w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <span className="absolute inset-0 bg-gradient-to-br from-primary-foreground/20 to-transparent opacity-40"></span>
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsla(var(--primary)),transparent_65%)]"></span>
            <div className="relative flex items-center justify-center space-x-0">
              <Cloud
                className="h-4 w-4 absolute opacity-60 blur-[0.5px]"
                style={{ transform: "translate(-5px, -1px) rotate(-5deg)" }}
              />
              <CircleDollarSign
                className="h-4 w-4 absolute opacity-60 blur-[0.5px]"
                style={{ transform: "translate(5px, 1px) rotate(5deg)" }}
              />
              <Sparkles className="h-4 w-4 relative" />
            </div>
            <div className="absolute -bottom-10 w-20 h-20 bg-primary/30 rounded-full blur-xl"></div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-foreground">
                CryptoWeather
              </h1>
              <span className="bg-primary/10 text-primary text-xs py-0.5 px-1.5 rounded ml-1.5 font-medium">
                Nexus
              </span>
            </div>
            <div className="flex space-x-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60"></span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent/60"></span>
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/20"></span>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "relative h-10 w-10 rounded-full overflow-hidden transition-all border-primary/20 hover:bg-primary/10 group",
                  open && "border-primary/40"
                )}
              >
                <span className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <Bell
                  className={cn(
                    "h-5 w-5 transition-all",
                    open && "text-primary scale-110"
                  )}
                />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-in shadow-md"
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 p-0 overflow-hidden rounded-xl"
              sideOffset={8}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
                <h3 className="font-semibold flex items-center">
                  <Bell className="h-4 w-4 mr-2 text-primary" />
                  Notifications
                </h3>
                {notifications.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs"
                    onClick={handleClearNotifications}
                  >
                    <X className="h-3.5 w-3.5 mr-1" />
                    Clear all
                  </Button>
                )}
              </div>

              {notifications.length > 0 ? (
                <ScrollArea className="max-h-[60vh]">
                  {notifications.map(
                    (notification: Notification, index: number) => (
                      <NotificationItem
                        key={index}
                        notification={notification}
                        formatTimeAgo={formatTimeAgo}
                        getNotificationIcon={getNotificationIcon}
                      />
                    )
                  )}
                </ScrollArea>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-3 relative overflow-hidden">
                    <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsla(var(--primary)/30),transparent_70%)]"></span>
                    <Bell className="h-6 w-6 text-primary/70 relative" />
                  </div>
                  <p className="text-foreground font-medium mb-1">
                    No notifications yet
                  </p>
                  <p className="text-xs text-muted-foreground">
                    We'll notify you when important updates arrive
                  </p>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

interface NotificationItemProps {
  notification: Notification;
  formatTimeAgo: (timestamp: string) => string;
  getNotificationIcon: (type: string) => React.ReactNode;
}

function NotificationItem({
  notification,
  formatTimeAgo,
  getNotificationIcon,
}: NotificationItemProps) {
  return (
    <DropdownMenuItem className="flex flex-col items-start py-3 px-4 border-b last:border-0 cursor-default hover:bg-primary/5 focus:bg-primary/5">
      <div className="flex items-start w-full">
        <div className="bg-primary/10 p-2 rounded-lg mr-3 mt-0.5 relative overflow-hidden">
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,hsla(var(--primary)/30),transparent_70%)]"></span>
          <div className="relative">
            {getNotificationIcon(notification.type)}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between w-full mb-1">
            <p className="font-medium text-sm truncate">{notification.title}</p>
            <div className="flex items-center text-xs text-muted-foreground ml-2 whitespace-nowrap">
              <Clock className="h-3 w-3 mr-1" />
              {formatTimeAgo(notification.timestamp)}
            </div>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {notification.message}
          </p>
        </div>
      </div>
    </DropdownMenuItem>
  );
}

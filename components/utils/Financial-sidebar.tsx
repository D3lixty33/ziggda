"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User } from "@/lib/types";
import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  TrendingUp,
  PieChart,
  Receipt,
  Target,
  Users,
  Settings,
  Bell,
  HelpCircle,
  ChevronDown,
  LogOut,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserFetch } from "@/lib/utils";

export function FinancialSidebar({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("/dashboard");
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const navigationItems = [
  {
    title: "Overview",
    href: `/${id}/dashboard`,
    icon: LayoutDashboard,
  },
  {
    title: "Accounts",
    href: `/${id}/account`,
    icon: Wallet,
//    badge: "3",
  },
  {
    title: "Transactions",
    href: `/${id}/transactions`,
    icon: Receipt,
    badge: "12",
  },
  {
    title: "Cards",
    href: `/${id}/cards`,
    icon: CreditCard,
  }
  /*
  {
    title: "Investments",
    href: "/investments",
    icon: TrendingUp,
  },
  {
    title: "Budget",
    href: "/budget",
    icon: Target,
  },
  */
];

const bottomNavItems = [
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Help",
    href: "/help",
    icon: HelpCircle,
  },
];

  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    const res = await UserFetch(id);
    setUserData(res);
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-sidebar text-sidebar-foreground p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-sidebar-border">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Building2 className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="text-lg font-semibold text-sidebar-foreground">
                DashMetrics
              </span>
            </Link>
          </div>

          {/* Account Summary */}
          <div className="p-4 border-b border-sidebar-border">
            <button
              onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
              className="w-full flex items-center justify-between p-3 bg-sidebar-accent rounded-lg hover:bg-sidebar-accent/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-accent">JD</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-sidebar-accent-foreground">
                    {userData?.name}
                  </p>
                  <p className="text-xs text-sidebar-accent-foreground/60">
                    Premium Account
                  </p>
                </div>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-sidebar-accent-foreground transition-transform",
                  accountDropdownOpen && "rotate-180"
                )}
              />
            </button>

            {accountDropdownOpen && (
              <div className="mt-2 p-2 bg-sidebar-accent rounded-lg space-y-1">
                <div className="p-2 text-xs text-sidebar-accent-foreground/80">
                  <div className="flex justify-between mb-1">
                    <span>Total Balance</span>
                    <span className="font-semibold text-sidebar-accent-foreground">
                      $48,572.00
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1 text-green-600">
                      <ArrowUpRight className="h-3 w-3" />
                      +2.5%
                    </span>
                    <span className="text-sidebar-accent-foreground/60">
                      this month
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setActiveItem(item.href);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    activeItem === item.href
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-accent text-accent-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-sidebar-border">
              <p className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-3 px-3">
                Quick Actions
              </p>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors">
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                  <span>Send Money</span>
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors">
                  <ArrowDownRight className="h-4 w-4 text-blue-600" />
                  <span>Request Payment</span>
                </button>
              </div>
            </div>
          </nav>

          {/* Bottom Navigation */}
          <div className="p-4 border-t border-sidebar-border space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
              <span className="ml-auto bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-0.5 rounded-full">
                3
              </span>
            </button>
            {bottomNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  setActiveItem(item.href);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  activeItem === item.href
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            ))}
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors">
              <LogOut className="h-5 w-5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

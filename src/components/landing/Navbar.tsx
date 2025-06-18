import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Menu,
  X,
  BarChart3,
  LogIn,
  Globe,
  Users,
  Shield,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Analytics Dashboard",
    description: "Real-time website analytics and insights",
    icon: BarChart3,
    href: "/dashboard",
  },
  {
    title: "Multi-Website Support",
    description: "Manage multiple websites from one dashboard",
    icon: Globe,
    href: "/dashboard",
  },
  {
    title: "User Management",
    description: "Advanced user tracking and behavior analysis",
    icon: Users,
    href: "/dashboard",
  },
  {
    title: "Secure Access",
    description: "Enterprise-grade security and data protection",
    icon: Shield,
    href: "/login",
  },
];

export function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Multi-Dash
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Features
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      {features.map((feature) => (
                        <NavigationMenuLink
                          key={feature.title}
                          asChild
                          className="group"
                        >
                          <Link
                            to={feature.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <feature.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              <div className="text-sm font-medium leading-none">
                                {feature.title}
                              </div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {feature.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              to="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>

            <Link
              to="#about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button
                variant="ghost"
                className="text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-950/20"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200/50 dark:border-gray-800/50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              
              <Link
                to="#about"
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200/50 dark:border-gray-800/50">
              <div className="flex items-center gap-3 px-5">
                <Link
                  to="/login"
                  className="flex-1"
                  onClick={() => setIsOpen(false)}
                >
                  <Button variant="outline" className="w-full">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <Link
                  to="/dashboard"
                  className="flex-1"
                  onClick={() => setIsOpen(false)}
                >
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

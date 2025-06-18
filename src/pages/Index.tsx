import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, LogIn, Sparkles, ArrowRight } from "lucide-react";
import { LandingNavbar } from "@/components/landing/Navbar";
import { LandingFooter } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/20">
      {/* Navbar */}
      <LandingNavbar />

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo */}
            <div className="flex items-center justify-center mb-8">
              <div className="h-20 w-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
            </div>

            {/* Hero Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Multi Analytics
              </span>
              <br />
            </h1>


            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="gap-3 h-14 px-8 text-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>

              <Link to="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-3 h-14 px-8 text-lg border-2 border-dashed border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-all duration-300"
                >
                  <LogIn className="h-5 w-5" />
                  Sign In
                </Button>
              </Link>
            </div>

            </div>

        </section>

      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

export default Index;

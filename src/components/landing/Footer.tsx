import { Link } from "react-router-dom";

export function LandingFooter() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border-t border-gray-200/50 dark:border-gray-800/50">
     
      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200/50 dark:border-gray-800/50">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© 2024  Multi-Dashboard.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link
              to="#status"
              className="hover:text-foreground transition-colors"
            >
              Status
            </Link>
            <Link
              to="#privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="#terms"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

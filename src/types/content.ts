export type ContentType =
  | "dashboard"
  | "analytics-overview"
  | "analytics-realtime"
  | "analytics-traffic"
  | "analytics-users"
  | "analytics-conversions"
  | "analytics-reports"
  | "analytics-testing"
  | "ecommerce-orders"
  | "ecommerce-products"
  | "ecommerce-inventory"
  | "ecommerce-revenue"
  | "ecommerce-customers"
  | "ecommerce-promotions"
  | "ecommerce-marketing"
  | "blog-posts"
  | "blog-categories"
  | "blog-media"
  | "blog-comments"
  | "blog-social"
  | "blog-newsletter"
  | "blog-seo"
  | "saas-users"
  | "saas-subscriptions"
  | "saas-api"
  | "saas-performance"
  | "saas-infrastructure"
  | "saas-security"
  | "saas-integrations"
  | "tools-calendar"
  | "tools-charts"
  | "tools-devices"
  | "settings"
  | "help"
  | "notifications"
  | "feedback";

export interface ContentItem {
  id: ContentType;
  title: string;
  description: string;
}

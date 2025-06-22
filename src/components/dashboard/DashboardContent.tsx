import {
  Users,
  DollarSign,
  Eye,
  TrendingUp,
  MessageCircle,
  BookOpen,
  ScrollText,
  Star,
  BarChart,
  CalendarCheck,
  ClipboardList,
  LayoutDashboard,
  FileText,
  Folder,
  Newspaper,
} from "lucide-react";

import { StatsCard } from "./charts/StatsCard";
import { Website } from "@/types/dashboard";

interface DashboardContentProps {
  selectedWebsite: Website;
  data: any;
}

// Safely extract primitive value (or fallback)
const getStatValue = (input: any): number | string => {
  if (input && typeof input === "object" && "value" in input) {
    return input.value;
  }
  return input ?? 0;
};

export function DashboardContent({
  selectedWebsite,
  data,
}: DashboardContentProps) {
  const type = selectedWebsite.type;

  return (
    <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-purple-50/30 to-pink-50/30 dark:from-blue-950/10 dark:via-purple-950/10 dark:to-pink-950/10 rounded-2xl -z-10" />
        <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          {selectedWebsite.name} Dashboard
        </h2>
        <p className="text-muted-foreground text-lg mt-2">
          Analytics and insights for your{" "}
          <span className="font-semibold text-foreground capitalize">{type}</span> website
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {type === "analytics" && (
          <>
            <StatsCard title="Registered Users" value={getStatValue(data.registered_users)} icon={Users} description="All signed up users" colorScheme="blue" />
            <StatsCard title="Blog Posts" value={getStatValue(data.blog_count)} icon={FileText} description="Published blogs" colorScheme="green" />
            <StatsCard title="Subscriptions" value={getStatValue(data.subscriptions_count)} icon={Star} description="Ongoing plans" colorScheme="purple" />
            <StatsCard title="Categories" value={getStatValue(data.categories_count)} icon={Folder} description="Content categories" colorScheme="orange" />
            <StatsCard title="Magazines" value={getStatValue(data.magazines_count)} icon={Newspaper} description="Uploaded issues" colorScheme="pink" />
          </>
        )}

        {type === "scr" && (
          <>
            <StatsCard title="Registered Users" value={getStatValue(data.registered_users)} change={data.registered_users?.change} icon={Users} description="SCR platform users" colorScheme="blue" />
            <StatsCard title="Contact Messages" value={getStatValue(data.contact_messages)} change={data.contact_messages?.change} icon={MessageCircle} description="User queries" colorScheme="cyan" />
            <StatsCard title="Results" value={getStatValue(data.results)} change={data.results?.change} icon={TrendingUp} description="Test outcomes" colorScheme="orange" />
            <StatsCard title="Learning Obj. Results" value={getStatValue(data.learning_obj_result)} change={data.learning_obj_result?.change} icon={ClipboardList} description="LO-based responses" colorScheme="green" />
            <StatsCard title="Revenue" value={getStatValue(data.paid_user) * 4000} icon={DollarSign} description="Total earnings" colorScheme="purple" />
            <StatsCard title="Paid Users" value={getStatValue(data.paid_user)} icon={Star} description="Subscribed users" colorScheme="pink" />
            <StatsCard title="Verified Users" value={getStatValue(data.verified_user)} icon={LayoutDashboard} description="Email verified" colorScheme="orange" />
            <StatsCard title="Trial Requests" value={getStatValue(data.trial_request)} icon={CalendarCheck} description="Trial signups" colorScheme="green" />
            <StatsCard title="SCR Questions" value={getStatValue(data.scr_question)} icon={ScrollText} description="SCR test items" colorScheme="blue" />
            <StatsCard title="Flash Questions" value={getStatValue(data.flash_question)} icon={Eye} description="Quick questions" colorScheme="cyan" />
            <StatsCard title="Learning Obj. Questions" value={getStatValue(data.learning_obj_question)} icon={BookOpen} description="LO-linked questions" colorScheme="purple" />
          </>
        )}

        {type === "olympiad" && (
          <>
            <StatsCard title="Registered Users" value={getStatValue(data.registered_users)} change={data.registered_users?.change} icon={Users} description="Olympiad participants" colorScheme="green" />
            <StatsCard title="Contact Messages" value={getStatValue(data.contact_messages)} change={data.contact_messages?.change} icon={MessageCircle} description="User messages" colorScheme="blue" />
            <StatsCard title="Payments" value={getStatValue(data.payments)} change={data.payments?.change} icon={DollarSign} description="Payment records" colorScheme="purple" />
            <StatsCard title="Goals Created" value={getStatValue(data.goal)} icon={TrendingUp} description="Custom goals" colorScheme="orange" />
            <StatsCard title="Total Revenue" value={getStatValue(data.total_revenue)} change={data.total_revenue?.change} icon={BarChart} description="Overall revenue" colorScheme="cyan" />
            <StatsCard title="Results" value={getStatValue(data.results)} change={data.results?.change} icon={TrendingUp} description="Submitted results" colorScheme="green" />
            <StatsCard title="Goal Tests" value={getStatValue(data.goal_test)} icon={ClipboardList} description="Tests by goals" colorScheme="pink" />
            <StatsCard title="Question Bank" value={getStatValue(data.test_question)} icon={ScrollText} description="Question inventory" colorScheme="blue" />
          </>
        )}

        {type === "computation" && (
          <>
            <StatsCard title="Registered Users" value={getStatValue(data.registered_users)} change={data.registered_users?.change} icon={Users} description="Platform users" colorScheme="green" />
            <StatsCard title="Finance Emissions" value={getStatValue(data.financed_emission)} change={data.financed_emission?.change} icon={BarChart} description="Emission computations" colorScheme="cyan" />
          </>
        )}
      </div>
    </div>
  );
}

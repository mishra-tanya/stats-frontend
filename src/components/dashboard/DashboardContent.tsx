import { Users, DollarSign, Eye, TrendingUp, MessageCircleCodeIcon, Book } from "lucide-react";

import { StatsCard } from "./charts/StatsCard";
import { Website } from "@/types/dashboard";

interface DashboardContentProps {
  selectedWebsite: Website;
  data: any; 
}

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
          <span className="font-semibold text-foreground capitalize">
            {type}
          </span>{" "}
          website
        </p>
      </div>

      {/* Dynamic Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {type === "analytics" && (
          <>
            <StatsCard
              title="Registered Users"
              value={data.registered_users}
              icon={Users}
              description="Total active users"
              colorScheme="blue"
            />
            <StatsCard
              title="Blog Posts"
              value={data.blog_count}
              icon={Eye}
              description="Total blogs published"
              colorScheme="green"
            />
            <StatsCard
              title="Subscriptions"
              value={data.subscriptions_count}
              icon={DollarSign}
              description="Active subscriptions"
              colorScheme="purple"
            />
            <StatsCard
              title="Categories"
              value={data.categories_count}
              icon={TrendingUp}
              description="Blog categories"
              colorScheme="orange"
            />
             <StatsCard
              title="Magazines"
              value={data.magazines_count}
              icon={TrendingUp}
              description="Total Magazines"
              colorScheme="pink"
            />
          </>
        )}

        {type === "scr" && (
          <>
         <StatsCard
              title="Registered Users"
              value={data.registered_users?.value}
              change={data.registered_users?.change}
              icon={Users}
              description="Total SCR users"
              colorScheme="blue"
            />
            <StatsCard
              title="Contact Messages"
              value={data.contact_messages?.value}
              change={data.contact_messages?.change}
              icon={MessageCircleCodeIcon}
              description="Total contact messages"
              colorScheme="green"
            />
            <StatsCard
              title="Results"
              value={data.results?.value}
              change={data.results?.change}
              icon={TrendingUp}
              description="Test results submitted"
              colorScheme="orange"
            />
            <StatsCard
              title="Learning Objective Results"
              value={data.learning_obj_result?.value}
              change={data.learning_obj_result?.change}
              icon={TrendingUp}
              description="Learning Obj results submitted"
              colorScheme="cyan"
            />
            <StatsCard
              title="Revenue"
              value={data.paid_user*4000}
              icon={TrendingUp}
              description="Total Revenue"
              colorScheme="green"
            />
             <StatsCard
              title="Paid Users"
              value={data.paid_user}
              icon={TrendingUp}
              description="Total paid users"
              colorScheme="pink"
            />
             <StatsCard
              title="Verified Users"
              value={data.verified_user}
              icon={TrendingUp}
              description="Total verified users"
              colorScheme="orange"
            />
            <StatsCard
              title="Trial Requests"
              value={data.trial_request}
              icon={TrendingUp}
              description="Total Trial Requests"
              colorScheme="green"
            />
            <StatsCard
              title="SCR Questions"
              value={data.scr_question}
              icon={Book}
              description="Total SCR questions"
              colorScheme="pink"
            />
            <StatsCard
              title="Flash Questions"
              value={data.flash_question}
              icon={Eye}
              description="Total flash questions"
              colorScheme="green"
            />
            <StatsCard
              title="Learning Obj. Questions"
              value={data.learning_obj_question}
              icon={DollarSign}
              description="Questions mapped to LOs"
              colorScheme="purple"
            />
          
          </>
        )}

        {type === "olympiad" && (
          <StatsCard
            title="Dashboard"
            value="N/A"
            change={{ value: 0, type: "increase" }}
            icon={Users}
            description="Waiting for data..."
            colorScheme="cyan"
          />
        )}

         {type === "computation" && (
         <>
          <StatsCard
            title="Registered User"
            value={data.registered_users}
            change={{ value: 0, type: "increase" }}
            icon={Users}
            description="Total Registered Users"
            colorScheme="green"
          />
            <StatsCard
            title="Finance Emissions"
            value={data.financed_emission}
            change={{ value: 0, type: "increase" }}
            icon={Users}
            description="Total Emissions"
            colorScheme="cyan"
          />
         </>
        )}
      </div>

      {/* {type === "olympiad" || type === "scr" ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <DashboardAreaChart
            data={[]} 
            title="Traffic Overview"
            description="Users and engagement trends"
          />
          <DashboardPieChart
            data={[
              { name: "Desktop", value: 45, fill: "hsl(var(--chart-1))" },
              { name: "Mobile", value: 35, fill: "hsl(var(--chart-2))" },
              { name: "Tablet", value: 15, fill: "hsl(var(--chart-3))" },
              { name: "Other", value: 5, fill: "hsl(var(--chart-4))" },
            ]}
            title="Traffic Sources"
            description="Breakdown of device usage"
          />
        </div>
      ) : null}

      {type === "olympiad" && (
        <DataTable
          data={[
            {
              id: "1",
              page: "/scr/module1",
              views: 5000,
              users: 1200,
              bounceRate: 30,
              avgTime: "3:40",
            },
            {
              id: "2",
              page: "/scr/module2",
              views: 4200,
              users: 1000,
              bounceRate: 25,
              avgTime: "4:10",
            },
          ]}
          title="Top Modules"
          description="Most engaged SCR modules"
        />
      )} */}
    </div>
  );
}

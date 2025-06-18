import { useState } from "react";
import {
  ShoppingCart,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Search,
  Download,
  Eye,
} from "lucide-react";
import { StatsCard } from "../charts/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function OrdersContent() {
  const [filter, setFilter] = useState("all");

  const orderStats = {
    totalOrders: 1247,
    pendingOrders: 23,
    shippedOrders: 156,
    completedOrders: 1068,
  };

  const orders = [
    {
      id: "#ORD-001",
      customer: "John Doe",
      email: "john@example.com",
      amount: 299.99,
      status: "completed",
      date: "2024-01-15",
      items: 3,
      paymentMethod: "Credit Card",
    },
    {
      id: "#ORD-002",
      customer: "Jane Smith",
      email: "jane@example.com",
      amount: 149.5,
      status: "shipped",
      date: "2024-01-14",
      items: 2,
      paymentMethod: "PayPal",
    },
    {
      id: "#ORD-003",
      customer: "Bob Johnson",
      email: "bob@example.com",
      amount: 89.99,
      status: "pending",
      date: "2024-01-14",
      items: 1,
      paymentMethod: "Credit Card",
    },
    {
      id: "#ORD-004",
      customer: "Alice Brown",
      email: "alice@example.com",
      amount: 459.99,
      status: "processing",
      date: "2024-01-13",
      items: 5,
      paymentMethod: "Bank Transfer",
    },
    {
      id: "#ORD-005",
      customer: "Charlie Wilson",
      email: "charlie@example.com",
      amount: 199.99,
      status: "cancelled",
      date: "2024-01-13",
      items: 2,
      paymentMethod: "Credit Card",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case "shipped":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200">
            <Truck className="h-3 w-3 mr-1" />
            Shipped
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200">
            <Package className="h-3 w-3 mr-1" />
            Processing
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-background via-green-50/30 to-background dark:via-green-950/10">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50/30 via-emerald-50/30 to-green-50/30 dark:from-green-950/10 dark:via-emerald-950/10 dark:to-green-950/10 rounded-2xl -z-10" />

        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 bg-clip-text text-transparent">
          Order Management
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          Track and manage all your e-commerce orders in one place
        </p>
      </div>

      {/* Order Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Orders"
          value={orderStats.totalOrders}
          change={{ value: 12.5, type: "increase" }}
          icon={ShoppingCart}
          description="All time orders"
          colorScheme="blue"
        />
        <StatsCard
          title="Pending Orders"
          value={orderStats.pendingOrders}
          change={{ value: -8.2, type: "decrease" }}
          icon={Clock}
          description="Awaiting processing"
          colorScheme="orange"
        />
        <StatsCard
          title="Shipped Orders"
          value={orderStats.shippedOrders}
          change={{ value: 15.3, type: "increase" }}
          icon={Truck}
          description="Currently in transit"
          colorScheme="purple"
        />
        <StatsCard
          title="Completed Orders"
          value={orderStats.completedOrders}
          change={{ value: 18.7, type: "increase" }}
          icon={CheckCircle}
          description="Successfully delivered"
          colorScheme="green"
        />
      </div>

      {/* Orders Table */}
      <Card className="border-2 border-dashed border-green-200 dark:border-green-800 bg-gradient-to-br from-background to-green-50/20 dark:to-green-950/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-green-600 dark:text-green-400" />
              <CardTitle className="text-green-700 dark:text-green-300">
                Recent Orders
              </CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search orders..." className="pl-10" />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Orders Table */}
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Order ID</TableHead>
                  <TableHead className="font-semibold">Customer</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Items</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order, index) => (
                  <TableRow
                    key={order.id}
                    className={cn(
                      "hover:bg-muted/30 transition-colors",
                      index % 2 === 0 && "bg-muted/10",
                    )}
                  >
                    <TableCell className="font-mono font-medium">
                      {order.id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      ${order.amount}
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {order.date}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{order.items} items</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No orders found</h3>
              <p className="text-muted-foreground">
                No orders match the current filter criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

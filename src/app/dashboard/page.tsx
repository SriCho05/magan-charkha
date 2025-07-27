"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
        <div className="flex items-center justify-center h-screen">
            <p>Loading...</p>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-headline font-bold">My Dashboard</h1>
        <Button onClick={logout} variant="outline">Logout</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user.email}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is your personal dashboard. You can view your recent orders and manage your account details here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

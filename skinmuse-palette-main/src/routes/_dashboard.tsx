import { Outlet, createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const Route = createFileRoute("/_dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <DashboardShell>
      <Outlet />
    </DashboardShell>
  );
}

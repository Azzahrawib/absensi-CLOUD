import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Home, Camera, User, LogOut } from "lucide-react";

export const Route = createFileRoute("/employee")({
  component: EmployeeLayout,
});

function EmployeeLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const tabs = [
    { to: "/employee", label: "Home", icon: Home, exact: true },
    { to: "/employee/checkin", label: "Check In", icon: Camera },
    { to: "/employee/profile", label: "Profile", icon: User },
  ];
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="max-w-md mx-auto bg-white dark:bg-slate-900 min-h-screen flex flex-col relative shadow-xl">
        <div className="flex-1 pb-20">
          <Outlet />
        </div>
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-4">
            {tabs.map((t) => {
              const active = t.exact ? path === t.to : path.startsWith(t.to);
              return (
                <Link
                  key={t.to}
                  to={t.to}
                  className={`flex flex-col items-center py-3 gap-1 text-[11px] font-medium ${
                    active ? "text-indigo-600" : "text-slate-400"
                  }`}
                >
                  <t.icon className="w-5 h-5" />
                  {t.label}
                </Link>
              );
            })}
            <Link to="/" className="flex flex-col items-center py-3 gap-1 text-[11px] font-medium text-slate-400">
              <LogOut className="w-5 h-5" />
              Sign Out
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

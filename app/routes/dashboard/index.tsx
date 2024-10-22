import { AppSidebar } from "~/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { SelectedSurvey } from "~/components/SelectedSurvey";
import { TimeFilter } from "~/components/selectedTime";
import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams, useSubmit } from "@remix-run/react";

interface LoaderData {
  surveys: Array<{
    id: string;
    name: string;
    status: "active" | "draft" | "closed";
  }>;
  currentSurveyId?: string;
  timeRange?: {
    startDate: string;
    endDate: string;
  };
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const currentSurveyId = url.pathname.split("/surveys/")[1];
  const searchParams = new URLSearchParams(url.search);
  
  // Obtener fechas de la URL o usar valores por defecto (30 días)
  const now = new Date();
  const defaultStartDate = new Date();
  defaultStartDate.setDate(now.getDate() - 30);

  const timeRange = {
    startDate: searchParams.get("startDate") || defaultStartDate.toISOString(),
    endDate: searchParams.get("endDate") || now.toISOString(),
  };

  // Mock data
  const surveys = [
    { id: "1", name: "Customer Satisfaction Q1", status: "active" },
    { id: "2", name: "Employee Feedback 2024", status: "draft" },
    { id: "3", name: "Product Survey 2023", status: "closed" },
  ];

  return json({ surveys, currentSurveyId, timeRange });
};

export const meta: MetaFunction = () => {
  return [
    { title: "Link Up - Dashboard" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Dashboard() {
  const { surveys, currentSurveyId, timeRange } = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const submit = useSubmit();

  const handleTimeRangeChange = ({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
    const params = new URLSearchParams(searchParams);
    params.set("startDate", startDate.toISOString());
    params.set("endDate", endDate.toISOString());
    submit(params, { replace: true });
  };

  // Calcular el ID del rango actual basado en la diferencia de días
  const getCurrentRangeId = () => {
    if (!timeRange) return "30d";
    
    const start = new Date(timeRange.startDate);
    const end = new Date(timeRange.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Mapear la diferencia de días al ID más cercano
    const ranges = [7, 30, 60, 90, 180, 365];
    const closestRange = ranges.reduce((prev, curr) => {
      return Math.abs(curr - diffDays) < Math.abs(prev - diffDays) ? curr : prev;
    });
    
    return `${closestRange}d`;
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <h2 className="text-2xl font-bold">Analytics</h2>
          <div className="ml-4 w-64">
              <SelectedSurvey 
                surveys={surveys}
                currentSurveyId={currentSurveyId}
              />
            </div>
            <div className="ml-4 w-64">
              <TimeFilter
                onTimeRangeChange={handleTimeRangeChange}
                currentRangeId={getCurrentRangeId()}
              />
            </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
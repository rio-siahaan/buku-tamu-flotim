export interface Visitor {
  id: string;
  queue_number: string;
  full_name: string;
  phone: string;
  email: string;
  gender: "L" | "P";
  birth_date: string;
  institution: string;
  education: string;
  occupation: string;
  service_type: string;
  purpose: string;
  visited_at: string;
  created_at: string;
}

export interface DashboardStats {
  total: number;
  today: number;
  thisMonth: number;
  thisWeek: number;
}

export interface ChartDataItem {
  name: string;
  value: number;
}

export interface VisitorsResponse {
  data: Visitor[];
  count: number;
  page: number;
  pageSize: number;
}

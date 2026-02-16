import { Task } from "./task";

export interface DailyPlan {
  userId: string;
  date: string; // YYYY-MM-DD
  tasks: Task[];
  status: "open" | "closed";
}

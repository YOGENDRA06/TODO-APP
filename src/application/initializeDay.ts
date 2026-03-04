import { DailyPlan } from "../domain/dailyPlan";
import { getTodayPlan } from "../infrastructure/dailyPlanRepo";
import { getTodayDate } from "../utils/dateUtils";

export async function initializeTodayPlan(userId: string): Promise<DailyPlan> {
  const today = getTodayDate();

  const plan = await getTodayPlan(userId, today);

  return plan;
}
import { DailyPlan } from "../domain/dailyPlan";

export const completeTask = (
  plan: DailyPlan,
  taskId: string
): DailyPlan => {
  return {
    ...plan,
    tasks: plan.tasks.map((t) =>
      t.id === taskId ? { ...t, isCompleted: true } : t
    ),
  };
};

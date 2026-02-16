import { DailyPlan } from "../domain/dailyPlan";
import { Task } from "../domain/task";

export const createTask = (
  plan: DailyPlan,
  title: string
): DailyPlan => {
  const newTask: Task = {
    id: Date.now().toString(),
    title,
    isCompleted: false,
  };

  return {
    ...plan,
    tasks: [...plan.tasks, newTask],
  };
};

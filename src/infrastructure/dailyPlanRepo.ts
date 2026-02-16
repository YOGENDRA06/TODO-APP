import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { DailyPlan } from "../domain/dailyPlan";
import { db } from "./firebase";

export const getTodayPlan = async (
  userId: string,
  date: string,
): Promise<DailyPlan> => {
  const docId = `${userId}_${date}`;
  const ref = doc(db, "dailyPlans", docId);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    const newPlan: DailyPlan = {
      userId,
      date,
      tasks: [],
      status: "open",
    };
    await setDoc(ref, newPlan);
    return newPlan;
  }

  return snap.data() as DailyPlan;
};

export const savePlan = async (plan: DailyPlan) => {
  const docId = `${plan.userId}_${plan.date}`;
  const ref = doc(db, "dailyPlans", docId);
  await updateDoc(ref, { ...plan });
};

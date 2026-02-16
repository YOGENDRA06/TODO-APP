import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import {
  onAuthStateChanged,
  signInAnonymously,
} from "firebase/auth";
import { auth } from "./src/infrastructure/firebase";
import { getTodayPlan, savePlan } from "./src/infrastructure/dailyPlanRepo";
import { createTask } from "./src/application/createTask";
import { completeTask } from "./src/application/completeTask";
import { DailyPlan } from "./src/domain/dailyPlan";

export default function App() {
  const [plan, setPlan] = useState<DailyPlan | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    signInAnonymously(auth).catch(console.error);

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      try {
        const dailyPlan = await getTodayPlan(user.uid, today);
        setPlan(dailyPlan);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    });

    return unsub;
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red" }}>Error:</Text>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!plan) {
    return (
      <View style={styles.container}>
        <Text>No plan found</Text>
      </View>
    );
  }

  const addTask = async () => {
    if (!text.trim()) return;

    const updated = createTask(plan, text);
    setPlan(updated);
    setText("");
    await savePlan(updated);
  };

  const markDone = async (id: string) => {
    const updated = completeTask(plan, id);
    setPlan(updated);
    await savePlan(updated);
  };

  const completed = plan.tasks.filter((t) => t.isCompleted).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today</Text>
      <Text>
        {completed} / {plan.tasks.length} completed
      </Text>

      <FlatList
        data={plan.tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text
            style={item.isCompleted ? styles.done : styles.todo}
            onPress={() => markDone(item.id)}
          >
            {item.isCompleted ? "✅" : "⬜"} {item.title}
          </Text>
        )}
      />

      <TextInput
        style={styles.input}
        placeholder="Add task"
        value={text}
        onChangeText={setText}
      />
      <Button title="Add Task" onPress={addTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 10,
  },
  todo: {
    fontSize: 16,
    marginVertical: 4,
  },
  done: {
    fontSize: 16,
    marginVertical: 4,
    textDecorationLine: "line-through",
    color: "#888",
  },
});
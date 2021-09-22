import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { ItemWrapper } from "../components/ItemWrapper";
import { EditTaskArgs, Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    const foundTask = tasks.find((task) => task.title === newTaskTitle);

    if (!!foundTask) {
      return Alert.alert("Tarefa já adiconada", "Você já inseriu está tarefa");
    }

    setTasks((oldTasks) => [...oldTasks, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const foundTask = updatedTasks.find((task) => task.id === id);

    if (!foundTask) return;

    foundTask.done = !foundTask.done;

    setTasks(updatedTasks);
    console.log(tasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover Item",
      "Você tem certeza que deseja remove o item selecionado?",
      [
        {
          style: "cancel",
          text: "Não",
        },
        {
          style: "destructive",
          text: "Sim",
          onPress: () => {
            setTasks((oldTasks) => oldTasks.filter((task) => task.id !== id));
          },
        },
      ]
    );
  }

  function handleEditTask({ id, title }: EditTaskArgs) {
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const foundTask = updatedTasks.find((task) => task.id === id);
    if (!foundTask) return;
    foundTask.title = foundTask.title;

    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});

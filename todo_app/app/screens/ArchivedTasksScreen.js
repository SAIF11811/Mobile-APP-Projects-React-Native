import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import TaskItem from "../components/TaskItem";
import { deleteTask, restoreTask } from "../redux/taskSlice";

export default function ArchivedTasksScreen() {
  const dispatch = useDispatch();
  const archivedTasks = useSelector((state) =>
    state.tasks.filter((t) => t.archived)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Archived Tasks</Text>

      <FlatList
        data={archivedTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            item={item}
            onToggle={() => dispatch(restoreTask(item.id))}
            onDelete={() => dispatch(deleteTask(item.id))}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.empty}>No archived tasks yet.</Text>
          </View>
        }
        contentContainerStyle={archivedTasks.length === 0 && { flexGrow: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    alignSelf: "center",
    padding: 15,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
    color: "white",
    borderEndStartRadius: 20,
    borderEndEndRadius: 20,
    backgroundColor: "#FF9500",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
  },
});

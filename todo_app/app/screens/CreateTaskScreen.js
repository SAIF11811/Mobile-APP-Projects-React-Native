import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import TaskItem from "../components/TaskItem";
import {
  addTask,
  archiveTask,
  deleteTask,
  toggleTaskComplete,
} from "../redux/taskSlice";

export default function CreateTaskScreen() {
  const [text, setText] = useState("");
  const [date, setDate] = useState(new Date());
  const [pickerMode, setPickerMode] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const tasks = useSelector((state) =>
    state.tasks.filter((t) => !t.completed && !t.archived)
  );

  const handleAdd = () => {
    if (!text.trim()) {
      Alert.alert("Missing Task", "Please enter a task title.");
      return;
    }

    dispatch(addTask(`${text} (${date.toLocaleString()})`));
    setText("");
    setDate(new Date());
    setShowModal(false);
  };

  const onChangePicker = (event, selectedDate) => {
    if (Platform.OS === "android") setPickerMode(null);

    if (selectedDate) {
      if (pickerMode === "date") {
        const newDate = new Date(selectedDate);
        newDate.setHours(date.getHours());
        newDate.setMinutes(date.getMinutes());
        setDate(newDate);
      } else if (pickerMode === "time") {
        const updatedDate = new Date(date);
        updatedDate.setHours(selectedDate.getHours());
        updatedDate.setMinutes(selectedDate.getMinutes());
        setDate(updatedDate);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Tasks</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            item={item}
            onToggle={() => dispatch(toggleTaskComplete(item.id))}
            onArchive={() => dispatch(archiveTask(item.id))}
            onDelete={() => dispatch(deleteTask(item.id))}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.empty}>No tasks yet. Tap + to add one!</Text>
          </View>
        }
        contentContainerStyle={tasks.length === 0 && { flexGrow: 1 }}
      />

      <TouchableOpacity
        style={styles.addTask}
        onPress={() => setShowModal(true)}
      >
        <Ionicons name="add-sharp" size={40} color="white" />
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, justifyContent: "flex-end" }}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Add New Task</Text>

                <View style={styles.row}>
                  <Ionicons name="create-outline" size={20} color="#007AFF" />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter task title"
                    placeholderTextColor="#ccc"
                    value={text}
                    onChangeText={setText}
                  />
                </View>

                <TouchableOpacity
                  style={styles.row}
                  onPress={() => setPickerMode("date")}
                >
                  <Ionicons name="calendar-outline" size={20} color="#007AFF" />
                  <Text style={styles.dateText}>
                    {date.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.row}
                  onPress={() => setPickerMode("time")}
                >
                  <Ionicons name="time-outline" size={20} color="#007AFF" />
                  <Text style={styles.dateText}>
                    {date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </TouchableOpacity>

                {pickerMode && (
                  <DateTimePicker
                    value={date}
                    mode={pickerMode}
                    display="default"
                    onChange={onChangePicker}
                  />
                )}

                <View style={styles.modalButtons}>
                  <Button
                    title="Cancel"
                    color="#999"
                    onPress={() => setShowModal(false)}
                  />
                  <Button
                    title="Add Task"
                    color="#007AFF"
                    onPress={handleAdd}
                  />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: {
    alignSelf: "center",
    padding: 15,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 15,
    color: "white",
    borderEndStartRadius: 20,
    borderEndEndRadius: 20,
    backgroundColor: "#007AFF",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
  },
  addTask: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#007AFF",
    width: 65,
    height: 65,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
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
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#0000004d",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    marginLeft: 10,
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  dateText: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    marginLeft: 10,
    flex: 1,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

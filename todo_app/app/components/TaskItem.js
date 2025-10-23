import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";

export default function TaskItem({ item, onToggle, onArchive, onDelete }) {
  const isCompleted = item.completed;
  const isArchived = item.archived;

  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.8],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={onDelete} activeOpacity={0.8}>
        <Animated.View style={[styles.deleteBox, { transform: [{ scale }] }]}>
          <Ionicons name="trash-outline" size={26} color="white" />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
      <View
        style={[
          styles.card,
          isArchived && styles.archivedCard,
          isCompleted && styles.completedCard,
        ]}
      >
        <TouchableOpacity onPress={onToggle} style={styles.leftContent}>
          <Ionicons
            name={
              isCompleted
                ? "checkmark-circle"
                : isArchived
                ? "archive"
                : "checkmark-circle"
            }
            size={26}
            color={isCompleted ? "#34C759" : isArchived ? "#FF9500" : "#C7C7CC"}
            style={styles.iconLeft}
          />
          <View>
            <Text
              style={[
                styles.taskText,
                isCompleted && styles.taskTextCompleted,
                isArchived && styles.taskTextArchived,
              ]}
            >
              {item.text}
            </Text>

            {isCompleted && (
              <View style={styles.statusBadge}>
                <Ionicons name="checkmark-done" size={14} color="#34C759" />
                <Text style={[styles.statusText, { color: "#34C759" }]}>
                  Done
                </Text>
              </View>
            )}

            {isArchived && (
              <View style={styles.statusBadge}>
                <Ionicons name="archive" size={14} color="#FF9500" />
                <Text style={[styles.statusText, { color: "#FF9500" }]}>
                  Archived
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        <View style={styles.actions}>
          {!isArchived && !isCompleted && (
            <TouchableOpacity onPress={onArchive} style={styles.actionBtn}>
              <Ionicons name="archive-outline" size={24} color="#FF9500" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconLeft: {
    marginRight: 10,
  },
  taskText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: "#777",
  },
  taskTextArchived: {
    color: "#999",
    fontStyle: "italic",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    marginLeft: 10,
  },
  completedCard: {
    backgroundColor: "#E8FEEA",
  },
  archivedCard: {
    backgroundColor: "#FFF5E6",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  statusText: {
    fontSize: 12,
    marginLeft: 5,
    fontWeight: "600",
  },
  deleteBox: {
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    height: "90%",
    marginVertical: 8,
  },
});

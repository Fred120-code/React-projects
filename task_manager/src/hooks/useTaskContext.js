import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

/**
 * Custom hook to acces the Task content
 *Provided error handling and type safety
 */

// Fixed: The hook did not return the context, and there were typos in the error message.
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

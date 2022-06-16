import { TaskColors } from "./kanban.types";

export interface Task {
  description?: string;
  label?: TaskColors;
}

export interface Board {
  id?: string;
  title?: string;
  priority?: number;
  tasks?: Task[];
}

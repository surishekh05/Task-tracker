import TaskItem from "./TaskItem";

export default function TaskList({ tasks, refresh }) {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} refresh={refresh} />
      ))}
    </div>
  );
}

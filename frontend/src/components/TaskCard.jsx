export default function TaskCard({ task, onEdit, onDelete }) {
  const badgeClass =
    task.status === 'pending'
      ? 'badge-pending'
      : task.status === 'in-progress'
      ? 'badge-in-progress'
      : 'badge-completed';

  const date = new Date(task.createdAt).toLocaleDateString();

  return (
    <div className="task-card">
      <div className="task-card-header">
        <h3>{task.title}</h3>
        <span className={`badge ${badgeClass}`}>{task.status}</span>
      </div>
      {task.description && <p>{task.description}</p>}
      <div className="task-card-footer">
        <span className="task-date">{date}</span>
        <div className="task-actions">
          <button onClick={() => onEdit(task)}>Edit</button>
          <button className="delete-btn" onClick={() => onDelete(task._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

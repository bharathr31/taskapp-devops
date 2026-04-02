import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate('/');
      }
    }
  };

  const handleSave = async (form, id) => {
    try {
      if (id) {
        await updateTask(id, form);
      } else {
        await createTask(form);
      }
      setShowModal(false);
      setEditingTask(null);
      loadTasks();
    } catch (err) {
      alert('Failed to save task');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) {
      alert('Failed to delete task');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filtered = filter === 'all' ? tasks : tasks.filter((t) => t.status === filter);

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    progress: tasks.filter((t) => t.status === 'in-progress').length,
    done: tasks.filter((t) => t.status === 'completed').length,
  };

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'in-progress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <>
      <nav className="navbar">
        <h2>TaskManager</h2>
        <div className="nav-right">
          <span>{user?.name}</span>
          <button className="btn btn-outline" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard">
        <div className="dashboard-header">
          <h1>My Tasks</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingTask(null);
              setShowModal(true);
            }}
          >
            + New Task
          </button>
        </div>

        <div className="task-stats">
          <div className="stat-card">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-card stat-pending">
            <span className="stat-number">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-card stat-progress">
            <span className="stat-number">{stats.progress}</span>
            <span className="stat-label">In Progress</span>
          </div>
          <div className="stat-card stat-done">
            <span className="stat-number">{stats.done}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        <div className="task-filters">
          {filters.map((f) => (
            <button
              key={f.key}
              className={`filter-btn ${filter === f.key ? 'active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="task-list">
          {filtered.length === 0 ? (
            <p className="empty-msg">No tasks found. Create one!</p>
          ) : (
            filtered.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>

      {showModal && (
        <TaskModal
          task={editingTask}
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
          onSave={handleSave}
        />
      )}
    </>
  );
}

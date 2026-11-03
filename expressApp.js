
import express from "express";

const app = express();
const PORT = 4000;

// Middleware: allows Express to read JSON data
app.use(express.json());

// Initial task records
let tasks = [
    {
        id: 1,
        taskName: "Complete HTML Assignment",
        assignedTo: "Rahul",
        status: "Pending",
        priority: "High"
    },
    {
        id: 2,
        taskName: "Learn JavaScript",
        assignedTo: "Amit",
        status: "In Progress",
        priority: "Medium"
    },
    {
        id: 3,
        taskName: "Create Express Server",
        assignedTo: "Priya",
        status: "Completed",
        priority: "Low"
    }
];

// 1. GET: Retrieve all tasks
app.get("/tasks", (req, res) => {
    res.status(200).json(tasks);
});

// 2. GET: Retrieve a task by ID
app.get("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json(task);
});

// 3. POST: Add a new task
app.post("/tasks", (req, res) => {
    const { id, taskName, assignedTo, status, priority } = req.body;

    if (!id || !taskName || !assignedTo || !status || !priority) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    if (tasks.some(t => t.id === Number(id))) {
        return res.status(400).json({
            message: "Task ID already exists"
        });
    }

    const newTask = {
        id: Number(id),
        taskName,
        assignedTo,
        status,
        priority
    };

    tasks.push(newTask);

    res.status(201).json({
        message: "Task created successfully",
        task: newTask
    });
});

// 4. PUT: Update an existing task
app.put("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const { taskName, assignedTo, status, priority } = req.body;

    if (!taskName || !assignedTo || !status || !priority) {
        return res.status(400).json({
            message: "All fields are required for update"
        });
    }

    task.taskName = taskName;
    task.assignedTo = assignedTo;
    task.status = status;
    task.priority = priority;

    res.status(200).json({
        message: "Task updated successfully",
        task: task
    });
});

// 5. DELETE: Delete a task
app.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const deletedTask = tasks.splice(index, 1);

    res.status(200).json({
        message: "Task deleted successfully",
        task: deletedTask[0]
    });
});

// Start Express server
app.listen(PORT, () => {
    console.log(`Express Server running at http://localhost:${PORT}`);
});

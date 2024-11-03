import React, { useState } from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { Button, Typography, TextField, Box } from '@mui/material';
import { usePoints } from '@/app/context/PointsContext';
import styled from "styled-components";

const StyledTextField = styled(TextField)`
    && {
        margin-bottom: 15px;
        width: 100%;
        background-color: #333;
        border-radius: 8px;
    }

    & .MuiOutlinedInput-root {
        color: white;

        & fieldset {
            border-color: #555;
        }
        &:hover fieldset {
            border-color: #888;
        }
        &.Mui-focused fieldset {
            border-color: #ffa83b;
        }
    }
`;

const TaskTimeline = ({ onTaskComplete }) => {
    const { addPoints } = usePoints();
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });

    const handleCompleteTask = (taskId) => {
        if (!completedTasks.includes(taskId)) {
            const updatedCompletedTasks = [...completedTasks, taskId];
            setCompletedTasks(updatedCompletedTasks);
            addPoints(1); // Each task gives 1 point
            onTaskComplete(updatedCompletedTasks); // Notify parent component
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if (newTask.title && newTask.description) {
            const task = {
                id: tasks.length + 1,
                title: newTask.title,
                description: newTask.description,
                date: new Date().toLocaleDateString(),
            };
            setTasks([...tasks, task]);
            setNewTask({ title: '', description: '' }); // Reset form
        }
    };

    return (
        <div>
            <Box component="form" onSubmit={handleAddTask} sx={{ mb: 4 }}>
                <StyledTextField
                    label="Task Name"
                    name="title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    sx={{ backgroundColor: "white" }}
                />
                <StyledTextField
                    label="Description"
                    name="description"
                    value={newTask.description}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    sx={{ backgroundColor: "white" }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Add Task
                </Button>
            </Box>

            <Timeline>
                {tasks.map((task) => (
                    <TimelineItem key={task.id}>
                        <TimelineOppositeContent>
                            <Typography variant="body2" color="textSecondary">
                                {task.date}
                            </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color={completedTasks.includes(task.id) ? "primary" : "grey"} />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent
                            onClick={() => handleCompleteTask(task.id)}
                            sx={{ cursor: "pointer", opacity: completedTasks.includes(task.id) ? 0.5 : 1 }}
                        >
                            <Typography variant="h6">{task.title}</Typography>
                            <Typography variant="body1">{task.description}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </div>
    );
};

export default TaskTimeline;

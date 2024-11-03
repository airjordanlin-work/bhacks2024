import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Typography, TextField, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import styled from 'styled-components';

const StyledDiv = styled.div`
    background-color: black; /* Dark background */
    border-radius: 8px;
    color: white;
    text-align: center;
`;

export default function CustomTimeline() {
    const [tasks, setTasks] = React.useState([
        { content: "Secondary Task", time: "10:00 AM", color: "secondary" },
        { content: "Success Task", time: "12:00 PM", color: "success" },
    ]);

    const [newTask, setNewTask] = React.useState({ content: "", time: "", color: "primary" });

    const handleAddTask = () => {
        if (newTask.content.trim() && newTask.time.trim()) {
            setTasks([...tasks, newTask]);
            setNewTask({ content: "", time: "", color: "primary" });
        }
    };

    return (
        <StyledDiv>
            <Box sx={{ padding: 3 }}>
                <Typography variant="h4" gutterBottom>Add Tasks</Typography>

                <Timeline position="alternate" sx={{ border: "1px solid white", borderRadius: '8px', padding: '10px' }}>
                    {tasks.map((task, index) => (
                        <TimelineItem key={index}>
                            <TimelineSeparator>
                                <TimelineDot color={task.color} />
                                {index < tasks.length - 1 && <TimelineConnector />}
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography variant="body1">{task.content}</Typography>
                                <Typography variant="caption" color="textSecondary">{task.time}</Typography>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </Timeline>

                <Box sx={{ display: 'flex', gap: 2, mt: 2, backgroundColor: '#333', padding: 2, borderRadius: '8px' }}>
                    <TextField
                        label="Task"
                        variant="outlined"
                        value={newTask.content}
                        onChange={(e) => setNewTask({ ...newTask, content: e.target.value })}
                        sx={{
                            flexGrow: 1,
                            height: "auto",
                            backgroundColor: 'white',
                            borderRadius: '4px',
                        }}
                    />
                    <TextField
                        label="Time"
                        variant="outlined"
                        type="time"
                        value={newTask.time}
                        onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                        sx={{
                            width: 150,
                            height: "auto",
                            backgroundColor: 'white',
                            borderRadius: '4px',
                        }}
                    />
                    <FormControl variant="outlined" sx={{ minWidth: 150, backgroundColor: 'white', borderRadius: '4px' }}>
                        <InputLabel>Color</InputLabel>
                        <Select
                            value={newTask.color}
                            onChange={(e) => setNewTask({ ...newTask, color: e.target.value })}
                            label="Color"
                        >
                            <MenuItem value="primary">Primary</MenuItem>
                            <MenuItem value="secondary">Secondary</MenuItem>
                            <MenuItem value="success">Success</MenuItem>
                            <MenuItem value="error">Error</MenuItem>
                            <MenuItem value="info">Info</MenuItem>
                            <MenuItem value="warning">Warning</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        onClick={handleAddTask}
                        sx={{
                            height: "auto",
                            backgroundColor: 'white',
                            color: '#000',
                        }}
                    >
                        Add Task
                    </Button>
                </Box>
            </Box>
        </StyledDiv>
    );
}

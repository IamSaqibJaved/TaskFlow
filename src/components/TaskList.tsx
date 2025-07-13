import { useState } from 'react';
import { 
  Select, 
  MenuItem, 
  Stack, 
  Typography, 
  Box,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Chip,
  Fade,
  Grow,
} from '@mui/material';
import { 
  FilterList, 
  Sort, 
  CheckCircle, 
  RadioButtonUnchecked, 
  Assignment,
  Timeline,
  DragIndicator,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import type { Task } from '../types/Task';
import TaskItem from './TaskItem';



const TaskList = ({
  tasks,
  setTasks,
}: {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) => {
  const theme = useTheme();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('custom'); // Changed default to custom for drag-and-drop

  const filtered = tasks.filter(task => {
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'pending':
        return !task.completed;
      default:
        return true;
    }
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'status':
        return Number(a.completed) - Number(b.completed);
      case 'custom':
      default:
        // Maintain original array order for drag-and-drop
        return tasks.indexOf(a) - tasks.indexOf(b);
    }
  });

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    // If dropped in the same position, do nothing
    if (source.index === destination.index) return;

    // Only allow reordering when filter is 'all' and sort is 'custom'
    if (filter !== 'all' || sortBy !== 'custom') return;

    // Create a new array with reordered tasks
    const newTasks = Array.from(tasks);
    const [reorderedTask] = newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, reorderedTask);

    setTasks(newTasks);
  };

  const handleToggle = (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleEdit = (id: string, title: string, description: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, title, description } : task
      )
    );
  };

  const getTaskStats = () => {
    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.length - completed;
    return { completed, pending, total: tasks.length };
  };

  const stats = getTaskStats();
  const isDragDisabled = filter !== 'all' || sortBy !== 'custom';

  return (
    <Fade in={true} timeout={800}>
      <Stack spacing={3}>
        {/* Stats Card */}
        <Card 
          elevation={0}
          sx={{
            background: 'background.paper',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.palette.divider}`,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: theme.palette.mode === 'light'
                ? '0 8px 25px rgba(0, 0, 0, 0.12)'
                : '0 8px 25px rgba(0, 0, 0, 0.4)',
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Assignment sx={{ 
                mr: 1.5, 
                color: 'primary.main',
                fontSize: '1.5rem',
              }} />
              <Typography variant="h6" sx={{ 
                fontWeight: 600,
                color: 'text.primary',
              }}>
                Task Overview
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip
                icon={<Timeline />}
                label={`${stats.total} Total`}
                sx={{
                  backgroundColor: 'primary.main',
                  color: theme.palette.mode === 'light' ? 'white' : 'common.black',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  '& .MuiChip-icon': {
                    color: 'inherit',
                  },
                }}
              />
              <Chip
                icon={<CheckCircle />}
                label={`${stats.completed} Completed`}
                sx={{
                  backgroundColor: 'success.main',
                  color: theme.palette.mode === 'light' ? 'white' : 'common.black',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  '& .MuiChip-icon': {
                    color: 'inherit',
                  },
                }}
              />
              <Chip
                icon={<RadioButtonUnchecked />}
                label={`${stats.pending} Pending`}
                sx={{
                  backgroundColor: 'warning.main',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  '& .MuiChip-icon': {
                    color: 'inherit',
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Filters and Sort */}
        <Card 
          elevation={0}
          sx={{
            background: 'background.paper',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.palette.divider}`,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: theme.palette.mode === 'light'
                ? '0 8px 25px rgba(0, 0, 0, 0.12)'
                : '0 8px 25px rgba(0, 0, 0, 0.4)',
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}>
              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel sx={{ color: 'text.secondary' }}>Filter</InputLabel>
                <Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  label="Filter"
                  startAdornment={<FilterList sx={{ mr: 1, color: 'text.secondary' }} />}
                  sx={{
                    '& .MuiSelect-select': {
                      color: 'text.primary',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.divider,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <MenuItem value="all">All Tasks</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel sx={{ color: 'text.secondary' }}>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  label="Sort By"
                  startAdornment={<Sort sx={{ mr: 1, color: 'text.secondary' }} />}
                  sx={{
                    '& .MuiSelect-select': {
                      color: 'text.primary',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.divider,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <MenuItem value="custom">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <DragIndicator sx={{ mr: 1, fontSize: '1rem' }} />
                      Custom Order
                    </Box>
                  </MenuItem>
                  <MenuItem value="date">Date Created</MenuItem>
                  <MenuItem value="title">Title</MenuItem>
                  <MenuItem value="status">Status</MenuItem>
                </Select>
              </FormControl>

              <Typography variant="body2" sx={{ 
                color: 'text.secondary',
                fontWeight: 500,
                ml: 'auto',
              }}>
                Showing {sorted.length} of {tasks.length} tasks
              </Typography>
            </Box>

            {isDragDisabled && (
              <Box sx={{ mt: 2 }}>
                <Chip
                  label="💡 Set filter to 'All Tasks' and sort to 'Custom Order' to enable drag & drop"
                  size="small"
                  sx={{
                    backgroundColor: 'info.main',
                    color: 'white',
                    fontSize: '0.75rem',
                  }}
                />
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Task List with Drag and Drop */}
        <Box>
          {sorted.length === 0 ? (
            <Grow in={true} timeout={600}>
              <Card 
                elevation={0}
                sx={{
                  background: 'background.paper',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${theme.palette.divider}`,
                  textAlign: 'center',
                  py: 6,
                }}
              >
                <CardContent>
                  <Assignment sx={{ 
                    fontSize: 64, 
                    color: 'text.secondary', 
                    mb: 2,
                    opacity: 0.5,
                  }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom sx={{
                    fontWeight: 600,
                  }}>
                    {filter === 'all' 
                      ? 'No tasks yet' 
                      : filter === 'completed' 
                      ? 'No completed tasks' 
                      : 'No pending tasks'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{
                    maxWidth: 400,
                    mx: 'auto',
                    lineHeight: 1.6,
                  }}>
                    {filter === 'all' 
                      ? 'Create your first task to get started!' 
                      : `Switch to "All Tasks" to see your ${filter === 'completed' ? 'pending' : 'completed'} items.`}
                  </Typography>
                </CardContent>
              </Card>
            </Grow>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="tasks" isDropDisabled={isDragDisabled}>
                {(provided, snapshot) => (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{
                      backgroundColor: snapshot.isDraggingOver 
                        ? theme.palette.mode === 'light'
                          ? 'rgba(30, 64, 175, 0.06)'
                          : 'rgba(96, 165, 250, 0.12)'
                        : 'transparent',
                      borderRadius: 3,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      padding: snapshot.isDraggingOver ? 2 : 0,
                      border: snapshot.isDraggingOver 
                        ? `2px dashed ${theme.palette.primary.main}40`
                        : '2px dashed transparent',
                      minHeight: snapshot.isDraggingOver ? 120 : 'auto',
                    }}
                  >
                    <Stack spacing={0}>
                      {sorted.map((task, index) => (
                        <Draggable 
                          key={task.id} 
                          draggableId={task.id} 
                          index={index}
                          isDragDisabled={isDragDisabled}
                        >
                          {(provided, snapshot) => (
                            <Box
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              sx={{
                                animation: `fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.08}s both`,
                                transition: snapshot.isDragging 
                                  ? 'none' 
                                  : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                transform: snapshot.isDragging 
                                  ? `${provided.draggableProps.style?.transform} rotate(2deg) scale(1.02)`
                                  : provided.draggableProps.style?.transform,
                                zIndex: snapshot.isDragging ? 1000 : 'auto',
                                willChange: 'transform',
                                backfaceVisibility: 'hidden',
                                perspective: 1000,
                                '@keyframes fadeInUp': {
                                  '0%': {
                                    opacity: 0,
                                    transform: 'translateY(15px) scale(0.98)',
                                  },
                                  '100%': {
                                    opacity: 1,
                                    transform: 'translateY(0) scale(1)',
                                  },
                                },
                              }}
                            >
                              <TaskItem
                                task={task}
                                onToggle={handleToggle}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                                dragHandleProps={provided.dragHandleProps}
                                isDragging={snapshot.isDragging}
                                isDragDisabled={isDragDisabled}
                              />
                            </Box>
                          )}
                        </Draggable>
                      ))}
                    </Stack>
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </Box>
      </Stack>
    </Fade>
  );
};

export default TaskList;
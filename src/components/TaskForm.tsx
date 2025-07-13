import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Stack, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Fade,
  Grow,
  InputAdornment,
} from '@mui/material';
import { Add, Task, Description, TitleRounded } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import type { Task as TaskType } from '../types/Task';

const TaskForm = ({ setTasks }: { setTasks: React.Dispatch<React.SetStateAction<TaskType[]>> }) => {
  const theme = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);

    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));

    const newTask: TaskType = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks(prev => [newTask, ...prev]);
    setTitle('');
    setDescription('');
    setIsSubmitting(false);
  };

  return (
    <Fade in={true} timeout={800}>
      <Card 
        elevation={0}
        sx={{
          mb: 4,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: theme.palette.mode === 'light' 
              ? 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)'
              : 'linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)',
          },
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: 2,
                background: theme.palette.mode === 'light' 
                  ? 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'
                  : 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
                mr: 2,
              }}
            >
              <Task sx={{ color: theme.palette.mode === 'light' ? 'white' : '#0f172a', fontSize: 24 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                Create New Task
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add a new task to your workflow
              </Typography>
            </Box>
          </Box>
          
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                fullWidth
                placeholder="What needs to be done?"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TitleRounded sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&::placeholder': {
                      color: 'text.secondary',
                      opacity: 0.7,
                    },
                  },
                }}
              />
              
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
                fullWidth
                placeholder="Add more details about your task..."
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                      <Description sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    alignItems: 'flex-start',
                    '&::placeholder': {
                      color: 'text.secondary',
                      opacity: 0.7,
                    },
                  },
                }}
              />
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Grow in={true} timeout={1000}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={!title.trim() || isSubmitting}
                    startIcon={<Add />}
                    sx={{
                      flex: 1,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                        transition: 'left 0.5s',
                      },
                      '&:hover::before': {
                        left: '100%',
                      },
                    }}
                  >
                    {isSubmitting ? 'Adding Task...' : 'Add Task'}
                  </Button>
                </Grow>
                
                {(title || description) && (
                  <Grow in={true} timeout={1200}>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => {
                        setTitle('');
                        setDescription('');
                      }}
                      sx={{
                        py: 1.5,
                        px: 3,
                        minWidth: 'auto',
                      }}
                    >
                      Clear
                    </Button>
                  </Grow>
                )}
              </Box>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default TaskForm;
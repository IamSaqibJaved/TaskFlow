import { useEffect, useMemo, useState } from 'react';
import { CssBaseline, Container, Box, Fade } from '@mui/material';
import { createAppTheme } from './theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SplashScreen from './components/SplashScreen';
import type { Task } from './types/Task';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme-mode');
    return (saved as 'light' | 'dark') || 'light';
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      try {
        setTasks(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing tasks from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  if (loading) return <SplashScreen onFinish={() => setLoading(false)} />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Fade in={!loading} timeout={800}>
        <Box sx={{ minHeight: '100vh' }}>
          <Header toggleTheme={toggleTheme} />
          <Box
            sx={{
              minHeight: 'calc(100vh - 64px)',
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d30 100%)'
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              p: 2,
              pt: 4,
            }}
          >
            <Container maxWidth="md" sx={{ py: 4 }}>
              <TaskForm setTasks={setTasks} />
              <TaskList tasks={tasks} setTasks={setTasks} />
            </Container>
          </Box>
        </Box>
      </Fade>
    </ThemeProvider>
  );
}

export default App;


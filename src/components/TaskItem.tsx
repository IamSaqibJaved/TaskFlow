import { 
  Card, 
  CardContent, 
  Checkbox, 
  IconButton, 
  Typography, 
  Box,
  Chip,
  Fade,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Tooltip,
} from '@mui/material';
import { 
  Delete, 
  Edit, 
  CheckCircle, 
  RadioButtonUnchecked,
  AccessTime,
  ExpandMore,
  ExpandLess,
  DragIndicator,
} from '@mui/icons-material';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import type { Task } from '../types/Task';
import type { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';

const TaskItem = ({
  task,
  onToggle,
  onDelete,
  onEdit,
  dragHandleProps,
  isDragging = false,
  isDragDisabled = false,
}: {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
  isDragging?: boolean;
  isDragDisabled?: boolean;
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const handleEdit = () => {
    if (editTitle.trim()) {
      onEdit(task.id, editTitle.trim(), editDescription.trim());
      setEditDialog(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <Fade in={true} timeout={600}>
        <Card 
          elevation={isDragging ? 12 : 0}
          sx={{
            mb: 2,
            background: task.completed 
              ? isDragging 
                ? 'rgba(255, 255, 255, 0.98)'
                : '#ffffff'
              : isDragging
                ? theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.98)'
                  : 'rgba(30, 41, 59, 0.98)'
                : 'background.paper',
            backdropFilter: isDragging ? 'blur(30px)' : 'blur(20px)',
            border: task.completed 
              ? `1px solid ${theme.palette.success.main}40`
              : isDragging
                ? `2px solid ${theme.palette.primary.main}80`
                : `1px solid ${theme.palette.divider}`,
            position: 'relative',
            overflow: 'hidden',
            transition: isDragging 
              ? 'none' 
              : 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isDragging 
              ? 'scale(1.03) rotateZ(1deg)' 
              : 'scale(1) rotateZ(0deg)',
            boxShadow: isDragging 
              ? theme.palette.mode === 'light'
                ? '0 20px 60px rgba(30, 64, 175, 0.3), 0 8px 20px rgba(0, 0, 0, 0.15)'
                : '0 20px 60px rgba(96, 165, 250, 0.3), 0 8px 20px rgba(0, 0, 0, 0.4)'
              : theme.palette.mode === 'light'
                ? '0 4px 12px rgba(30, 41, 59, 0.08)'
                : '0 4px 12px rgba(0, 0, 0, 0.3)',
            willChange: 'transform, box-shadow',
            backfaceVisibility: 'hidden',
            perspective: 1000,
            '&::before': task.completed ? {
              content: '""',
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 4,
              background: theme.palette.mode === 'light'
                ? 'linear-gradient(45deg, #059669 30%, #10b981 90%)'
                : 'linear-gradient(45deg, #4ade80 30%, #22c55e 90%)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            } : {},
            '&::after': isDragging ? {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: theme.palette.mode === 'light'
                ? 'linear-gradient(45deg, rgba(30, 64, 175, 0.05), rgba(124, 45, 146, 0.05))'
                : 'linear-gradient(45deg, rgba(96, 165, 250, 0.1), rgba(167, 139, 250, 0.1))',
              borderRadius: 'inherit',
              pointerEvents: 'none',
            } : {},
            '&:hover': isDragging ? {} : {
              transform: 'translateY(-3px) scale(1.01)',
              boxShadow: theme.palette.mode === 'light'
                ? '0 12px 30px rgba(30, 41, 59, 0.15)'
                : '0 12px 30px rgba(0, 0, 0, 0.5)',
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              {/* Drag Handle */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mr: 1 }}>
                <Tooltip 
                  title={isDragDisabled ? "Set filter to 'All Tasks' and sort to 'Custom Order' to drag" : "Drag to reorder"}
                  placement="top"
                  arrow
                >
                  <Box
                    {...(isDragDisabled ? {} : dragHandleProps)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 28,
                      height: 28,
                      borderRadius: 2,
                      cursor: isDragDisabled ? 'not-allowed' : 'grab',
                      color: isDragDisabled 
                        ? 'text.disabled' 
                        : isDragging
                          ? theme.palette.mode === 'light' ? 'white' : 'common.black'
                          : 'text.secondary',
                      backgroundColor: isDragDisabled 
                        ? 'transparent'
                        : isDragging
                          ? 'primary.main'
                          : 'transparent',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      mr: 1.5,
                      transform: isDragging ? 'scale(1.1)' : 'scale(1)',
                      willChange: 'transform, background-color, color',
                      '&:hover': isDragDisabled ? {} : {
                        backgroundColor: 'primary.main',
                        color: theme.palette.mode === 'light' ? 'white' : 'common.black',
                        transform: 'scale(1.15) rotate(5deg)',
                        boxShadow: theme.palette.mode === 'light'
                          ? '0 4px 12px rgba(30, 64, 175, 0.3)'
                          : '0 4px 12px rgba(96, 165, 250, 0.3)',
                      },
                      '&:active': {
                        cursor: 'grabbing',
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <DragIndicator sx={{ 
                      fontSize: '1.1rem',
                      transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    }} />
                  </Box>
                </Tooltip>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                <Checkbox
                  checked={task.completed}
                  onChange={() => onToggle(task.id)}
                  icon={<RadioButtonUnchecked />}
                  checkedIcon={<CheckCircle />}
                  sx={{
                    mr: 2,
                    mt: -0.5,
                    color: 'primary.main',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&.Mui-checked': {
                      color: 'success.main',
                      transform: 'scale(1.1)',
                    },
                    '& .MuiSvgIcon-root': {
                      fontSize: '1.5rem',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    },
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'light'
                        ? 'rgba(30, 64, 175, 0.06)'
                        : 'rgba(96, 165, 250, 0.12)',
                      transform: 'scale(1.05)',
                      '& .MuiSvgIcon-root': {
                        transform: 'scale(1.1)',
                      },
                    },
                  }}
                />
                
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      textDecoration: task.completed ? 'line-through' : 'none',
                      opacity: task.completed ? 0.7 : 1,
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      color: task.completed ? '#475569' : 'text.primary',
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    {task.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
                    <AccessTime sx={{ fontSize: '0.875rem', mr: 0.5, color: task.completed ? '#64748b' : 'text.secondary' }} />
                    <Typography variant="caption" color={task.completed ? '#64748b' : 'text.secondary'}>
                      {formatDate(task.createdAt)}
                    </Typography>
                    <Chip
                      label={task.completed ? 'Completed' : 'Pending'}
                      size="small"
                      sx={{
                        ml: 1,
                        fontSize: '0.75rem',
                        height: 20,
                        backgroundColor: task.completed ? 'success.main' : 'warning.main',
                        color: task.completed 
                          ? 'white'
                          : 'white',
                        fontWeight: 600,
                        border: 'none',
                      }}
                    />
                  </Box>
                  
                  {task.description && (
                    <Collapse in={expanded} timeout={300}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          mt: 1,
                          color: task.completed ? '#64748b' : 'text.secondary',
                          lineHeight: 1.6,
                          opacity: task.completed ? 0.8 : 1,
                          padding: 1,
                          borderRadius: 1,
                          backgroundColor: task.completed 
                            ? 'rgba(248, 250, 252, 0.8)'
                            : theme.palette.mode === 'light'
                              ? 'rgba(248, 250, 252, 0.8)'
                              : 'rgba(51, 65, 85, 0.5)',
                        }}
                      >
                        {task.description}
                      </Typography>
                    </Collapse>
                  )}
                  
                  {task.description && (
                    <IconButton
                      size="small"
                      onClick={() => setExpanded(!expanded)}
                      sx={{ 
                        mt: 0.5, 
                        p: 0.5,
                        color: task.completed ? '#64748b' : 'text.secondary',
                        '&:hover': {
                          color: 'primary.main',
                          backgroundColor: theme.palette.mode === 'light'
                            ? 'rgba(30, 64, 175, 0.08)'
                            : 'rgba(96, 165, 250, 0.08)',
                        },
                      }}
                    >
                      {expanded ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  )}
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <IconButton
                  onClick={() => setEditDialog(true)}
                  sx={{
                    mr: 1,
                    color: 'primary.main',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: theme.palette.mode === 'light' ? 'white' : 'common.black',
                      transform: 'scale(1.1) rotate(5deg)',
                      boxShadow: theme.palette.mode === 'light'
                        ? '0 4px 12px rgba(30, 64, 175, 0.3)'
                        : '0 4px 12px rgba(96, 165, 250, 0.3)',
                    },
                  }}
                >
                  <Edit />
                </IconButton>
                
                <IconButton
                  onClick={() => onDelete(task.id)}
                  sx={{
                    color: 'error.main',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      backgroundColor: 'error.main',
                      color: 'white',
                      transform: 'scale(1.1) rotate(-5deg)',
                      boxShadow: theme.palette.mode === 'light'
                        ? '0 4px 12px rgba(220, 38, 38, 0.3)'
                        : '0 4px 12px rgba(248, 113, 113, 0.3)',
                    },
                  }}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Fade>

      {/* Edit Dialog */}
      <Dialog
        open={editDialog}
        onClose={() => setEditDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'background.paper',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        <DialogTitle sx={{ 
          fontWeight: 600,
          color: 'text.primary',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}>
          Edit Task
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="Task Title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              fullWidth
              required
              variant="outlined"
            />
            <TextField
              label="Description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              multiline
              rows={3}
              fullWidth
              variant="outlined"
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ 
          p: 3,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}>
          <Button 
            onClick={() => setEditDialog(false)}
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleEdit} 
            variant="contained"
            disabled={!editTitle.trim()}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskItem;
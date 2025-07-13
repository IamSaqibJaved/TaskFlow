import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode: 'light' | 'dark') => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { 
            main: '#1e40af',
            light: '#3b82f6',
            dark: '#1e3a8a',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#7c2d92',
            light: '#a855f7',
            dark: '#581c87',
            contrastText: '#ffffff',
          },
          background: { 
            default: '#f8fafc',
            paper: '#ffffff',
          },
          text: {
            primary: '#1e293b',
            secondary: '#64748b',
          },
          divider: '#e2e8f0',
          success: {
            main: '#059669',
            light: '#10b981',
            dark: '#047857',
          },
          warning: {
            main: '#d97706',
            light: '#f59e0b',
            dark: '#b45309',
          },
          error: {
            main: '#dc2626',
            light: '#ef4444',
            dark: '#b91c1c',
          },
          info: {
            main: '#0284c7',
            light: '#0ea5e9',
            dark: '#0369a1',
          },
        }
      : {
          primary: { 
            main: '#60a5fa',
            light: '#93c5fd',
            dark: '#3b82f6',
            contrastText: '#0f172a',
          },
          secondary: {
            main: '#a78bfa',
            light: '#c4b5fd',
            dark: '#8b5cf6',
            contrastText: '#0f172a',
          },
          background: { 
            default: '#0f172a',
            paper: '#1e293b',
          },
          text: {
            primary: '#f1f5f9',
            secondary: '#cbd5e1',
          },
          divider: '#334155',
          success: {
            main: '#4ade80',
            light: '#86efac',
            dark: '#22c55e',
          },
          warning: {
            main: '#fb923c',
            light: '#fdba74',
            dark: '#f97316',
          },
          error: {
            main: '#f87171',
            light: '#fca5a5',
            dark: '#ef4444',
          },
          info: {
            main: '#22d3ee',
            light: '#67e8f9',
            dark: '#06b6d4',
          },
        }),
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '-0.025em',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
      letterSpacing: '-0.025em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.0125em',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      letterSpacing: '0.0125em',
    },
    button: {
      textTransform: 'none' as const,
      fontWeight: 600,
      letterSpacing: '0.025em',
    },
    caption: {
      fontSize: '0.75rem',
      letterSpacing: '0.025em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: mode === 'light' 
            ? 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
            : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontSize: '0.875rem',
          fontWeight: 600,
          textTransform: 'none' as const,
          boxShadow: mode === 'light' 
            ? '0 4px 12px rgba(30, 64, 175, 0.15)'
            : '0 4px 12px rgba(96, 165, 250, 0.15)',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: mode === 'light' 
              ? '0 8px 25px rgba(30, 64, 175, 0.25)'
              : '0 8px 25px rgba(96, 165, 250, 0.25)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          background: mode === 'light' 
            ? 'linear-gradient(135deg, #1e40af 0%, #7c2d92 100%)'
            : 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
          color: '#ffffff',
          '&:hover': {
            background: mode === 'light'
              ? 'linear-gradient(135deg, #1e3a8a 0%, #581c87 100%)'
              : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          },
          '&:disabled': {
            background: mode === 'light' 
              ? 'rgba(30, 64, 175, 0.5)'
              : 'rgba(96, 165, 250, 0.5)',
            color: 'rgba(255, 255, 255, 0.7)',
          },
        },
        outlined: {
          borderColor: mode === 'light' ? '#1e40af' : '#60a5fa',
          color: mode === 'light' ? '#1e40af' : '#60a5fa',
          '&:hover': {
            borderColor: mode === 'light' ? '#1e3a8a' : '#3b82f6',
            backgroundColor: mode === 'light' 
              ? 'rgba(30, 64, 175, 0.04)'
              : 'rgba(96, 165, 250, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: mode === 'light' 
            ? 'rgba(255, 255, 255, 0.85)'
            : 'rgba(30, 41, 59, 0.95)',
          backdropFilter: 'blur(20px)',
          border: mode === 'light' 
            ? '1px solid rgba(226, 232, 240, 0.8)'
            : '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: mode === 'light' 
            ? '0 8px 32px rgba(30, 41, 59, 0.08)'
            : '0 8px 32px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: mode === 'light'
              ? '0 12px 48px rgba(30, 41, 59, 0.12)'
              : '0 12px 48px rgba(0, 0, 0, 0.4)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: mode === 'light' 
              ? 'rgba(255, 255, 255, 0.9)'
              : 'rgba(51, 65, 85, 0.9)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              backgroundColor: mode === 'light' 
                ? 'rgba(255, 255, 255, 1)'
                : 'rgba(51, 65, 85, 1)',
              transform: 'translateY(-1px)',
            },
            '&:hover fieldset': {
              borderColor: mode === 'light' ? '#1e40af' : '#60a5fa',
            },
            '&.Mui-focused': {
              backgroundColor: mode === 'light' 
                ? 'rgba(255, 255, 255, 1)'
                : 'rgba(51, 65, 85, 1)',
              transform: 'translateY(-1px)',
            },
            '&.Mui-focused fieldset': {
              borderWidth: 2,
              borderColor: mode === 'light' ? '#1e40af' : '#60a5fa',
              boxShadow: mode === 'light' 
                ? '0 0 0 3px rgba(30, 64, 175, 0.1)'
                : '0 0 0 3px rgba(96, 165, 250, 0.1)',
            },
          },
          '& .MuiInputLabel-root': {
            color: mode === 'light' ? '#64748b' : '#cbd5e1',
            '&.Mui-focused': {
              color: mode === 'light' ? '#1e40af' : '#60a5fa',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: mode === 'light' 
            ? 'rgba(255, 255, 255, 0.9)'
            : 'rgba(51, 65, 85, 0.9)',
          '&:hover': {
            backgroundColor: mode === 'light' 
              ? 'rgba(255, 255, 255, 1)'
              : 'rgba(51, 65, 85, 1)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: mode === 'light' 
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(30, 41, 59, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: mode === 'light' 
            ? '0 4px 20px rgba(30, 41, 59, 0.08)'
            : '0 4px 20px rgba(0, 0, 0, 0.3)',
          borderBottom: mode === 'light' 
            ? '1px solid rgba(226, 232, 240, 0.8)'
            : '1px solid rgba(255, 255, 255, 0.05)',
          color: mode === 'light' ? '#1e293b' : '#f1f5f9',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          color: mode === 'light' ? '#1e40af' : '#60a5fa',
          '&:hover': {
            backgroundColor: mode === 'light' 
              ? 'rgba(30, 64, 175, 0.04)'
              : 'rgba(96, 165, 250, 0.08)',
          },
          '&.Mui-checked': {
            color: mode === 'light' ? '#059669' : '#4ade80',
          },
          '& .MuiSvgIcon-root': {
            fontSize: '1.5rem',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: mode === 'light' 
              ? 'rgba(30, 64, 175, 0.08)'
              : 'rgba(96, 165, 250, 0.08)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          fontSize: '0.75rem',
          height: 28,
          '& .MuiChip-icon': {
            fontSize: '1rem',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          background: mode === 'light' 
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(30, 41, 59, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: mode === 'light' 
            ? '0 25px 50px rgba(30, 41, 59, 0.15)'
            : '0 25px 50px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export const createAppTheme = (mode: 'light' | 'dark') => createTheme(getDesignTokens(mode));
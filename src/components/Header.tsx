import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { 
  Brightness4, 
  Brightness7, 
  CheckCircle 
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Header = ({ toggleTheme }: { toggleTheme: () => void }) => {
  const theme = useTheme();

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <CheckCircle 
            sx={{ 
              mr: 1.5, 
              fontSize: '1.75rem',
              color: theme.palette.mode === 'light' 
                ? theme.palette.primary.main 
                : 'rgba(255, 255, 255, 0.9)',
            }} 
          />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              color: theme.palette.mode === 'light' 
                ? theme.palette.text.primary
                : 'white',
              background: theme.palette.mode === 'light' 
                ? 'linear-gradient(45deg, #1e40af 30%, #7c2d92 90%)'
                : 'linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: theme.palette.mode === 'light' 
                ? 'none'
                : '0 2px 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            TaskFlow
          </Typography>
        </Box>
        
        <IconButton 
          color="inherit" 
          onClick={toggleTheme}
          sx={{
            ml: 1,
            backgroundColor: theme.palette.mode === 'light' 
              ? 'rgba(30, 64, 175, 0.1)'
              : 'rgba(255, 255, 255, 0.1)',
            color: theme.palette.mode === 'light' 
              ? theme.palette.primary.main
              : 'white',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'light' 
                ? 'rgba(30, 64, 175, 0.2)'
                : 'rgba(255, 255, 255, 0.2)',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
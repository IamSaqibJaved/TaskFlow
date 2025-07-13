import { Typography, Box, Fade, Grow, keyframes } from '@mui/material';
import { useEffect, useState } from 'react';

const float = keyframes`
  0%, 100% { 
    transform: translateY(0px) scale(1); 
  }
  50% { 
    transform: translateY(-15px) scale(1.02); 
  }
`;

const pulse = keyframes`
  0%, 100% { 
    opacity: 1; 
    transform: scale(1);
  }
  50% { 
    opacity: 0.8; 
    transform: scale(1.05);
  }
`;

const shimmer = keyframes`
  0% { 
    background-position: -200% 0; 
    opacity: 0;
  }
  50% { 
    opacity: 1;
  }
  100% { 
    background-position: 200% 0; 
    opacity: 0;
  }
`;

const slideInFromLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInFromRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const scaleIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.3) rotate(-10deg);
  }
  50% {
    transform: scale(1.1) rotate(5deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
`;

const ripple = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const bounceIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [visible, setVisible] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showDots, setShowDots] = useState(false);

  useEffect(() => {
    const subtitleTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, 1200);

    const dotsTimer = setTimeout(() => {
      setShowDots(true);
    }, 1800);

    const fadeTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onFinish, 800);
    }, 3500);

    return () => {
      clearTimeout(subtitleTimer);
      clearTimeout(dotsTimer);
      clearTimeout(fadeTimer);
    };
  }, [onFinish]);

  return (
    <Fade in={visible} timeout={800}>
      <Box
        sx={{
          height: '100vh',
          background: 'linear-gradient(-45deg, #667eea, #764ba2, #667eea, #764ba2)',
          backgroundSize: '400% 400%',
          animation: `${gradientShift} 8s ease infinite`,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.4) 0%, transparent 50%), 
              radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(118, 75, 162, 0.3) 0%, transparent 50%)
            `,
            animation: `${pulse} 6s ease-in-out infinite`,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '80%',
            height: '80%',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            animation: `${ripple} 4s ease-out infinite`,
          },
        }}
      >
        <Grow in={true} timeout={1500}>
          <Box sx={{ textAlign: 'center', zIndex: 2, position: 'relative' }}>
            {/* Main Logo */}
            
              <Typography 
                variant="h1" 
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                  background: 'linear-gradient(45deg, #ffffff 30%, #f8fafc 50%, #e2e8f0 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: `${float} 4s ease-in-out infinite`,
                  textShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  position: 'relative',
                  letterSpacing: '-0.02em',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                    backgroundSize: '200% 100%',
                    animation: `${shimmer} 3s infinite`,
                    borderRadius: '8px',
                  },
                }}
              >
                TaskFlow
              </Typography>
            
            {/* Animated Subtitle */}
            <Fade in={showSubtitle} timeout={1000}>
              <Box sx={{ overflow: 'hidden', mt: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{
                    fontWeight: 500,
                    fontSize: { xs: '1.1rem', sm: '1.4rem' },
                    opacity: 0.95,
                    letterSpacing: '0.8px',
                    animation: `${slideInFromLeft} 1s ease-out 0.3s both`,
                    position: 'relative',
                    '&::before': {
                      content: '"Organize"',
                      position: 'absolute',
                      left: 0,
                      animation: `${slideInFromLeft} 0.8s ease-out`,
                    },
                    '&::after': {
                      content: '"Achieve"',
                      position: 'absolute',
                      right: 0,
                      animation: `${slideInFromRight} 0.8s ease-out 0.4s both`,
                    },
                  }}
                >
                  <Box component="span" sx={{ 
                    display: 'inline-block',
                    animation: `${slideInFromLeft} 0.8s ease-out`,
                  }}>
                    Organize
                  </Box>
                  <Box component="span" sx={{ 
                    mx: 2,
                    display: 'inline-block',
                    animation: `${scaleIn} 0.6s ease-out 0.2s both`,
                  }}>
                    •
                  </Box>
                  <Box component="span" sx={{ 
                    display: 'inline-block',
                    animation: `${bounceIn} 0.8s ease-out 0.2s both`,
                  }}>
                    Prioritize
                  </Box>
                  <Box component="span" sx={{ 
                    mx: 2,
                    display: 'inline-block',
                    animation: `${scaleIn} 0.6s ease-out 0.4s both`,
                  }}>
                    •
                  </Box>
                  <Box component="span" sx={{ 
                    display: 'inline-block',
                    animation: `${slideInFromRight} 0.8s ease-out 0.4s both`,
                  }}>
                    Achieve
                  </Box>
                </Typography>
              </Box>
            </Fade>

            {/* Enhanced Loading Dots */}
            <Fade in={showDots} timeout={600}>
              <Box
                sx={{
                  mt: 5,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                {[0, 1, 2].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.7))',
                      animation: `${bounceIn} 1s ease-out ${i * 0.2}s both, ${pulse} 2s ease-in-out infinite ${i * 0.4}s`,
                      boxShadow: '0 4px 12px rgba(255, 255, 255, 0.3)',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '120%',
                        height: '120%',
                        border: '2px solid rgba(255, 255, 255, 0.4)',
                        borderRadius: '50%',
                        animation: `${ripple} 2s ease-out infinite ${i * 0.3}s`,
                      },
                    }}
                  />
                ))}
              </Box>
            </Fade>

            
          </Box>
        </Grow>

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              borderRadius: '50%',
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
              animation: `${float} ${3 + i * 0.5}s ease-in-out infinite ${i * 0.3}s`,
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '300%',
                height: '300%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                animation: `${pulse} ${2 + i * 0.3}s ease-in-out infinite`,
              },
            }}
          />
        ))}
      </Box>
    </Fade>
  );
};

export default SplashScreen;
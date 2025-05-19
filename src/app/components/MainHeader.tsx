'use client';
import { Box, Container, Typography } from '@mui/material';

export default function MainHeader() {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '350px',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: '#dadda4',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 0,
                }
            }}
        >
            <Container
                maxWidth="sm"
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    position: 'relative',
                    zIndex: 1,
                    pt: 6
                }}
            >
                <Box
                    sx={{
                        mb: 4
                    }}
                >
                    <Typography variant="h4" component="h2" sx={{fontWeight: '600'}}>alma</Typography>
                </Box>

                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        fontWeight: 600,
                        maxWidth: '800px',
                        fontSize: {
                            xs: '2rem',
                            md: '2.75rem'
                        },
                        lineHeight: 1.2
                    }}
                >
                    Get An Assessment <br /> Of Your Immigration Case
                </Typography>
            </Container>
        </Box>
    );
}

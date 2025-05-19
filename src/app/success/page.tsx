'use client';
import {Box, Button, Container, Typography} from '@mui/material';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import {purple} from '@mui/material/colors';
import Link from 'next/link';

export default function SuccessPage() {
    return (
        <Container
            maxWidth="sm"
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                py: 8
            }}
        >
            <Box sx={{mb: 4}}>
                <InfoTwoToneIcon sx={{color: purple[300], fontSize: 80}}/>
            </Box>

            <Typography variant="h4" component="h1" sx={{mb: 2, fontWeight: '600'}}>
                Thank You!
            </Typography>

            <Typography variant="body1" sx={{mb: 4, fontWeight: '500'}}>
                Your information was submitted to our team of immigration attorneys. Expect an email from
                hello@tryalma.ai.
            </Typography>

            <Button
                component={Link}
                href="/"
                variant="contained"
                size="large"
                sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: 3,
                    textDecoration: 'none'
                }}
            >
                Go Back to HomePage
            </Button>
        </Container>
    );

}

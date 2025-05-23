'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {Box, Button, Typography} from '@mui/material';
import {Suspense} from 'react';


function ErrorContent() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const router = useRouter();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                gap: 2,
            }}
        >
            <Typography variant="h5" color="error">
                Authentication Error
            </Typography>
            <Typography>
                {error === 'CredentialsSignin'
                    ? 'Invalid email or password'
                    : 'An error occurred during sign in'}
            </Typography>
            <Button
                variant="contained"
                onClick={() => router.push('/auth/signin')}
            >
                Try Again
            </Button>
        </Box>
    );
}

export default function ErrorPage() {
    return (
        <Suspense fallback={
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}>
                <Typography>Loading...</Typography>
            </Box>
        }>
            <ErrorContent />
        </Suspense>
    );
}

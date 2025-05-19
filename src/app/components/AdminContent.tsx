"use client";

import {
    Alert,
    Box,
    Chip,
    CircularProgress,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
} from '@mui/material';
import {useState} from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {useLeads} from '../hooks/useLeads';

export default function AdminContent() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const {leads, loading, error, updateLeadStatus} = useLeads();

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleUpdateStatus = async (leadId: string) => {
        try {
            await updateLeadStatus(leadId, 'REACHED_OUT');
        } catch (error) {
            console.error('Error updating lead status:', error);
            // You might want to show an error message to the user here
        }
    };

    if (loading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', p: 3}}>
                <CircularProgress/>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{p: 3}}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{p: 3, width: '100%'}}>
            <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    '& .MuiTable-root': {
                        borderCollapse: 'separate',
                        borderSpacing: 0,
                    }
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{
                                '&:first-of-type': {
                                    borderTopLeftRadius: '8px',
                                }
                            }}>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>Submitted</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell sx={{
                                '&:last-child': {
                                    borderTopRightRadius: '8px',
                                }
                            }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leads
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((lead) => (
                                <TableRow key={lead.id}>
                                    <TableCell>{lead.name}</TableCell>
                                    <TableCell>{lead.email}</TableCell>
                                    <TableCell>{lead.phone || '-'}</TableCell>
                                    <TableCell>{lead.country}</TableCell>
                                    <TableCell>{new Date(lead.submitted).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={lead.status}
                                            color={lead.status === 'PENDING' ? 'default' : 'success'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {lead.status === 'PENDING' && (
                                            <Tooltip title="Mark as Reached Out">
                                                <IconButton
                                                    onClick={() => handleUpdateStatus(lead.id)}
                                                    color="primary"
                                                    size="small"
                                                >
                                                    <CheckCircleOutlineIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={leads.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        borderBottomLeftRadius: '8px',
                        borderBottomRightRadius: '8px'
                    }}
                />
            </TableContainer>
        </Box>
    );
}

import {useEffect, useState} from 'react';
import {Lead} from '../types/lead';

export function useLeads() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const response = await fetch('/api/leads', {
                credentials: 'include'
            });
            if (!response.ok) {
                throw new Error('Failed to fetch leads');
            }
            const data = await response.json();
            setLeads(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const updateLeadStatus = async (leadId: string, status: Lead['status']) => {
        try {
            const response = await fetch(`/api/leads/${leadId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({status}),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to update status');
            }

            // Update the lead status locally
            setLeads(currentLeads =>
                currentLeads.map(lead =>
                    lead.id === leadId ? {...lead, status} : lead
                )
            );

            return true;
        } catch (error) {
            console.error('Error updating lead status:', error);
            throw error;
        }
    };

    return {
        leads,
        loading,
        error,
        refetchLeads: fetchLeads,
        updateLeadStatus
    };
}

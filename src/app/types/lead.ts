export type LeadStatus = 'PENDING' | 'REACHED_OUT';

export interface Lead {
    id: string;
    name: string;
    email: string;
    phone?: string;
    country: string;
    submitted: string;
    status: LeadStatus;
    notes?: string;
}

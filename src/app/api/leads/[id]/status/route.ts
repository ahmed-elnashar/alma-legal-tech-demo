import {NextResponse} from 'next/server';
import {getServerSession} from 'next-auth';
import {authOptions} from "@/app/lib/auth";
import type {LeadStatus} from '@/app/types/lead';

export async function PATCH(
    request: Request,
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401});
        }

        // Get data from request first
        const {status}: { status: LeadStatus } = await request.json();

        // Use dynamic segment value directly from URL instead of params
        const url = new URL(request.url);
        const leadId = url.pathname.split('/').slice(-2)[0];

        // Mock successful update for now
        console.log(`Updating lead ${leadId} status to ${status}`);

        return NextResponse.json({success: true});
    } catch (error) {
        console.error('Error updating lead status:', error);
        return NextResponse.json(
            {error: 'Failed to update lead status'},
            {status: 500}
        );
    }
}

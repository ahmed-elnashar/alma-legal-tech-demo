import {NextResponse} from 'next/server';
import {getServerSession} from 'next-auth';
import {authOptions} from "@/app/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401});
        }

        // Mock data for development
        const mockLeads = [
            {
                id: '1',
                name: 'John Doe',
                email: 'john.doe@example.com',
                phone: '+1234567890',
                country: 'United States',
                submitted: new Date().toISOString(),
                status: 'PENDING'
            },
            {
                id: '2',
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                phone: '+1987654321',
                country: 'Canada',
                submitted: new Date().toISOString(),
                status: 'REACHED_OUT'
            }
        ];

        return NextResponse.json(mockLeads);
    } catch (error) {
        console.error('Error fetching leads:', error);
        return NextResponse.json(
            {error: 'Failed to fetch leads'},
            {status: 500}
        );
    }
}

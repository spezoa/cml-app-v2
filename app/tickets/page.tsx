import Shell from '@/components/Shell';
import TicketsList from '@/components/tickets/TicketsList';

export const dynamic = 'force-dynamic';

export default function TicketsPage() {
  return (
    <Shell title="Tickets">
      <TicketsList />
    </Shell>
  );
}

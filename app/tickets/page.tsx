import { Shell, TicketsList } from '@/components';
import TicketsList from '@/components/tickets/TicketsList';

export const dynamic = 'force-dynamic';

export default function TicketsPage() {
  return (
    <Shell title="Tickets">
      <TicketsList />
    </Shell>
  );
}

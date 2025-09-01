import { Shell, TicketsList } from '@/components';

export const dynamic = 'force-dynamic';

export default function TicketsPage() {
  return (
    <Shell title="Tickets">
      <TicketsList />
    </Shell>
  );
}

# Improvements package (2025-09-01T21:00:16)

Includes 6 areas:
1) Closed permission circuit (API guards)
2) Ticket comments (client React Query + GET API)
3) SLA fields & filters on tickets list
4) Admin RBAC: user role assign API + page
5) Observability: logger util + metrics endpoint
6) Deployment: Node 20 engines + .nvmrc + .env.example

Notes:
- Updated API perms to use singular namespace "ticket.*" to match seed.ts.
- Tickets GET supports filters: status, priority, q (title/code).
- Comments GET added at /api/tickets/[id]/comments.
- New page at /admin/rbac/assign?userId=<id> to toggle user roles.
- Metrics at /api/metrics (requires reports.view).
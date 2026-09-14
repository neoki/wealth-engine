import { pilotConfig } from './pilot-config.mjs';

const required = ['Calendars.ReadWrite', 'Place.Read.All'];
const errors = [];

if (pilotConfig.scope !== 'single-room') errors.push('scope must be single-room');
if (!pilotConfig.room) errors.push('pilot room is required');
if (pilotConfig.safety.writeEnabled !== false) errors.push('dry-run must keep Graph writes disabled');
if (pilotConfig.safety.tenantMutationAllowed !== false) errors.push('dry-run must forbid tenant mutation');
if (pilotConfig.safety.expectedMailboxCount !== 1) errors.push('pilot must be constrained to one mailbox');
for (const permission of required) {
  if (!pilotConfig.graph.permissions.includes(permission)) errors.push(`missing Graph permission: ${permission}`);
}

const plan = {
  phase: 'controlled-pilot-dry-run',
  room: pilotConfig.room,
  graphChecks: [
    'discover the pilot room/place',
    'read free/busy with getSchedule',
    'create one synthetic booking',
    'update the booking',
    'delete the booking'
  ],
  exchangeChecks: [
    'read CalendarProcessing configuration',
    'verify AutoAccept behavior',
    'verify conflicts are rejected',
    'verify recurring meetings follow policy',
    'verify booking-window behavior'
  ],
  requiredGraphPermissions: required,
  accessBoundary: pilotConfig.graph.accessBoundary,
  writesEnabled: false,
  successGate: 'same observable room-booking behavior without EWS for the tested workflow'
};

if (errors.length) {
  console.error(JSON.stringify({ ok: false, errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ ok: true, plan }, null, 2));

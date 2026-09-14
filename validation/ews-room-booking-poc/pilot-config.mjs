export const pilotConfig = {
  scope: 'single-room',
  room: 'room-pilot@example.test',
  graph: {
    mode: 'application',
    permissions: [
      'Calendars.ReadWrite',
      'Place.Read.All'
    ],
    accessBoundary: 'exchange-app-rbac-single-room-scope',
    legacyApplicationAccessPolicy: false
  },
  exchangePolicy: {
    AutomateProcessing: 'AutoAccept',
    AllBookInPolicy: true,
    AllowConflicts: false,
    AllowRecurringMeetings: true,
    BookingWindowInDays: 180
  },
  safety: {
    writeEnabled: false,
    tenantMutationAllowed: false,
    expectedMailboxCount: 1
  }
};

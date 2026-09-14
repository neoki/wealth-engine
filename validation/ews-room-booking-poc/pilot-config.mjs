export const pilotConfig = {
  scope: 'single-room',
  room: 'room-pilot@example.test',
  graph: {
    mode: 'application',
    permissions: [
      'Calendars.ReadWrite',
      'Place.Read.All'
    ],
    accessBoundary: 'restrict-app-to-pilot-mailbox'
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

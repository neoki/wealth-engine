export function ewsToGraphOperation(op, payload) {
  switch (op) {
    case 'GetUserAvailability':
      return { method: 'POST', path: '/me/calendar/getSchedule', body: payload };
    case 'CreateItem':
      return {
        method: 'POST',
        path: `/users/${payload.room}/events`,
        body: payload.event
      };
    case 'UpdateItem':
      return {
        method: 'PATCH',
        path: `/users/${payload.room}/events/${payload.id}`,
        body: payload.patch
      };
    case 'DeleteItem':
      return {
        method: 'DELETE',
        path: `/users/${payload.room}/events/${payload.id}`,
        body: null
      };
    default:
      return { unsupported: true, op };
  }
}

import apiRoot from '../utils/api.config';
import { StackActions } from 'react-navigation';
import { fetchChatrooms } from './chatrooms';

export const ActionTypes = {
  EVENTS_REQUEST_FAILED: 'EVENTS_REQUEST_FAILED',

  EVENTS_REQUEST: 'EVENTS_REQUEST',
  EVENTS_RECEIVED: 'EVENTS_RECEIVED',

  EVENTS_DETAILS_REQUEST: 'EVENTS_DETAILS_REQUEST',
  EVENTS_DETAILS_RECEIVED: 'EVENTS_DETAILS_RECEIVED',

  EVENTS_PARTICIPANTS_REQUEST: 'EVENTS_PARTICIPANTS_REQUEST',
  EVENTS_PARTICIPANTS_RECEIVED: 'EVENTS_PARTICIPANTS_RECEIVED',

  JOIN_EVENT_REQUEST: 'JOIN_EVENT_REQUEST',
  JOIN_EVENT_DONE: 'JOIN_EVENT_DONE',

  LEAVE_EVENT_REQUEST: 'LEAVE_EVENT_REQUEST',
  LEAVE_EVENT_DONE: 'LEAVE_EVENT_DONE',

  CREATE_EVENT: 'CREATE_EVENT',
  EVENT_CREATED: 'EVENT_CREATED',
};

export function requestEvents(type) {
  return {
    type,
  };
}

export function requestCreateEvent() {
  return {
    type: ActionTypes.CREATE_EVENT,
  };
}

export function eventCreated() {
  return {
    type: ActionTypes.EVENT_CREATED,
  };
}

export function eventDetailsFetched(eventDetails) {
  return {
    type: ActionTypes.EVENTS_DETAILS_RECEIVED,
    eventDetails,
  };
}

export function eventParticipantsFetched(eventParticipants) {
  return {
    type: ActionTypes.EVENTS_PARTICIPANTS_RECEIVED,
    eventParticipants,
  };
}

export function failEvents() {
  return {
    type: ActionTypes.EVENTS_REQUEST_FAILED,
  };
}

export function receiveEvents(events) {
  return {
    type: ActionTypes.EVENTS_RECEIVED,
    events,
  };
}

export function fetchEvents() {
  return async (dispatch, getState) => {
    const { events, auth } = getState();

    if (!events.isLoading) {
      dispatch(requestEvents(ActionTypes.EVENTS_REQUEST));
      try {
        const resp = await fetch(`${apiRoot}/events`, {
          method: 'GET',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          headers: { Authorization: `Bearer ${auth.data.token}` },
        });

        if (resp.ok) {
          const data = await resp.json();
          dispatch(receiveEvents(data));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failEvents());
      }
    }
  };
}

export function createEvent(eventForm) {
  return async (dispatch, getState) => {
    const { events, auth, nav } = getState();

    if (!events.isCreatingEvent) {
      dispatch(requestCreateEvent());
      try {
        const resp = await fetch(`${apiRoot}/events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.data.token}`,
          },
          body: JSON.stringify({
            ...eventForm,
          }),
        });

        if (resp.ok) {
          const data = await resp.json();
          dispatch(eventCreated());
          dispatch(fetchEventDetails(data.id));
          dispatch(fetchChatrooms());
          dispatch(
            StackActions.replace({
              key: nav.routes[nav.index].key,
              routeName: 'EventDetails',
              params: {
                userParticipate: true,
                chatroomId: data.chatroomId,
                eventTitle: data.title,
                eventId: data.id,
                eventImage: data.eventImage,
              },
            }),
          );
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failEvents());
      }
    }
  };
}

export function fetchEventDetails(eventId) {
  return async (dispatch, getState) => {
    const { events, auth } = getState();

    if (!events.isLoadingEventDetails) {
      dispatch(requestEvents(ActionTypes.EVENTS_DETAILS_REQUEST));
      try {
        const resp = await fetch(`${apiRoot}/events/${eventId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.data.token}`,
          },
        });

        if (resp.ok) {
          const data = await resp.json();
          dispatch(eventDetailsFetched(data));
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failEvents());
      }
    }
  };
}

export function addUserToEvent(eventId) {
  return async (dispatch, getState) => {
    const { events, auth } = getState();

    if (!events.isAddingUserToEvent) {
      dispatch(requestEvents(ActionTypes.JOIN_EVENT_REQUEST));
      try {
        const resp = await fetch(`${apiRoot}/events/join/${eventId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.data.token}`,
          },
        });

        if (resp.ok) {
          console.log('done');
          dispatch(fetchEvents());
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failEvents());
      }
    }
  };
}

export function removeUserFromEvent(eventId) {
  return async (dispatch, getState) => {
    const { events, auth } = getState();

    if (!events.isRemovingUserFromEvent) {
      dispatch(requestEvents(ActionTypes.LEAVE_EVENT_REQUEST));
      try {
        const resp = await fetch(`${apiRoot}/events/leave/${eventId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.data.token}`,
          },
        });

        if (resp.ok) {
          console.log('done');
        } else {
          throw Error;
        }
      } catch (e) {
        dispatch(failEvents());
      }
    }
  };
}

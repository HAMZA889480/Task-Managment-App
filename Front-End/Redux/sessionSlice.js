const initialStateSession = {
  session: false,
};

// REDUCER FOR USER LOGIN (USER WHO IS NOT CURRENTLY LOGGED IN)
export default function sessionSlice(state = initialStateSession, action) {
  switch (action.type) {
    case "session/editSession":
      return {
        ...state,

        session: action.payload.session,
      };
    default:
      return state;
  }
}

// ACTION CREATOR
export function editSession(session) {
  console.log("session", session);
  return {
    type: "session/editSession",
    payload: {
      session: session,
    },
  };
}

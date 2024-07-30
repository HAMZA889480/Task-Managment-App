const initialStateMenu = {
  isVisible: false,
};

export default function menuListSlice(state = initialStateMenu, action) {
  switch (action.type) {
    case "menuList/editMenu":
      return {
        ...state,

        isVisible: action.payload.isVisible,
      };
    default:
      return state;
  }
}

// ACTION CREATOR
export function editMenu(isVisible) {
  console.log("isVisible", isVisible);
  return {
    type: "menuList/editMenu",
    payload: {
      isVisible: isVisible,
    },
  };
}

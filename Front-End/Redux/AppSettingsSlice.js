const initialAppSettings = {
    theme: 'light',
    fontSize:"medium",
}

export default function AppSettingsSlice(state = initialAppSettings, action) {
    switch (action.type) {
        case "appSettings/editTheme":
            return {
                ...state,
                theme: action.payload ? 'light' : 'dark',
            };
        case "appSettings/editFontSize":
            return {
                ...state,
                fontSize: action.payload.fontSize,
            };
        default:
            return state;
    }
}


export function editTheme(isWhite) {
    
    return {
        type: "appSettings/editTheme",
        payload: isWhite,
       
    };
}

export function editFontSize(fontSize) {
    return {
        type: "appSettings/editFontSize",
        payload: {
            fontSize: fontSize,
        },
    };
}
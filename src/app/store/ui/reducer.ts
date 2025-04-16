import {
    NAVBAR_DARK_VARIANTS,
    NAVBAR_LIGHT_VARIANTS,
    SIDEBAR_DARK_SKINS,
    SIDEBAR_LIGHT_SKINS
} from '@/utils/themes';
import * as Actions from './actions';
import {UiAction} from './actions';
import initialState, {UiState} from './state';

const loadStateFromLocalStorage = (): UiState => {
    const storedState = localStorage.getItem('uiState');
    if (storedState) {
        const parsedState = JSON.parse(storedState);
        // Eğer dark mode değeri varsa, doğru şekilde ayarla
        if (parsedState.darkMode === undefined) {
            parsedState.darkMode = false; // Varsayılan olarak false yapıyoruz
        }
        return parsedState;
    }
    return initialState; // Eğer localStorage'da bir değer yoksa varsayılan başlangıç değerini döndür
};

export function uiReducer(
    state: UiState = loadStateFromLocalStorage(),
    action: UiAction
) {
    switch (action.type) {
        case Actions.TOGGLE_SIDEBAR_MENU:
            const updatedSidebarMenuState = !state.menuSidebarCollapsed;
            localStorage.setItem(
                'uiState',
                JSON.stringify({
                    ...state,
                    menuSidebarCollapsed: updatedSidebarMenuState
                })
            );
            return {
                ...state,
                menuSidebarCollapsed: updatedSidebarMenuState
            };

        case Actions.TOGGLE_CONTROL_SIDEBAR:
            const updatedControlSidebarState = !state.controlSidebarCollapsed;
            localStorage.setItem(
                'uiState',
                JSON.stringify({
                    ...state,
                    controlSidebarCollapsed: updatedControlSidebarState
                })
            );
            return {
                ...state,
                controlSidebarCollapsed: updatedControlSidebarState
            };

        case Actions.TOGGLE_DARK_MODE:
            const newDarkModeState = !state.darkMode;
            let variant = state.darkMode
                ? NAVBAR_LIGHT_VARIANTS[0].value
                : NAVBAR_DARK_VARIANTS[0].value;
            let skin = state.darkMode
                ? SIDEBAR_LIGHT_SKINS[0].value
                : SIDEBAR_DARK_SKINS[0].value;

            localStorage.setItem(
                'uiState',
                JSON.stringify({
                    ...state,
                    darkMode: newDarkModeState,
                    navbarVariant: variant,
                    sidebarSkin: skin
                })
            );

            return {
                ...state,
                darkMode: newDarkModeState,
                navbarVariant: variant,
                sidebarSkin: skin
            };

        case Actions.SET_NAVBAR_VARIANT:
            const updatedNavbarVariant =
                action.payload ||
                (state.darkMode
                    ? NAVBAR_DARK_VARIANTS[0].value
                    : NAVBAR_LIGHT_VARIANTS[0].value);

            localStorage.setItem(
                'uiState',
                JSON.stringify({...state, navbarVariant: updatedNavbarVariant})
            );

            return {
                ...state,
                navbarVariant: updatedNavbarVariant
            };

        case Actions.SET_SIDEBAR_SKIN:
            const updatedSidebarSkin =
                action.payload ||
                (state.darkMode
                    ? SIDEBAR_DARK_SKINS[0].value
                    : SIDEBAR_LIGHT_SKINS[0].value);

            localStorage.setItem(
                'uiState',
                JSON.stringify({...state, sidebarSkin: updatedSidebarSkin})
            );

            return {
                ...state,
                sidebarSkin: updatedSidebarSkin
            };

        case Actions.SET_REFRESH_INTERVAL:
            const newRefreshInterval = action.payload;
            localStorage.setItem(
                'uiState',
                JSON.stringify({...state, refreshInterval: newRefreshInterval})
            );
            return {
                ...state,
                refreshInterval: newRefreshInterval
            };

        case Actions.SET_DARK_MODE:
            const darkModeValue = action.payload;
            const updatedNavbar = darkModeValue
                ? NAVBAR_DARK_VARIANTS[0].value
                : NAVBAR_LIGHT_VARIANTS[0].value;
            const updatedSidebar = darkModeValue
                ? SIDEBAR_DARK_SKINS[0].value
                : SIDEBAR_LIGHT_SKINS[0].value;

            localStorage.setItem(
                'uiState',
                JSON.stringify({
                    ...state,
                    darkMode: darkModeValue,
                    navbarVariant: updatedNavbar,
                    sidebarSkin: updatedSidebar
                })
            );

            return {
                ...state,
                darkMode: darkModeValue,
                navbarVariant: updatedNavbar,
                sidebarSkin: updatedSidebar
            };

        default:
            return state;
    }
}

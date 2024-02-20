import { colors } from "../theme/colors";
import { Status } from "../types/status.type";

export function useButtonSettings(status: Status["name"]) {
    switch (status) {
        case 'busy': 
            return {color: colors.palette.quaternary200, label: "Zajmij"}
        case 'reserved': 
            return {color: colors.palette.quinary200, label: "Zarezerwuj"}
        case 'free': 
            return {color: colors.palette.tertiary200, label: "Zwolnij"}
        default:
            return {color: colors.palette.primary200, label: "Błąd"}
    }
}
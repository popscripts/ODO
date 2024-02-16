import { useUserData } from "../providers/AuthProvider";
import { User } from "../types/auth.type";
import { Classroom } from "../types/classroom.type";

export function useClassModalSettings(classroom: Classroom, userData: User) {
    let settings = {
        taken: {disabled: false},
        reserved: {disabled: false},
        free: {disabled: true}
    }

    console.log("userData: ", userData)
    console.log("classroom: ", classroom)

    if (userData.TakenClassroom !== null) settings.taken.disabled = true
    
    if (classroom.takenBy !== null) settings.taken.disabled = true

    if (userData.ReservedClassroom !== null) settings.reserved.disabled = true

    if (classroom.reservedBy !== null) settings.reserved.disabled = true

    if (userData.TakenClassroom[0].id === classroom.id) settings.free.disabled = false

    if (userData.ReservedClassroom[0].id === classroom.id) settings.free.disabled = false

    return settings
}
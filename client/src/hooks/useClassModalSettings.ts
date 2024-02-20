import { User } from "../types/auth.type";
import { Classroom } from "../types/classroom.type";

export function useClassModalSettings(classroom: Classroom, userData: User) {
    let settings = {
        taken: {disabled: false},
        reserved: {disabled: false},
        free: {disabled: true}
    }

    if (isClassroomTaken(classroom, userData)) settings.taken.disabled = true

    if (isDifferentClassroomTakenByMe(classroom, userData)) settings.taken.disabled = true

    if (isClassroomTakenByMe(classroom, userData)) settings.reserved.disabled = true

    if (isClassroomReserved(classroom, userData)) settings.reserved.disabled = true

    if (isClassroomReserved(classroom, userData)) settings.taken.disabled = true

    if (isDifferentClassroomReservedByMe(classroom, userData)) settings.reserved.disabled = true

    if (isClassroomReservedByMe(classroom, userData) && !isDifferentClassroomTakenByMe(classroom, userData)) settings.taken.disabled = false

    if (isClassroomTakenByMe(classroom, userData)) settings.free.disabled = false

    if (isClassroomReservedByMe(classroom, userData)) settings.free.disabled = false

    if (!isMemeberOfGroup(userData)) settings = {
        taken: {disabled: true},
        reserved: {disabled: true},
        free: {disabled: true}
    }

    return settings
}

function isClassroomTakenByMe(classroom: Classroom, userData: User) {
    return classroom.takenBy?.id === userData.Group?.id
}

function isClassroomTaken(classroom: Classroom, userData: User) {
    return classroom.takenBy !== null
}

function isClassroomReservedByMe(classroom: Classroom, userData: User) {
    return classroom.reservedBy?.id === userData.Group?.id
}

function isClassroomReserved(classroom: Classroom, userData: User) {
    return classroom.reservedBy !== null
}

function isDifferentClassroomTakenByMe(classroom: Classroom, userData: User) {
    return userData?.Group?.Taken !== null
}

function isDifferentClassroomReservedByMe(classroom: Classroom, userData: User) {
    return userData?.Group?.Reserved !== null
}

function isMemeberOfGroup(userData: User) {
    return userData.Group !== null
}
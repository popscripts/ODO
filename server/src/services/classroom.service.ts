import { db } from '../utils/db.server'
import { Classroom, NewClassroom } from '../types/classroom.type'

export const listClassrooms = async (openDayId: number): Promise<Classroom[]> => {
    return db.classroom.findMany({
        where: {
            openDayId
        },
        select: {
            id: true,
            openDayId: true,
            classroom: true,
            title: true,
            description: true,
            managedBy: {
                select: {
                    id: true,
                    username: true
                }
            },
            status: true,
            reservedAt: true,
            reservedBy: {
                select: {
                    id: true,
                    username: true
                }
            },
            takenBy: {
                select: {
                    id: true,
                    username: true
                }
            },
            takenAt: true
        }
    })
}

export const addClassroom = async (
    openDayId: number,
    classroom: string,
    title: string,
    description: string,
    managedById: number | null
) => {
    return db.classroom.create({
        data: {
            openDayId,
            classroom,
            title,
            description,
            managedById
        }
    })
}

export const updateClassroom = async (id: number, updatedClassroom: NewClassroom) => {
    const { classroom, title, description, managedById } = updatedClassroom
    return db.classroom.update({
        where: {
            id
        },
        data: {
            classroom,
            title,
            description,
            managedById
        },
        select: {
            classroom: true,
            title: true,
            description: true,
            managedById: true
        }
    })
}

export const deleteClassroom = async (id: number) => {
    return db.classroom.update({
        where: {
            id
        },
        data: {
            deleted: true
        }
    })
}

export const restoreClassroom = async (id: number) => {
    return db.classroom.update({
        where: {
            id
        },
        data: {
            deleted: false
        }
    })
}

export const doesClassroomExist = async (id: number): Promise<boolean> => {
    const doesExist = await db.classroom.findUnique({
        where: {
            id
        },
        select: {
            id: true
        }
    })
    return !!doesExist
}

export const listFreeClassrooms = async (openDayId: number): Promise<Classroom[]> => {
    return db.classroom.findMany({
        where: {
            openDayId,
            status: {
                status: 'free'
            }
        },
        select: {
            id: true,
            openDayId: true,
            classroom: true,
            title: true,
            description: true,
            managedBy: {
                select: {
                    id: true,
                    username: true,
                    pictureName: true
                }
            },
            status: true,
            reservedAt: true,
            reservedBy: {
                select: {
                    id: true,
                    username: true,
                    pictureName: true
                }
            },
            takenBy: {
                select: {
                    id: true,
                    username: true,
                    pictureName: true
                }
            },
            takenAt: true
        }
    })
}

export const listBusyClassrooms = async (openDayId: number): Promise<Classroom[]> => {
    return db.classroom.findMany({
        where: {
            openDayId,
            status: {
                status: 'busy'
            }
        },
        select: {
            id: true,
            openDayId: true,
            classroom: true,
            title: true,
            description: true,
            managedBy: {
                select: {
                    id: true,
                    username: true,
                    pictureName: true
                }
            },
            status: true,
            reservedAt: true,
            reservedBy: {
                select: {
                    id: true,
                    username: true,
                    pictureName: true
                }
            },
            takenBy: {
                select: {
                    id: true,
                    username: true,
                    pictureName: true
                }
            },
            takenAt: true
        }
    })
}

export const listReservedClassrooms = async (openDayId: number): Promise<Classroom[]> => {
    return db.classroom.findMany({
        where: {
            openDayId,
            status: {
                status: 'reserved'
            }
        },
        select: {
            id: true,
            openDayId: true,
            classroom: true,
            title: true,
            description: true,
            managedBy: {
                select: {
                    id: true,
                    username: true,
                    pictureName: true
                }
            },
            status: true,
            reservedAt: true,
            reservedBy: {
                select: {
                    id: true,
                    username: true,
                    pictureName: true
                }
            },
            takenBy: {
                select: {
                    id: true,
                    username: true,
                    pictureName: true
                }
            },
            takenAt: true
        }
    })
}

export const getClassroom = async (id: number): Promise<Classroom | null> => {
    return db.classroom.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            openDayId: true,
            classroom: true,
            title: true,
            description: true,
            managedBy: {
                select: {
                    id: true,
                    username: true
                }
            },
            status: true,
            reservedAt: true,
            reservedBy: {
                select: {
                    id: true,
                    username: true
                }
            },
            takenBy: {
                select: {
                    id: true,
                    username: true
                }
            },
            takenAt: true
        }
    })
}

export const setFreeStatus = async (id: number) => {
    return db.classroom.update({
        where: {
            id
        },
        data: {
            statusId: 1,
            takenById: null,
            takenAt: null,
            reservedById: null,
            reservedAt: null
        }
    })
}

export const cancelReservation = async (id: number) => {
    return db.classroom.update({
        where: {
            id
        },
        data: {
            reservedById: null,
            reservedAt: null
        }
    })
}

export const setBusyStatus = async (id: number, takenById: number, takenAt: Date) => {
    return db.classroom.update({
        where: {
            id
        },
        data: {
            statusId: 2,
            takenById,
            takenAt
        }
    })
}

export const setReservedStatus = async (id: number, reservedById: number, reservedAt: Date) => {
    return db.classroom.update({
        where: {
            id
        },
        data: {
            statusId: 3,
            reservedById,
            reservedAt
        }
    })
}

export const setReservedStatusWhenBusy = async (id: number, reservedById: number, reservedAt: Date) => {
    return db.classroom.update({
        where: {
            id
        },
        data: {
            reservedById,
            reservedAt
        }
    })
}

export const setBusyClassroomWhenReserved = async (id: number, takenById: number, takenAt: Date) => {
    return db.classroom.update({
        where: {
            id
        },
        data: {
            statusId: 2,
            reservedById: null,
            reservedAt: null,
            takenById,
            takenAt
        }
    })
}

export const setFreeWhenReserved = async (id: number) => {
    return db.classroom.update({
        where: {
            id
        },
        data: {
            statusId: 3,
            takenById: null,
            takenAt: null
        }
    })
}

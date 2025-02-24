import { createContext, useContext, useState } from "react"
import { colors } from "../theme/colors"
import { Classroom } from "../types/classroom.type"
import { Children } from "../types/props.type"
import ClassroomModal from "../containers/ClassroomModal/ClassroomModal"

interface ClassroomModalContextType {
    showModal: Function,
    hideModal: Function
}

const ClassroomModalContext = createContext<ClassroomModalContextType>({
    showModal: () => { },
    hideModal: () => { }
})

export function useClassroomModal() {
    return useContext(ClassroomModalContext)
}

export function ClassroomModalProvider({ children }: Children) {
    const [visible, setVisible] = useState(false)
    const [classroom, setClassroom] = useState<Classroom | null>(null)
    const [color, setColor] = useState<string>(colors.palette.accent100)

    const showModal = (classroom: Classroom, color: string) => {
        setClassroom(classroom)
        setColor(color)
        setVisible(true)
    }

    const hideModal = () => {
        setVisible(false)
    }

    return <ClassroomModalContext.Provider value={{ showModal, hideModal }}>
        {children}
        <ClassroomModal classroom={classroom} visible={visible} color={color} handleVisible={hideModal} />
    </ClassroomModalContext.Provider>
}
import { ReactNode } from 'react'
import { NavigationProp } from '@react-navigation/native'

export type Children = {
    children: ReactNode | ReactNode[]
}

export type Navigation = {
    navigation: NavigationProp<any>
}


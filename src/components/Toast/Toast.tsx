import React from 'react'
import { Platform, Text } from 'react-native'
import { ToastContainer, ToastMessage } from './ToastStyle'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CancelIcon from '../icons/CancelIcon'

interface ToastProps {
    message: string | JSX.Element
}

const Toast = ({ message }: ToastProps): JSX.Element => {
    const text = typeof message === 'string' ? message : ''

    return (
        <ToastContainer bottom={Platform.OS === 'android' ? 60 : 40}>
            <CancelIcon size={20} />
            <ToastMessage>{text}</ToastMessage>
        </ToastContainer>
    )
}

export default Toast

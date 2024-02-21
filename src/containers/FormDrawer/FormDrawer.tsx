import React, { useState } from 'react'
import { BottomArea, ButtonWrapper, Wrapper } from './FormDrawerStyle'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../../components/Button/Button'
import { colors } from '../../theme/colors'
import LoginForm from '../LoginForm/LoginForm'
import RegisterForm from '../RegisterForm/RegisterForm'
import {
    TouchableOpacity,
    UIManager,
    Platform,
    LayoutAnimation
} from 'react-native'
import { Link } from '../../components/commonStyles'
import { useKeyboardHeight } from '../../hooks/useKeyboardHeight'
import SlideFromBottom from '../../components/SlideFromBottom'
import Loading from '../../components/Loading/Loading'

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

function FormDrawer() {
    const keyboardHeight = useKeyboardHeight()
    const { bottom } = useSafeAreaInsets()
    const [formOpened, setFormOpened] = useState('')
    const [loading, setLoading] = useState<boolean>(false)

    function changeForm() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setFormOpened(formOpened === 'login' ? 'register' : 'login')
    }
    return (
        <>
            <Loading show={loading} />
            <SlideFromBottom>
                <Wrapper bottom={!formOpened ? bottom : 0}>
                    {formOpened === 'login' ? (
                        <LoginForm setLoading={setLoading} />
                    ) : (
                        formOpened === 'register' && (
                            <RegisterForm setLoading={setLoading} />
                        )
                    )}
                    {!formOpened ? (
                        <ButtonWrapper>
                            <Button
                                content={'Zaloguj się'}
                                onPress={() => {
                                    LayoutAnimation.configureNext(
                                        LayoutAnimation.Presets.easeInEaseOut
                                    )
                                    setFormOpened('login')
                                }}
                                color={colors.palette.secondary300}
                            />
                            <Button
                                content={'Zarejestruj się'}
                                onPress={() => {
                                    LayoutAnimation.configureNext(
                                        LayoutAnimation.Presets.easeInEaseOut
                                    )
                                    setFormOpened('register')
                                }}
                                color={colors.palette.tertiary300}
                            />
                        </ButtonWrapper>
                    ) : (
                        <TouchableOpacity onPress={changeForm}>
                            <Link>
                                {formOpened === 'login'
                                    ? 'Zarejestruj się'
                                    : 'Zaloguj się'}
                            </Link>
                        </TouchableOpacity>
                    )}
                </Wrapper>
            </SlideFromBottom>
            {formOpened && <BottomArea height={keyboardHeight} />}
        </>
    )
}

export default FormDrawer

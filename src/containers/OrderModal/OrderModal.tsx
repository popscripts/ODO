import { Dimensions, Modal, ScrollView, TouchableOpacity } from 'react-native'
import {
    Background,
    PaddingLeft,
    WidthWrapper,
    Scroll,
    AddButton,
    AddButtonText
} from './OrderModalStyle'
import { useRef, useState } from 'react'
import OrderBox from '../../components/OrderBox/OrderBox'
import { Heading, MediumText, TextDim } from '../../components/commonStyles'
import InputMultiline from '../../components/InputMultiline/InputMultiline'
import { useKeyboardHeight } from '../../hooks/useKeyboardHeight'
import { SafeAreaView } from 'react-native-safe-area-context'
import { usePlaceOrder } from '../../providers/BuffetProvider'
import XIcon from '../../components/icons/XIcon'
import CloseModal from '../../components/CloseModal/CloseModal'

type Props = {
    visible: boolean
    handleVisible: Function
}

function OrderModal({ visible, handleVisible }: Props) {
    const [chValue, setchValue] = useState<string>('')
    const [cValue, setcValue] = useState<string>('')
    const [hValue, sethValue] = useState<string>('')
    const [comment, setComment] = useState<string>('')

    const height = Dimensions.get('screen').height
    const keyboardHeight = useKeyboardHeight()

    const ref = useRef<ScrollView>(null)

    const placeOrder = usePlaceOrder()

    return (
        <Modal
            visible={visible}
            onRequestClose={() => handleVisible()}
            transparent={true}
            animationType="fade"
            presentationStyle="overFullScreen"
            statusBarTranslucent={true}
        >
            <Scroll
                ref={ref}
                onContentSizeChange={() =>
                    ref?.current?.scrollToEnd({ animated: true })
                }
            >
                <Background
                    style={{
                        height: keyboardHeight
                            ? height + keyboardHeight
                            : '100%'
                    }}
                >
                   <CloseModal />
                    <Heading>Złóż zamówienie</Heading>
                    <OrderBox
                        value={chValue}
                        setValue={setchValue}
                        cheese={true}
                        ham={true}
                    />
                    <OrderBox
                        value={cValue}
                        setValue={setcValue}
                        cheese={true}
                    />
                    <OrderBox value={hValue} setValue={sethValue} ham={true} />
                    <WidthWrapper>
                        <MediumText>Podsumowanie:</MediumText>
                        <PaddingLeft>
                            {parseInt(chValue) > 0 && (
                                <MediumText>
                                    • Tost z serem i szynką x{chValue}
                                </MediumText>
                            )}
                            {parseInt(cValue) > 0 && (
                                <MediumText>
                                    • Tost z serem x{cValue}
                                </MediumText>
                            )}
                            {parseInt(hValue) > 0 && (
                                <MediumText>
                                    • Tost z szynką x{hValue}
                                </MediumText>
                            )}
                            {(parseInt(chValue + cValue + hValue) == 0 ||
                                chValue + cValue + hValue == '') && (
                                <TextDim>Brak pozycji</TextDim>
                            )}
                        </PaddingLeft>
                    </WidthWrapper>
                    <WidthWrapper>
                        <MediumText>Dodatkowe uwagi:</MediumText>
                        <InputMultiline value={comment} setValue={setComment} />
                    </WidthWrapper>
                    <AddButton
                        onPress={() => {
                            placeOrder(
                                parseInt(chValue),
                                parseInt(cValue),
                                parseInt(hValue),
                                comment
                            )
                            handleVisible()
                        }}
                    >
                        <AddButtonText>Zamów</AddButtonText>
                    </AddButton>
                </Background>
            </Scroll>
        </Modal>
    )
}

export default OrderModal

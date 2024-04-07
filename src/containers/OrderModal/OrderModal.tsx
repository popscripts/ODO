import { Modal } from "react-native"
import { Background, InputWrapper, OrderWrapper } from "./OrderModalStyle"
import { MediumText } from "../../components/commonStyles"
import InputNumber from "../../components/InputNumber/InputNumber"
import { useState } from "react"
import CheeseIcon from "../../components/icons/CheeseIcon"
import HamIcon from "../../components/icons/HamIcon"

type Props = {
    visible: boolean
    handleVisible: Function
}

function OrderModal({visible, handleVisible}: Props) {
    const [chValue, setchValue] = useState<string>('')
    return (
            <Modal
                visible={visible}
                onRequestClose={() => handleVisible()}
                transparent={true}
                animationType="fade"
                presentationStyle="overFullScreen"
                statusBarTranslucent={true}
            >
                <Background>
                    <OrderWrapper>
                        <MediumText>Tost z serem i szynką</MediumText>
                        <CheeseIcon />
                        <HamIcon />
                        <InputWrapper>
                            <InputNumber value={chValue} setValue={setchValue}/>
                        </InputWrapper>
                    </OrderWrapper>
                </Background>
                </Modal>
    )
}

export default OrderModal
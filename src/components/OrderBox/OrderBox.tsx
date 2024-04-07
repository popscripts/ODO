import { View } from 'react-native'
import { MediumText } from '../commonStyles'
import { IconsWrapper, InputWrapper, OrderWrapper } from './OrderBoxStyle'
import CheeseIcon from '../icons/CheeseIcon'
import HamIcon from '../icons/HamIcon'
import InputNumber from '../InputNumber/InputNumber'

type Props = {
    value: string
    setValue: Function
    ham?: boolean
    cheese?: boolean
}

function OrderBox({ value, setValue, ham, cheese }: Props) {
    return (
        <OrderWrapper>
            <View>
                <MediumText>
                    Tost z{' '}
                    {cheese && ham
                        ? 'serem i szynką'
                        : cheese
                          ? 'serem'
                          : 'szynką'}
                </MediumText>
                <IconsWrapper>
                    {cheese && <CheeseIcon />}
                    {ham && <HamIcon />}
                </IconsWrapper>
            </View>
            <InputWrapper>
                <InputNumber value={value} setValue={setValue} />
            </InputWrapper>
        </OrderWrapper>
    )
}

export default OrderBox

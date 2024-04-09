import XIcon from '../icons/XIcon'
import { XWrapper, Press } from './CloseModalStyle'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
    handleVisible: Function
}

function CloseModal({ handleVisible }: Props) {
    const insets = useSafeAreaInsets()
    return (
        <XWrapper top={insets.top}>
            <Press onPress={() => handleVisible()}>
                <XIcon size={20} />
            </Press>
        </XWrapper>
    )
}

export default CloseModal

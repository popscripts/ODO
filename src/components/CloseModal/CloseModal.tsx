import XIcon from "../icons/XIcon"
import { XWrapper } from "./CloseModalStyle"
import { useSafeAreaInsets } from "react-native-safe-area-context"

function CloseModal() {
    const insets = useSafeAreaInsets()
    return <XWrapper top={insets.top}>
        <XIcon size={20}/>
    </XWrapper>
}

export default CloseModal
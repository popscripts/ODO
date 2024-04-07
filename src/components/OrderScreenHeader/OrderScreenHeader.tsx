import { useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import { AddButton, AddButtonText } from "./OrderScreenHeaderStyle";
import OrderModal from "../../containers/OrderModal/OrderModal";

function OrderScreenHeader() {
    const [visible, setVisible] = useState(false)

    const handleVisible = () => {
        setVisible(prev => !prev)
    }
    return (
        <AddButton onPress={handleVisible}>
            <OrderModal visible={visible} handleVisible={handleVisible} />
            <PlusIcon size={20}/>
            <AddButtonText>Zamów</AddButtonText>
        </AddButton>
    )
}

export default OrderScreenHeader
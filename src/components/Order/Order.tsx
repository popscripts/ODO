import { Order as OrderType, OrderStatus } from '../../types/buffet.type'
import {
    Background,
    IconsWrapper,
    IconWrapper,
    Left,
    Number,
    OrderText,
    Row,
    RowSpaceBetween
} from './OrderStyle'
import { MediumText, SmallText } from '../commonStyles'
import { Alert, View } from 'react-native'
import { colors } from '../../theme/colors'
import { useEffect } from 'react'
import CancelIcon from '../icons/CancelIcon'
import FreeClassroomIcon from '../icons/FreeClassroomIcon'
import { useChangeOrderStatus } from '../../providers/BuffetProvider'

type Props = {
    order: OrderType
}

export enum OrderStatusEnum {
    ordered = 4,
    inProgress = 5,
    done = 6,
    pickedUp = 7,
    cancelled = 8
}

function getDishName(id: number) {
    if (id === 1) return 'Tost z serem'
    if (id === 2) return 'Tost z szynką'
    if (id === 3) return 'Tost z serem i szynką'
}

function getStatusName(name: OrderStatus['name']) {
    switch (name) {
        case 'cancelled':
            return 'Anulowane'
        case 'ordered':
            return 'Zamówione'
        case 'done':
            return 'Gotowe do odbioru'
        case 'pickedUp':
            return 'Odebrane'
        case 'inProgress':
            return 'W realizacji'
    }
}

function getStatusColor(name: OrderStatus['name']) {
    switch (name) {
        case 'cancelled':
            return colors.palette.neutral500
        case 'ordered':
            return colors.palette.tertiary200
        case 'done':
            return colors.palette.primary200
        case 'pickedUp':
            return colors.palette.neutral500
        case 'inProgress':
            return colors.palette.quinary200
    }
}

function Order({ order }: Props) {
    useEffect(() => {
        if (order.status.name == 'done') {
            Alert.alert(
                'Zamówienie nr ' + order.id + ' jest gotowe do odbioru!'
            )
        }
    }, [])

    const changeStatus = useChangeOrderStatus()

    const cancelOrder = () => {
        Alert.alert('', 'Czy na pewno chcesz anulować zamówienie?', [
            {
                text: 'Nie',
                onPress: () => {},
                style: 'default'
            },
            {
                text: 'Tak',
                onPress: () => {
                    changeStatus(order.id, OrderStatusEnum.cancelled)
                },
                style: 'default'
            }
        ])
    }

    const pickUpOrder = () => {
        Alert.alert('', 'Czy na pewno chcesz odebrać zamówienie?', [
            {
                text: 'Nie',
                onPress: () => {},
                style: 'default'
            },
            {
                text: 'Tak',
                onPress: () => {
                    changeStatus(order.id, OrderStatusEnum.pickedUp)
                },
                style: 'default'
            }
        ])
    }
    return (
        <Background
            opacity={
                order.status.name === 'cancelled' ||
                order.status.name === 'pickedUp'
            }
        >
            <Row>
                <Left>
                    <Row>
                        <Number color={getStatusColor(order.status.name)}>
                            {order.id}
                        </Number>
                        <View>
                            {order.OrderPosition.map((position, id) => (
                                <OrderText key={id}>
                                    • {getDishName(position.dish.id)} x
                                    {position.amount}
                                </OrderText>
                            ))}
                        </View>
                    </Row>
                    <RowSpaceBetween>
                        <View>
                            <SmallText>Status: </SmallText>
                            <MediumText
                                style={{
                                    color: getStatusColor(order.status.name)
                                }}
                            >
                                {getStatusName(order.status.name)}
                            </MediumText>
                        </View>
                        <SmallText>
                            {new Date(order.createdAt).toLocaleTimeString(
                                'pl-PL',
                                {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }
                            )}
                        </SmallText>
                    </RowSpaceBetween>
                </Left>
                <IconsWrapper>
                    {order.status.name !== 'cancelled' &&
                        order.status.name !== 'pickedUp' && (
                            <>
                                <IconWrapper onPress={cancelOrder}>
                                    <CancelIcon />
                                </IconWrapper>
                                <IconWrapper onPress={pickUpOrder}>
                                    <FreeClassroomIcon size={33} />
                                </IconWrapper>
                            </>
                        )}
                </IconsWrapper>
            </Row>
        </Background>
    )
}

export default Order

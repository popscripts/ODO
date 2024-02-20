import styled from 'styled-components/native'
import { colors } from '../../theme/colors'
import { typography } from '../../theme/typography'
import { spacing } from '../../theme/spacing'

type ButtonWrapperProps = {
    color: string
}

export const ButtonWrapper = styled.TouchableOpacity<ButtonWrapperProps>`
    background-color: ${(props) => props.color};
    width: 100%;
    border-radius: 20px;
    flex-shrink: 3;
`

type ButtonTextProps = {
    dimText: boolean
}

export const ButtonText = styled.Text<ButtonTextProps>`
    font-family: ${typography.primary.medium};
    color: ${colors.text};
    font-size: ${spacing.md};
    padding: 10px;
    text-align: center;
    opacity: ${props => props.dimText ? 0.5 : 1}
`

export const DisabledButtonWrapper = styled.View<ButtonWrapperProps>`
    background-color: ${(props) => props.color};
    width: 100%;
    border-radius: 20px;
    flex-shrink: 3;
    position: relative;
    z-index: 3;
`

export const BottomDrawer = styled.View`
    background-color: ${colors.background + "66"};
    width: 100%;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    margin-top: -40px;
    padding-top: 30px;
    position: relative;
    z-index: 2;
`

export const BottomDrawerText = styled.Text`
    font-family: ${typography.primary.light};
    color: ${colors.text};
    font-size: ${spacing.md};
`

export const BottomDrawerTimerWrapper = styled.Text`
    transform: scale(1.4);
    position: absolute;
    right: 20px;
    bottom: 10px;
    display: flex;
`

export const MemberView = styled.View`
    display: flex;
    flex-direction: row;
    gap: ${spacing.xxs};
    padding-left: ${spacing.xs};
    padding-bottom: ${spacing.xs};
`
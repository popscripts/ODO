import styled from 'styled-components/native'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'
import { typography } from '../../theme/typography'

type BackgroundProps = {
    opacity: boolean
}

export const Background = styled.View<BackgroundProps>`
    width: 90%;
    margin-left: 5%;
    margin-bottom: ${spacing.md};
    background-color: ${colors.palette.neutral600};
    border-radius: ${spacing.md};
    overflow: hidden;
    gap: ${spacing.md};
    opacity: ${(props) => (props.opacity ? 0.6 : 1)};
    position: relative;
`

type NumberProps = {
    color: string
}

export const Number = styled.Text<NumberProps>`
    background-color: ${(props) => props.color};
    border-bottom-right-radius: ${spacing.md};
    font-family: ${typography.primary.semiBold};
    color: ${colors.text};
    font-size: ${spacing.md};
    margin: -${spacing.sm} 0 0 -${spacing.sm};
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
`

export const OrderText = styled.Text`
    font-family: ${typography.primary.normal};
    font-size: ${spacing.md};
    color: ${colors.text};
`

export const Row = styled.View`
    display: flex;
    flex-direction: row;
    gap: ${spacing.sm};
`

export const RowSpaceBetween = styled.View`
    display: flex;
    flex-direction: row;
    gap: ${spacing.sm};
    justify-content: space-between;
    align-items: flex-end;
`

export const IconsWrapper = styled.View`
    width: 60px;
    background-color: ${colors.palette.neutral500};
    display: flex;
    justify-content: space-around;
    align-items: center;
`

export const Left = styled.View`
    width: 100%;
    flex-shrink: 5;
    padding: ${spacing.sm} 0 ${spacing.sm} ${spacing.sm};
    display: flex;
    justify-content: space-between;
`
export const IconWrapper = styled.TouchableOpacity`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
`

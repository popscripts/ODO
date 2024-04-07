import styled from 'styled-components/native'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'

export const OrderWrapper = styled.View`
    width: 90%;
    background-color: ${colors.palette.neutral500};
    padding: ${spacing.md};
    border-radius: ${spacing.md};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const InputWrapper = styled.View`
    transform: scale(0.6);
    transform-origin: right;
    position: absolute;
    right: ${spacing.md};
`

export const IconsWrapper = styled.View`
    margin-top: ${spacing.sm};
    display: flex;
    flex-direction: row;
    gap: -10px;
`

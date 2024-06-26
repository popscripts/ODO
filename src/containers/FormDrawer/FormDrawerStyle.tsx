import styled from 'styled-components/native'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'

type WrapperProps = {
    bottom: number
}

export const Wrapper = styled.View<WrapperProps>`
    width: 90%;
    padding: ${spacing.md};
    padding-bottom: ${(props) => props.bottom + 36}px;
    background-color: ${colors.palette.overlay85};
    border-radius: 20px;
    margin-left: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${spacing.md};
    bottom: -20px;
`

export const ButtonWrapper = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: ${spacing.md};
`

type BottomAreaProps = {
    height: number
}

export const BottomArea = styled.View<BottomAreaProps>`
    height: ${(props) => (props.height ? props.height + 'px' : '15%')};
    flex-grow: 2;
`

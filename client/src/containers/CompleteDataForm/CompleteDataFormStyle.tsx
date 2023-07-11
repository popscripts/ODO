import styled from 'styled-components/native'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'
import { typography } from '../../theme/typography'

type WrapperProps = {
    bottom: number
    done: boolean
}
export const Wrapper = styled.View<WrapperProps>`
    width: 100%;
    height: ${(props) => (props.done ? '100%' : 'auto')};
    background-color: ${colors.background};
    border-radius: 20px 20px 0 0;
    padding: ${spacing.lg};
    padding-bottom: ${(props) => props.bottom + 20}px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${spacing.md};
    bottom: 0;
`

export const TopText = styled.Text`
    font-family: ${typography.primary.normal};
    font-size: ${spacing.lg};
    color: ${colors.text};
    margin: ${spacing.md};
    text-align: center;
`

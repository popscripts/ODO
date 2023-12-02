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

export const ButtonText = styled.Text`
    font-family: ${typography.primary.medium};
    color: ${colors.text};
    font-size: ${spacing.md};
    padding: 10px;
    text-align: center;
`

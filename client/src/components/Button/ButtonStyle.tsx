import styled from 'styled-components/native'
import { colors } from '../../theme/colors'
import { typography } from '../../theme/typography'
import { spacing } from '../../theme/spacing'

export const ButtonWrapper = styled.TouchableOpacity`
    background-color: ${colors.palette.quinary400};
    width: 100%;
    border-radius: 10px;
    flex-shrink: 3;
`

export const ButtonText = styled.Text`
    font-family: ${typography.primary.medium};
    color: ${colors.text};
    font-size: ${spacing.md};
    margin: ${spacing.sm};
    text-align: center;
`

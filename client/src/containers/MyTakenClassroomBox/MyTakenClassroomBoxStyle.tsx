import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { spacing } from '../../theme/spacing'

export const Wrapper = styled(LinearGradient)`
    width: 90%;
    margin-left: 5%;
    padding: ${spacing.md} ${spacing.md} ${spacing.xl} ${spacing.md};
    border-radius: 20px;
    elevation: 2;
`

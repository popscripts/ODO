import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { spacing } from '../../theme/spacing'

export const Wrapper = styled(LinearGradient)`
    width: 90%;
    margin: 5%;
    padding: ${spacing.sm} ${spacing.md} ${spacing.sm} ${spacing.md};
    border-radius: 20px;
    elevation: 2;
`

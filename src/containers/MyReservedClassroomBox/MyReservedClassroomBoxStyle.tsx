import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { spacing } from '../../theme/spacing'

export const Wrapper = styled(LinearGradient)`
    width: 100%;
    border-radius: 20px;
    elevation: 6;
    overflow: hidden;
    position: relative;
`

export const ContentWrapper = styled.View`
    padding: ${spacing.xxs} ${spacing.xxs} ${spacing.xxs} ${spacing.md};
    position: relative;
`

export const Press = styled.TouchableHighlight`
    border-radius: 20px;
    width: 100%;
`

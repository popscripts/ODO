import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { spacing } from '../../theme/spacing'
import { colors } from '../../theme/colors'

export const Wrapper = styled(LinearGradient)`
    width: 100%;
    max-width: 170px;
    border-radius: 20px;
    elevation: 6;
    overflow: hidden;
`

export const ContentWrapper = styled.View`
    width: 100%;
    padding: ${spacing.sm};
`

export const TimerWrapper = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    padding-top: ${spacing.sm};
`

export const Highlight = styled(LinearGradient)`
    width: 96%;
    height: 20px;
    margin: 2%;
    border-radius: 0 0 20px 20px;
    position: absolute;
    bottom: 0;
`

export const Press = styled.TouchableHighlight`
    border-radius: 20px;
    width: 45%;
    max-width: 170px;
`

export const ReservedCorner = styled.View`
   width: ${spacing.xl};
   height: ${spacing.xl};
   background-color: ${colors.palette.quinary100};
   position: absolute;
   right: 0;
   elevation: 4;
`

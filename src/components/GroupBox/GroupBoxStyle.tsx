import styled from 'styled-components/native'
import { spacing } from '../../theme/spacing'
import { colors } from '../../theme/colors'
import { typography } from '../../theme/typography'

export const Background = styled.View`
    background-color: ${colors.palette.neutral600};
`

export const Wrapper = styled.View`
    width: 90%;
    border-radius: ${spacing.md};
    margin: ${spacing.lg};
    overflow: hidden;
    elevation: 6;
`

export const Left = styled.View`
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: ${spacing.xs};
`

export const Right = styled.View`
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const InsideWrapper = styled.View`
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    padding: ${spacing.xl} ${spacing.md} ${spacing.xl} ${spacing.md};
`

export const Circle = styled.Text`
    width: 60px;
    height: 60px;
    background-color: ${colors.text};
    color: ${colors.background};
    border-radius: 30px;
    text-align: center;
    line-height: 60px;
    font-size: ${spacing.xxl};
    font-family: ${typography.primary.bold};
`

export const Description = styled.View`
    background-color: ${colors.palette.neutral500};
    width: 100%;
    padding: ${spacing.md};
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
`

export const Press = styled.TouchableOpacity`
    padding: ${spacing.xs};
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const PencilPress = styled.TouchableOpacity`
    padding: ${spacing.xs};
`

export const MediumTextShrink = styled.Text`
    font-family: ${typography.primary.normal};
    font-size: ${spacing.nm};
    color: ${colors.text};
    flex-shrink: 5;
`

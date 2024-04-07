import styled from 'styled-components/native'
import { spacing } from '../../theme/spacing'
import { colors } from '../../theme/colors'

export const ContentWrapper = styled.View`
    padding: ${spacing.sm} ${spacing.sm} ${spacing.sm} ${spacing.md};
    position: relative;
    border-radius: 30px;
    width: 100%;
    background-color: ${colors.palette.overlay22};
    border: 10px solid ${colors.background};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const FillerBottom = styled.View`
    height: 20px;
    width: 100%;
    position: absolute;
    bottom: -10px;
    background-color: ${colors.background};
`

export const FillerTop = styled.View`
    height: 20px;
    width: 100%;
    position: absolute;
    top: -10px;
    background-color: ${colors.background};
`

export const FillerRight = styled.View`
    width: 10px;
    height: 100%;
    position: absolute;
    right: 0;
    background-color: ${colors.background};
`

export const FillerLeft = styled.View`
    width: 10px;
    height: 100%;
    position: absolute;
    left: 0;
    background-color: ${colors.background};
`

export const IconWrapper = styled.TouchableOpacity`
    transform: rotate(45deg);
`

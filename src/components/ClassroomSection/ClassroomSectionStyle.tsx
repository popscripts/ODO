import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '../../theme/colors'

export const ClassroomSectionWrapper = styled.View`
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    gap: 15px;
    padding: 15px;
`

export const ClassroomSectionHeader = styled.View`
    width: 100%;
    border-radius: 30px 30px 0 0;
    background-color: ${colors.background};
    margin-top: 20px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Gradient = styled(LinearGradient)`
    width: 100%;
    height: 70px;
    position: absolute;
`

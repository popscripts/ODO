import styled from "styled-components/native";
import { spacing } from "../../theme/spacing";
import { colors } from "../../theme/colors";
import { typography } from "../../theme/typography";

export const Background = styled.ImageBackground`
    
`

export const Wrapper = styled.View`
    width: 90%;
    border-radius:${spacing.md};
    overflow: hidden;
    elevation: 6;
`

export const Left = styled.View`
    width: 60%;
`

export const Right = styled.View`
    width: 40%;
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
    line-height:60px;
    font-size: ${spacing.xxl};
    font-family: ${typography.primary.bold}
`

export const Description = styled.View`
    background-color: rgba(21, 145, 125, 0.8);
    width: 100%;
    padding: ${spacing.md};
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
`

export const Press = styled.TouchableOpacity`
    padding: ${spacing.xs};
    border-radius:20px;
    display: flex;
    justify-content: center;
    align-items: center;
`
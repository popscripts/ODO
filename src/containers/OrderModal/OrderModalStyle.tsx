import styled from 'styled-components/native'
import { colors } from '../../theme/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { spacing } from '../../theme/spacing'
import { typography } from '../../theme/typography'

export const Background = styled.View`
    width: 100%;
    background-color: ${colors.background};
    display: flex;
    align-items: center;
    gap: ${spacing.lg};
    padding-top: ${spacing.xxxl};
`

export const WidthWrapper = styled.View`
    width: 90%;
    gap: ${spacing.xs};
`

export const PaddingLeft = styled.View`
    padding-left: ${spacing.xs};
`

type ScrollType = {
    ref: any
}

export const Scroll = styled.ScrollView<ScrollType>`
    width: 100%;
    background-color: ${colors.background};
`

export const AddButton = styled.TouchableOpacity`
    background-color: ${colors.palette.quinary200};
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 0 40px;
    margin: 20px;
`

export const AddButtonText = styled.Text`
    font-family: ${typography.primary.semiBold};
    color: ${colors.text};
    font-size: ${spacing.lg};
    padding: 10px;
    text-align: center;
`

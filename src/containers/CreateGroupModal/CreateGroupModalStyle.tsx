import { styled } from 'styled-components/native'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'
import { typography } from '../../theme/typography'

export const Background = styled.View`
    width: 90%;
    background-color: ${colors.palette.neutral600};
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: ${spacing.lg};
    gap: ${spacing.sm};
`

export const Backdrop = styled.Pressable`
    width: 100%;
    height: 100%;
    background-color: ${colors.palette.blackoverlay60};
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Title = styled.Text`
    font-family: ${typography.primary.semiBold};
    font-size: ${spacing.lg};
    padding: ${spacing.sm};
    color: ${colors.text};
`

export const AddButton = styled.TouchableOpacity`
    background-color: ${colors.palette.neutral400};
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding-left: 10px;
`

export const AddButtonText = styled.Text`
    font-family: ${typography.primary.medium};
    color: ${colors.text};
    font-size: ${spacing.md};
    padding: 10px;
    text-align: center;
`

export const SubmitButton = styled.TouchableOpacity`
    background-color: ${colors.palette.primary300};
    border-radius: 20px;
    text-align: center;
    margin-top: ${spacing.xxl};
    width: 100%;
`

export const InputDescription = styled.Text`
    width: 100%;
    font-size: ${spacing.md};
    margin-top: ${spacing.sm};
    color: ${colors.text}
`

export const MemberInputWrapper = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 50px;
`

export const CancelButtonWrapper = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: ${colors.palette.quaternary200};
    transform: rotate(45deg);
    display: flex;
    align-items: center;
    justify-content: center;
`
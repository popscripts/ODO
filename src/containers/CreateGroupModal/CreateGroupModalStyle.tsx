import { styled } from 'styled-components/native'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'
import { typography } from '../../theme/typography'

export const Background = styled.Pressable`
    width: 100%;
    background-color: ${colors.palette.overlay50};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${spacing.xxl};
    gap: ${spacing.sm};
`

export const Backdrop = styled.Pressable`
    width: 100%;
    height: 100%;
    background-color: ${colors.palette.blackoverlay80};
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
    flex-shrink: 5;
`

export const LeaveButton = styled.TouchableOpacity`
    background-color: ${colors.palette.quaternary200};
    border-radius: 20px;
    text-align: center;
    margin-top: ${spacing.xxl};
    width: 100%;
    flex-shrink: 5;
`

export const InputDescription = styled.Text`
    width: 100%;
    font-size: ${spacing.md};
    margin-top: ${spacing.sm};
    color: ${colors.text};
`

export const MemberInputWrapper = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 50px;
`

export const MemberInputDrawer = styled.View`
    width: 100%;
    display: flex;
    position: relative;
    z-index: 12;
`

export const MemberInputDrawerWrapper = styled.ScrollView`
    max-height: 160px;
    width: 80%;
    background-color: ${colors.background};
    position: absolute;
    display: flex;
    top: 50px;
    left: 0;
    z-index: 10;
    border-radius: ${spacing.sm};
`

export const MemberWrapper = styled.TouchableOpacity`
    padding: ${spacing.xxs} ${spacing.sm};
`

export const InactiveMemberWrapper = styled.View`
    padding: ${spacing.xxs} ${spacing.sm};
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

export const ButtonsWrapper = styled.View`
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    gap: ${spacing.md};
`

import styled from 'styled-components/native'
import { spacing } from '../../theme/spacing'

export const FormWrapper = styled.KeyboardAvoidingView`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: ${spacing.lg};
`

export const BottomWrapper = styled.View`
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    gap: ${spacing.sm};
    width: 100%;
`

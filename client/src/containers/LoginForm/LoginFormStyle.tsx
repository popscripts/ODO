import styled from 'styled-components/native'
import { spacing } from '../../theme/spacing'

export const FormWrapper = styled.KeyboardAvoidingView`
    display: flex;
    padding-bottom: 20%;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: ${spacing.lg};
`

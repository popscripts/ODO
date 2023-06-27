import styled from 'styled-components/native'
import { spacing } from '../../theme/spacing'

export const FormWrapper = styled.View`
    display: flex;
    height: 100%;
    padding-bottom: 30%;
    width: 90%;
    justify-content: center;
    align-items: center;
    gap: ${spacing.lg};
`

export const Press = styled.Pressable`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

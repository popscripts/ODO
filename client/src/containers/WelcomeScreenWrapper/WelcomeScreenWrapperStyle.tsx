import styled from 'styled-components/native'

type WrapperProps = {
    height: number
}

export const Wrapper = styled.View<WrapperProps>`
    height: ${(props) => props.height}px;
`

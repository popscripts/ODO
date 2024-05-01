import styled from 'styled-components/native'

type Props = {
    size: number
}

export const Picture = styled.Image<Props>`
    height: ${(props) => props.size}px;
    width: ${(props) => props.size}px;
    border-radius: ${(props) => props.size / 2}px;
`

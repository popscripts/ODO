import * as React from "react"
import Svg, { Path } from "react-native-svg"
import styled from "styled-components/native"

type Props = {
    size: number
}

const Icon = styled(Svg)`
    transform: rotate(45deg);
`

function XIcon({size}: Props) {
  return (
    <Icon
      width={size}
      height={size}
      viewBox="0 0 23 23"
    

    >
      <Path
        d="M11.5 1v21M1 11.5h21"
        stroke="#F6F6F6"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Icon>
  )
}

export default XIcon

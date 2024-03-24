import * as React from "react"
import Svg, { Path } from "react-native-svg"

type Props = {
    size: number
}

function MinusIcon({size}: Props) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 23 23"
      fill="none"
    >
      <Path
        d="M1 10.5h21"
        stroke="#F6F6F6"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default MinusIcon

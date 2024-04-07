import * as React from "react"
import Svg, { Path, Rect, Circle } from "react-native-svg"

function CheeseIcon() {
  return (
    <Svg
      width={30*1.58}
      height={30}
      viewBox="0 0 158 100"
      fill="none"
    >
      <Path
        d="M34.523 11.698l54.09 15.535C95.294 29.153 93.908 39 86.955 39H20.619c-5.011 0-7.814-5.78-4.712-9.715l12.248-15.534a6 6 0 016.368-2.053z"
        stroke="#f6f6f6"
        strokeWidth={8}
      />
      <Rect
        x={15}
        y={39}
        width={78}
        height={44}
        rx={8}
        stroke="#f6f6f6"
        strokeWidth={8}
      />
      <Path d="M15 32v22M93 32v22" stroke="#f6f6f6" strokeWidth={8} />
      <Circle cx={32} cy={65} r={4} stroke="#f6f6f6" strokeWidth={8} />
      <Circle cx={73.5} cy={62.5} r={2.5} stroke="#f6f6f6" strokeWidth={5} />
      <Circle cx={52} cy={52} r={2} stroke="#f6f6f6" strokeWidth={4} />
    </Svg>
  )
}

export default CheeseIcon

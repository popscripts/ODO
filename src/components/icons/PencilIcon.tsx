import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PencilIcon() {
  return (
    <Svg
      width={21}
      height={21}
      viewBox="0 0 21 21"
      fill="none"
    >
      <Path
        d="M18.73 7.105l-4.884-4.832L15.455.662C15.895.22 16.436 0 17.078 0s1.183.22 1.623.662l1.608 1.61c.44.442.67.974.69 1.598a2.077 2.077 0 01-.632 1.596l-1.638 1.64zm-1.667 1.698L4.883 21H0v-4.89L12.18 3.912l4.883 4.89z"
        fill="#F6F6F6"
      />
    </Svg>
  )
}

export default PencilIcon

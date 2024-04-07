import * as React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'

function CancelIcon() {
    return (
        <Svg width={30} height={30} viewBox="0 0 100 100" fill="none">
            <Path
                d="M23.398 24.898l50.204 50.204"
                stroke="#f6f6f6"
                strokeWidth={8}
                strokeLinecap="round"
            />
            <Circle cx={49} cy={50} r={36} stroke="#f6f6f6" strokeWidth={8} />
        </Svg>
    )
}

export default CancelIcon

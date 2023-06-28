import * as React from 'react'
import Svg, { SvgProps, Path, Circle } from 'react-native-svg'

type Props = {
    color: string
    size: number
}

const SvgComponent = ({ color, size }: Props) => (
    <Svg width={size} height={size} fill="none" viewBox="0 0 100 100">
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeWidth={8}
            d="M8 50.135C13.108 43.514 22.19 28 50 28M92 50.135C86.892 43.514 77.81 28 50 28M8 50.703c5.108 6.621 14.19 22.135 42 22.135M92 50.703c-5.108 6.621-14.19 22.135-42 22.135"
        />
        <Circle cx={50} cy={50.338} r={15} stroke={color} strokeWidth={8} />
    </Svg>
)
export default SvgComponent

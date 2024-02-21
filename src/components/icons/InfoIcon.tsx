import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

type Props = {
    color: string
}
const SvgComponent = ({ color }: Props) => (
    <Svg width={30} height={30} fill="none" viewBox="0 0 48 90">
        <Circle cx={24} cy={83} r={7} fill={color} />
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeWidth={8}
            d="M4.5 23.5C4.5 20.24 9.896 4 24.093 4S52.487 20.763 37.8 35.664C25.829 47.81 24.093 47.928 24.093 60.5"
        />
    </Svg>
)
export default SvgComponent

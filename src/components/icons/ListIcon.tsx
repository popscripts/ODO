import * as React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'

type Props = {
    color: string
}
const ListIcon = ({ color }: Props) => (
    <Svg width={30} height={30} viewBox={'0 0 92 67'} fill="none">
        <Path
            stroke={color}
            strokeLinecap="round"
            strokeWidth={8}
            d="M32 7h56M32 33h56M32 59h56"
        />
        <Circle cx={7.5} cy={33.5} r={7.5} fill={color} />
        <Circle cx={7.5} cy={59.5} r={7.5} fill={color} />
        <Circle cx={7.5} cy={7.5} r={7.5} fill={color} />
    </Svg>
)
export default ListIcon

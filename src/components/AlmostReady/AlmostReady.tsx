import React from 'react'
import { StretchWrapper } from '../commonStyles'
import { Color, Text } from './AlmostReadyStyle'
import FadeIn from '../FadeIn'

function AlmostReady() {
    return (
        <StretchWrapper>
            <FadeIn>
                <Text>Już prawie</Text>
                <Text>
                    <Color>gotowe...</Color>
                </Text>
            </FadeIn>
        </StretchWrapper>
    )
}

export default AlmostReady

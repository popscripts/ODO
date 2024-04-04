import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper'
import { Scroll } from '../components/commonStyles'
import Footer from '../components/Footer/Footer'
import { useParsedClassrooms } from '../providers/ClassroomProvider'
import MapReserved from '../containers/MapReserved'

function MainScreen() {
    const filters = useParsedClassrooms()
    return (
        <ScreenWrapper>
            <Scroll keyboardShouldPersistTaps="handled">
                <MapReserved filter={filters.visited} />
                <Footer />
            </Scroll>
        </ScreenWrapper>
    )
}

export default MainScreen

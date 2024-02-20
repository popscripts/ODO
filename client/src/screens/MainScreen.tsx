import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper'
import MainHeader from '../containers/MainHeader/MainHeader'
import MapClassrooms from '../containers/MapClassrooms'
import ClassroomSection from '../components/ClassroomSection/ClassroomSection'
import { Scroll } from '../components/commonStyles'
import Footer from '../components/Footer/Footer'
import { useParsedClassrooms } from '../providers/ClassroomProvider'
import SlideFromBottom from '../components/SlideFromBottom'

function MainScreen() {
    const filters = useParsedClassrooms()

    return (
        <ScreenWrapper>
            <Scroll>
                <MainHeader />
                <ClassroomSection title={'Wolne Sale'}>
                    <MapClassrooms status={'free'} filter={filters.free} />
                </ClassroomSection>
                <ClassroomSection title={'Zajęte Sale'}>
                    <MapClassrooms status={'busy'} filter={filters.busy} />
                </ClassroomSection>
                <ClassroomSection title={'Zarezerwowane Sale'}>
                    <MapClassrooms status={'reserved'} filter={filters.reserved} />
                </ClassroomSection>
                <Footer />
            </Scroll>
        </ScreenWrapper>
    )
}

export default MainScreen

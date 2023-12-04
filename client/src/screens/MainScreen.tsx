import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper'
import MainHeader from '../containers/MainHeader/MainHeader'
import MapClassrooms from '../containers/MapClassrooms'
import ClassroomSection from '../components/ClassroomSection/ClassroomSection'
import { Scroll } from '../components/commonStyles'
import Footer from '../components/Footer/Footer'
import { useClassrooms, useParsedClassrooms } from '../providers/ClassroomProvider'
import SlideFromBottom from '../components/SlideFromBottom'

function MainScreen() {
    const classrooms = useClassrooms()
    const filters = useParsedClassrooms()

    return (
        <ScreenWrapper>
            <SlideFromBottom>
            <Scroll>
                <MainHeader />
                <ClassroomSection title={'Wolne Sale'}>
                    <MapClassrooms status={'free'} data={classrooms} filter={filters.free} />
                </ClassroomSection>
                <ClassroomSection title={'Zajęte Sale'}>
                    <MapClassrooms status={'busy'} data={classrooms} filter={filters.busy} />
                </ClassroomSection>
                <ClassroomSection title={'Zarezerwowane Sale'}>
                    <MapClassrooms status={'reserved'} data={classrooms} filter={filters.reserved} />
                </ClassroomSection>
                <Footer />
            </Scroll>
            </SlideFromBottom>
        </ScreenWrapper>
    )
}

export default MainScreen

import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper'
import MainHeader from '../containers/MainHeader/MainHeader'
import { useClassrooms } from '../providers/ClassroomProvider'
import MapClassrooms from '../containers/MapClassrooms'
import ClassroomSection from '../components/ClassroomSection/ClassroomSection'
import { Scroll } from '../components/commonStyles'
import Footer from '../components/Footer/Footer'
import MyTakenClassroomBox from '../containers/MyTakenClassroomBox/MyTakenClassroomBox'
import MyReservedClassroomBox from '../containers/MyReservedClassroomBox/MyReservedClassroomBox'

function MainScreen() {
    const classrooms = useClassrooms()

    return (
        <ScreenWrapper>
            <Scroll>
                <MainHeader />
                <MyTakenClassroomBox classroom={classrooms[0]} />
                <MyReservedClassroomBox classroom={classrooms[1]} />
                <ClassroomSection title={'Wolne Sale'}>
                    <MapClassrooms
                        status={'free'}
                        data={classrooms.filter((classroom) => classroom.status.status === 'free')}
                    />
                </ClassroomSection>
                <ClassroomSection title={'Zajęte Sale'}>
                    <MapClassrooms
                        status={'busy'}
                        data={classrooms.filter((classroom) => classroom.status.status === 'busy')}
                    />
                </ClassroomSection>
                <ClassroomSection title={'Zarezerwowane Sale'}>
                    <MapClassrooms
                        status={'reserved'}
                        data={classrooms.filter((classroom) => classroom.status.status === 'reserved')}
                    />
                </ClassroomSection>
                <Footer />
            </Scroll>
        </ScreenWrapper>
    )
}

export default MainScreen

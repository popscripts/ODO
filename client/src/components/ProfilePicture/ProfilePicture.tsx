import React from 'react'
import { Picture } from './ProfilePictureStyle'
import { getImageSource } from '../../utils/userDataHelper'

type Props = {
    url: string | null
    size: number
}
function ProfilePicture({ url, size }: Props) {
    return <Picture source={getImageSource(url)} size={size} resizeMode={'cover'} />
}

export default ProfilePicture

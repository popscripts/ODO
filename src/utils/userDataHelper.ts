import { API_URL, API_VERSION } from '../config'

export function getImageSource(url: string | null) {
    return url
        ? { uri: `${API_URL}/${API_VERSION}/` + 'api/auth/picture/' + url }
        : require('../../assets/profile-picture.png')
}

export function translateAccountType(accountType: {
    id: number
    name: string
}) {
    switch (accountType?.name) {
        case 'user':
            return 'Oprowadzający'
        case 'admin':
            return 'Administrator'
        case 'cook':
            return 'Kucharz'
        default:
            return 'Nieznana rola'
    }
}

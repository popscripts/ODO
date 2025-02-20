export function getImageSource(url: string | null) {
    const API_URL = process.env.EXPO_PUBLIC_API_URL
    const API_VERSION = process.env.EXPO_PUBLIC_API_VERSION

    return url
        ? { uri: `${API_URL}/${API_VERSION}` + 'api/auth/picture/' + url }
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

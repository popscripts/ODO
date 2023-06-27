const palette = {
    neutral100: '#FFFFFF',
    neutral200: '#F6F6F6',
    neutral300: '#878794',
    neutral400: '#505063',
    neutral500: '#46465A',
    neutral600: '#3A3A4B',
    neutral700: '#303041',
    neutral800: '#18181F',
    neutral900: '#000000',

    primary100: '#ABEFDF',
    primary200: '#40DD88',
    primary300: '#2BD479',

    secondary100: '#DDA4FF',
    secondary200: '#C466FD',
    secondary300: '#A748E1',

    tertiary200: '#54CBFE',
    tertiary300: '#0EA4E5',

    quaternary100: '#FFA8A8',
    quaternary200: '#FF7878',
    quaternary300: '#FF4C4C',

    quinary100: '#FFD076',
    quinary200: '#FDC968',
    quinary300: '#EBA02E',
    quinary400: '#E5AD42',

    accent100: '#FFDC23',

    angry100: '#bd001c22',
    angry500: '#bd001c',

    overlay22: '#00000022',
    overlay50: 'rgba(25, 16, 21, 0.5)'
} as const

export const colors = {
    palette,
    transparent: 'rgba(0, 0, 0, 0)',

    text: palette.neutral200,

    textDim: palette.neutral300,

    background: palette.neutral600,

    border: palette.neutral400,

    tint: palette.primary300,

    separator: palette.neutral300,

    error: palette.angry500,

    errorBackground: palette.angry100
}

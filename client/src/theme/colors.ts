const palette = {
    neutral100: '#FFFFFF',
    neutral200: '#F6F6F6',
    neutral300: '#878794',
    neutral400: '#505063',
    neutral500: '#46465A',
    neutral600: '#48445c',
    neutral700: '#303041',
    neutral800: '#18181F',
    neutral900: '#000000',

    primary100: '#ABEFDF',
    primary200: '#2ad375',
    primary300: '#099848',

    secondary100: '#DDA4FF',
    secondary200: '#9e43d3',
    secondary300: '#7723ad',

    tertiary200: '#28a6dc',
    tertiary300: '#0076a8',

    quaternary100: '#ef5c5c',
    quaternary200: '#d33a3a',
    quaternary300: '#b71818',

    quinary100: '#ecb146',
    quinary200: '#e08b0c',
    quinary300: '#9d5e00',
    quinary400: '#E5AD42',

    accent100: '#FFDC23',

    angry100: '#bd001c22',
    angry500: '#bd001c',

    overlay22: '#00000022',
    overlay50: 'rgba(48,48,65, 0.5)',
    overlay85: 'rgba(48,48,65, 0.85)',
    blackoverlay60: 'rgba(0,0,0, 0.60)'
} as const

export const colors = {
    palette,

    transparent: 'rgba(0, 0, 0, 0)',

    text: palette.neutral200,

    textDim: palette.neutral300,

    background: palette.neutral700,

    border: palette.neutral400,

    tint: palette.primary300,

    separator: palette.neutral300,

    error: palette.angry500,

    errorBackground: palette.angry100
}

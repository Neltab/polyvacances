export const COLORS = {
  tags: {
    'TRANSPORT': {
      background: '#FFABAB',
      border: '#FF5757',
    },
    'LOGISTIQUE': {
      background: '#FFEAAB',
      border: '#FFD557',
    },
    'NATURE': {
      background: '#D5FFAB',
      border: '#ABFF57',
    },
    'MONUMENT': {
      background: '#ABC0FF',
      border: '#5781FF',
    },
    'VILLE': {
      background: '#ABFFFF',
      border: '#57FFFF',
    },
    'VILLAGE': {
      background: '#ABFFC0',
      border: '#57FF81',
    },
    'ACTIVITE': {
      background: '#FFABEA',
      border: '#FF57D5',
    },
    'RESTAURANT': {
      background: '#D5ABFF',
      border: '#AB57FF',
    },
  }

} as const;

export const GRADIENT_STYLE = {
  background: 'linear-gradient(90deg, #A478E8 0%, #516CF7 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
} as const;

export const UPLOAD_PATH = "public/uploads";
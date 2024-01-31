import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    robotoMono: `'Roboto Mono', sans-serif`,
  },
  colors: {
    warning: 'red.500'
  },
})

export default theme
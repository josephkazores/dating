import React from 'react'
import { ReduxProvider, ThemeProvider } from '../provider'
import { StackNavigation } from './nav'

const App = () => {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <StackNavigation />
      </ThemeProvider>
    </ReduxProvider>
  )
}

export default App

import React, { createContext, useContext } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider, Portal } from 'react-native-paper'
import { DarkTheme, DefaultTheme } from '../constants'
import { useAsyncStorage } from '../hooks'

declare type ThemeContextTypes = {
  theme?: typeof DarkTheme
  darkMode?: boolean
  toggleDarkMode?: () => any
}

const ThemeContext = createContext<ThemeContextTypes>({})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FC = ({ children }) => {
  const [darkMode, setDarkMode] = useAsyncStorage('darkMode', false)

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const theme = darkMode ? DarkTheme : DefaultTheme

  return (
    <PaperProvider theme={theme}>
      <Portal>
        <NavigationContainer theme={theme}>
          <ThemeContext.Provider
            value={{
              darkMode,
              toggleDarkMode,
              theme,
            }}>
            <StatusBar
              backgroundColor={theme.colors.background}
              barStyle={theme.dark ? 'light-content' : 'dark-content'}
            />
            {children}
          </ThemeContext.Provider>
        </NavigationContainer>
      </Portal>
    </PaperProvider>
  )
}

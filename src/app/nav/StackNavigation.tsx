import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

//routes
import { stack } from '../routes'

//types
import { Screens } from '../types'

// import mainStack from 'Connect/app/constants/routes/mainStack'
// import authStack from 'Connect/app/constants/routes/authStack'
// import { useAuth } from '../contexts/AuthProvider'
// import AuthLoader from '../screens/AuthLoader'

const Stack = createStackNavigator()

export const StackNavigation = () => {
  //   const [authLoader, setAuthLoader] = useState(true)
  //   const [stack, setStack] = useState<Screens>([])
  //   const [initialRouteName, setInitialRouteName] = useState('')
  //   const [loading, setLoading] = useState(true)

  //   const { loggedIn, loggedInFromStorage } = useAuth()

  //   useEffect(() => {
  //     if (loggedInFromStorage) {
  //       setStack(loggedIn ? mainStack : authStack)
  //       setInitialRouteName(loggedIn ? 'Home' : 'SignIn')
  //     }
  //   }, [loggedIn, loggedInFromStorage])

  //   useEffect(() => {
  //     if (stack.length !== 0 && initialRouteName) setAuthLoader(false)
  //   }, [authLoader, initialRouteName])

  //   useEffect(() => {
  //     if (stack.length !== 0) {
  //       setTimeout(() => {
  //         setLoading()
  //       }, 1000)
  //     }
  //   }, [stack])

  //   if (loading) {
  //     return <AuthLoader />
  //   }

  return (
    <Stack.Navigator initialRouteName={'Home'}>
      {stack.map(({ name, options, ...rest }) => (
        <Stack.Screen
          key={name}
          name={name}
          options={{
            headerShown: false,
            ...options,
          }}
          {...rest}
        />
      ))}
    </Stack.Navigator>
  )
}

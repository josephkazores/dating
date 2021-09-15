import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { useTheme } from '../../provider'
import { homeTab } from '../routes'
import { BottomTabs } from '../../components'

const Tab = createBottomTabNavigator()

export const TabNavigation = () => {
  const { theme } = useTheme()
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <BottomTabs {...props} />}
      screenOptions={{
        tabBarActiveBackgroundColor: theme?.colors.background,
        tabBarInactiveBackgroundColor: theme?.colors.background,
      }}>
      {homeTab.map(({ name, options, ...rest }) => (
        <Tab.Screen
          key={name}
          name={name}
          options={{
            headerShown: false,
            ...options,
          }}
          {...rest}
        />
      ))}
    </Tab.Navigator>
  )
}

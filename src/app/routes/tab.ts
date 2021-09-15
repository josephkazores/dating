import { UserProfile, Suggestions } from '../../screens'
import { Screens } from '../types'

export const homeTab: Screens = [
  {
    name: 'Suggestions',
    component: Suggestions,
  },
  {
    name: 'User Profile',
    component: UserProfile,
  },
]

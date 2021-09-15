import { UserProfile, Suggestions, Likes, Matches } from '../../screens'
import { Screens } from '../types'

export const homeTab: Screens = [
  {
    name: 'Suggestions',
    component: Suggestions,
    options: {
      icon: {
        name: 'cards',
        type: 'material-community',
        size: 30,
      },
    },
  },
  {
    name: 'Likes',
    component: Likes,
    options: {
      icon: {
        name: 'heart',
        type: 'material-community',
        size: 30,
      },
    },
  },
  {
    name: 'Matches',
    component: Matches,
    options: {
      icon: {
        name: 'md-chatbubbles-sharp',
        type: 'ionicon',
        size: 30,
      },
    },
  },
  {
    name: 'Profile',
    component: UserProfile,
    options: {
      icon: {
        name: 'ios-person',
        type: 'ionicon',
        size: 30,
      },
    },
  },
]

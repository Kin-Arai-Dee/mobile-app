import Home from '../screens/Home'
import Random from '../screens/Random'
import Target from '../screens/Target'
import Profile from '../screens/Profile'

interface NavigationItem {
  name: string
  component: React.FC
  icon: 'home' | 'restaurant' | 'pie-chart' | 'person'
}

export const navigationItems: NavigationItem[] = [
  {
    name: 'Home',
    component: Home,
    icon: 'home',
  },
  {
    name: 'Random',
    component: Random,
    icon: 'restaurant',
  },
  {
    name: 'Target',
    component: Target,
    icon: 'pie-chart',
  },
  {
    name: 'Profile',
    component: Profile,
    icon: 'person',
  },
]

import Home from 'screens/Home'
import Random from 'screens/Random'
import Target from 'screens/Target'
import Profile from 'screens/Profile'
import Login from 'screens/Login'

interface NavigationItem {
  name: string
  component: React.FC
  icon: 'home' | 'restaurant' | 'pie-chart' | 'person' | 'time'
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
    icon: 'time',
  },
  {
    name: 'Profile',
    component: Profile,
    icon: 'person',
  },
  {
    name: 'Login',
    component: Login,
    icon: 'person',
  },
]

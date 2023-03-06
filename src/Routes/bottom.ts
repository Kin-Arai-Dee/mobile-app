import TopFood from 'screens/TopFood'
import Random from 'screens/Random'
import HistoryFood from 'screens/HistoryFood'
import Profile from 'screens/Profile'

import { FC } from 'react'
import FoodHome from 'screens/FoodHome'

interface NavigationItem {
  name: string
  title: string
  label: string
  component: FC<any>
  icon: 'restaurant' | 'person' | 'trophy' | 'fast-food'
}

export const navigationItems: NavigationItem[] = [
  {
    name: 'Home',
    title: 'ปัดการ์ดอาหาร',
    label: 'ปัดอาหาร',
    component: FoodHome,
    icon: 'restaurant',
  },
  {
    name: 'Random',
    title: 'กินอะไรดี',
    label: 'ทำนาย',
    component: Random,
    icon: 'fast-food',
  },
  {
    name: 'Trophy',
    title: 'อาหารยอดนิยม',
    label: 'ยอดนิยม',
    component: TopFood,
    icon: 'trophy',
  },
  {
    name: 'Profile',
    title: 'ข้อมูลส่วนตัว',
    label: 'ตัวฉัน',
    component: Profile,
    icon: 'person',
  },
]

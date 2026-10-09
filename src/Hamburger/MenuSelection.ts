import { createContext } from 'react'
import type { MenuDestination } from './Menu'

export const MenuSelection = createContext<MenuDestination | null>(null)

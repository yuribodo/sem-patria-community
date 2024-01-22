import {
  AlignVerticalSpaceAround,
  ArrowUpDown,
  ArrowUpRightFromCircle,
  BadgeCheck,
  Bell,
  BellDot,
  Bot,
  CalendarCheck2,
  CalendarClock,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Code,
  Copy,
  Edit,
  File,
  Globe,
  GraduationCap,
  Home,
  Layers,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Plus,
  PlusCircle,
  Rocket,
  SlidersHorizontal,
  Sun,
  Trash,
  User,
  X,
  type LucideIcon
} from 'lucide-react'

export type IconType = LucideIcon

export const Icons = {
  lightMode: Sun,
  darkMode: Moon,
  close: X,
  check: BadgeCheck,
  arrowRight: ChevronRight,
  arrowBack: ChevronLeft,
  arrowDown: ChevronDown,
  arrowUpDown: ArrowUpDown,
  arrowUpRighCircle: ArrowUpRightFromCircle,
  home: Home,
  dashboard: LayoutDashboard,
  file: File,
  user: User,
  menu: Menu,
  settings: SlidersHorizontal,
  bot: Bot,
  loader: Loader2,
  code: Code,
  signOut: LogOut,
  globe: Globe,
  alignVertSA: AlignVerticalSpaceAround,
  plus: Plus,
  plusCircle: PlusCircle,
  copy: Copy,
  spread: MoreHorizontal,
  spreadVertical: MoreVertical,
  edit: Edit,
  trash: Trash,
  layers: Layers,
  calendar: CalendarCheck2,
  mentorship: GraduationCap,
  bell: Bell,
  bellDot: BellDot,
  rocket: Rocket,
  calendarDays: CalendarDays,
  calendarClock: CalendarClock
}

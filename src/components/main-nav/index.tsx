'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { Icons } from '@/components/icons'
import { useAppStore } from '@/hooks/use-app-store'
import { appRoutes } from '@/lib/constants'
import { type RouteProps } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { SkeletonMainNav } from './components/skeleton-main-nav'
import ClerkUserButton from '../clerk-user-button'
import MainLogo from '../main-logo'

type MainNavProps = {
  children?: React.ReactNode
}

const MainNav = ({ children }: MainNavProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  const { isCmsMode } = useAppStore()
  const isAdminPage = pathname.includes('admin')
  const isMentorshipPage = pathname.includes('mentorship')

  const memberRoutes: RouteProps[] = [
    {
      href: appRoutes.dashboard,
      label: 'Dashboard',
      active: pathname.includes(appRoutes.dashboard),
      icon: <Icons.dashboard className="h-4 w-4" />
    },
    {
      href: `${appRoutes.courses}?filter=all`,
      label: 'Courses',
      active: pathname === appRoutes.courses,
      icon: <Icons.code className="h-4 w-4" />
    },
    {
      href: `${appRoutes.codeUp}`,
      label: 'Code Up',
      active: pathname === appRoutes.codeUp,
      icon: <Icons.calendar className="h-4 w-4" />
    },
    {
      href: `${appRoutes.mentorship}`,
      label: 'Mentorship',
      active: pathname === appRoutes.mentorship,
      icon: <Icons.mentorship className="h-4 w-4" />
    },
    {
      href: appRoutes.settings,
      label: 'Settings',
      active: pathname.includes(appRoutes.settings),
      icon: <Icons.settings className="h-4 w-4" />
    }
  ]

  const adminRoutes: RouteProps[] = [
    {
      href: appRoutes.admin_courses,
      label: 'Courses',
      active: pathname.includes(appRoutes.admin_courses),
      icon: <Icons.alignVertSA className="h-4 w-4" />
    },
    {
      href: appRoutes.admin_categories,
      label: 'Categories',
      active: pathname.includes(appRoutes.admin_categories),
      icon: <Icons.layers className="h-4 w-4" />
    },
    {
      href: appRoutes.admin_events,
      label: 'Events',
      active: pathname.includes(appRoutes.admin_events),
      icon: <Icons.calendarDays className="h-4 w-4" />
    }
  ]

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <SkeletonMainNav />

  return (
    <div
      className={cn(
        ' hidden h-screen w-[250px] flex-shrink-0 flex-col justify-between border-r border-slate-6 px-4 pb-6 ',
        !isAdminPage && !isMentorshipPage && 'md:flex',
        isAdminPage && 'xl:flex',
        isMentorshipPage && 'hidden'
      )}
    >
      <MainLogo />
      <nav className="mt-6 flex-1">
        <ul className="flex flex-col gap-2">
          {memberRoutes.map(route => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'h-8 rounded-md',
                route.active ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <span className="font-medium transition-colors hover:text-primary flex h-8 items-center gap-2 rounded-md px-2 text-sm hover:dark:bg-slate-800 hover:bg-slate-100">
                {route.icon}
                {route.label}
              </span>
            </Link>
          ))}
          {isCmsMode && (
            <div className="mt-6">
              <p className="font-medium text-sm text-foreground pb-2">CMS</p>
              <ul className="flex flex-col gap-2">
                {adminRoutes.map(route => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      'h-8 rounded-md',
                      route.active ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    <span className="font-medium transition-colors hover:text-primary flex h-8 items-center gap-2 rounded-md px-2 text-sm hover:dark:bg-slate-800 hover:bg-slate-100">
                      {route.icon}
                      {route.label}
                    </span>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </ul>
      </nav>
      <ClerkUserButton />
    </div>
  )
}

export default MainNav

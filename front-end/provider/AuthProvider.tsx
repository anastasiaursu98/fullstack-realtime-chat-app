"use client"

import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { checkAuth } from "@/features/auth/slices/authThunks"
import type { AppDispatch, RootState } from "@/lib/store"
import { RouteLoader } from "@/components/shared/RouteLoader"
import { useRouter, usePathname } from "next/navigation"
import { ROUTES } from "@/constants/routes"
import { AuthStatus } from "@/features/auth/types/auth.types"

const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.SIGNUP]

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { status } = useSelector((state: RootState) => state.auth)

    const isPublicRoute = useMemo(() => PUBLIC_ROUTES.includes(pathname), [pathname])

    // Check auth on mount
    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    // Redirect based on auth status
    useEffect(() => {
        if (status === AuthStatus.UNAUTHENTICATED && !isPublicRoute && pathname !== ROUTES.LOGIN) {
            router.replace(ROUTES.LOGIN)
        } else if (status === AuthStatus.AUTHENTICATED && isPublicRoute && pathname !== ROUTES.HOME_PAGE) {
            router.replace(ROUTES.HOME_PAGE)
        }
    }, [status, router, pathname, isPublicRoute])

    // Show loader if checking auth or redirecting
    const showLoader =
        status === AuthStatus.LOADING ||
        (status === AuthStatus.UNAUTHENTICATED && !isPublicRoute) ||
        (status === AuthStatus.AUTHENTICATED && isPublicRoute)

    if (showLoader) return <RouteLoader />

    return <>{children}</>
}

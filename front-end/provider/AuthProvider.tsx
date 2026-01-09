"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { checkAuth } from "@/features/auth/slices/authSlice"
import type { AppDispatch, RootState } from "@/lib/store"
import { RouteLoader } from "@/components/shared/RouteLoader"
import { useRouter, usePathname } from "next/navigation"
import { ROUTES } from "@/constants/routes"
import { AuthStatus } from "@/features/auth/types/auth.types"

const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.SIGNUP]

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>()
    const { status } = useSelector((state: RootState) => state.auth)

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    useEffect(() => {
        if (status === AuthStatus.UNAUTHENTICATED && !isPublicRoute) {
            // Redirect to login if not authenticated and trying to access protected route
            router.replace(ROUTES.LOGIN)
        } else if (status === AuthStatus.AUTHENTICATED && isPublicRoute) {
            // Redirect to home if authenticated and trying to access login/signup
            router.replace(ROUTES.HOME_PAGE)
        }
    }, [status, router, pathname, isPublicRoute])

    // Show loader while checking auth OR when unauthenticated on protected route
    if (status === AuthStatus.LOADING || (status === AuthStatus.UNAUTHENTICATED && !isPublicRoute)) {
        return <RouteLoader />
    }

    // Show loader while authenticated user is on public route (before redirect)
    if (status === AuthStatus.AUTHENTICATED && isPublicRoute) {
        return <RouteLoader />
    }

    return <>{children}</>
}

"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { checkAuth } from "@/features/auth/slices/authSlice"
import type { AppDispatch, RootState } from "@/lib/store"
import { RouteLoader } from "@/components/shared/RouteLoader"
import { useRouter, usePathname } from "next/navigation"
import { ROUTES } from "@/constants/routes"
import { AuthStatus } from "@/features/auth/types/auth.types"

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>()
    const { status } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    useEffect(() => {
        if (status === AuthStatus.UNAUTHENTICATED && pathname !== ROUTES.LOGIN && pathname !== ROUTES.SIGNUP) {
            router.replace(ROUTES.LOGIN)
        }
    }, [status, router, pathname])

    if (status === AuthStatus.LOADING) {
        return <RouteLoader />
    }
    return <>{children}</>
}

import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

/**
 * Renders child routes based on the user authentication status and the selected authentication method.
 *
 * @return {JSX.Element} The rendered view or component.
 */
function ProtectedRoute() {
    const { user, authMethod } = useAuth()

    if (user) {
        return <Outlet />
    } else {
        return authMethod === 'appwrite' ? <Navigate to='/login' /> : <Outlet />
    }
}

export default ProtectedRoute

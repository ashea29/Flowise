import { useRoutes, Navigate } from 'react-router-dom'

// routes
import MainRoutes from './MainRoutes'
import CanvasRoutes from './CanvasRoutes'
import ChatbotRoutes from './ChatbotRoutes'
import config from '@/config'
import ProtectedRoute from '@/ProtectedRoute'
import SignupPage from '@/views/signup'
import LoginPage from '@/views/login'
import NotFound from '@/NotFound'
import { useAuth } from '@/hooks/useAuth'

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const { authSystem } = useAuth()

    return useRoutes(
        [
            {
                path: '/',
                element: <ProtectedRoute />,
                children: [MainRoutes, CanvasRoutes, ChatbotRoutes]
            },
            {
                path: '/login',
                element: authSystem === 'appwrite' ? <LoginPage /> : <Navigate to='/' />
            },
            {
                path: '/signup',
                element: authSystem === 'appwrite' ? <SignupPage /> : <Navigate to='/' />
            },
            { path: '*', element: <NotFound /> }
        ],
        config.basename
    )
}

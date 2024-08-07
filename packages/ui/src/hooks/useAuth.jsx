import { useContext } from 'react'
import { AuthContext } from '../store/context/AuthContext'

function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuth must be used inside a AuthProvider')
    }

    return context
}

export { useAuth }

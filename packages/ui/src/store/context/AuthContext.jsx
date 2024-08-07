import PropTypes from 'prop-types'
import { createContext, useState, useReducer, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ID } from 'appwrite'
import { account } from '@/lib/appwriteConfig'
import { AuthLoader } from '@/ui-component/loading/AuthLoader'

const AuthContext = createContext()

/**
 * The currently supported authentication options are 'oauth2' and 'email'.
 * @typedef {('oauth2' | 'email') | [] | null | undefined} AuthOptions
 **/

/**
 * The initial state of the authentication context.
 * @typedef {Object} AuthContextInitialState
 * @property {null | Object} user - The user object if the user is authenticated, otherwise null.
 * @property {AuthOptions[]} authOptions - The authentication options to use. Currently, only 'oauth2' and 'email' are supported.
 *
 * NOTE: For things to work properly, one or the other (or both) must be explicitly specified.
 * @property {'appwrite' | 'default'} authSystem - The method of authentication to use (currently, only 'appwrite' and 'default' are supported).
 *
 * NOTE: If you select 'appwrite', Flowise will use Appwrite's authentication via the functions in the AuthProvider below. If you select 'default', the default Flowise authentication will be used ('FLOWISE_USERNAME' and 'FLOWISE_PASSWORD' environment variables - if defined).
 */

/**
 * @type {AuthContextInitialState}
 */
const initialState = {
    authSystem: 'default',
    authOptions: [],
    user: null
}

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'SIGNUP':
            return { user: action.payload }
        case 'LOGOUT':
            return initialState
        default:
            return state
    }
}

function AuthProvider({ children }) {
    const [isLoading, setIsLoading] = useState(true)
    const [isLogout, setIsLogout] = useState(false)
    const [state, dispatch] = useReducer(authReducer, initialState)

    const navigate = useNavigate()

    // Persist user session
    async function checkIfUserSessionExists() {
        try {
            const userData = await account.get()
            dispatch({ type: 'LOGIN', payload: userData })
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    /**
     * Authenticates the user with the specified provider and dispatches the appropriate action to update the state.
     *
     * @param {'LOGIN' | 'SIGNUP'} dispatchType - The type of action to dispatch.
     * @param {'google' | 'github'} provider - The OAuth2 provider to use. Currently, only 'Google' and 'Github' are supported.
     * @return {Promise<void>} A promise that resolves when the authentication is complete.
     */
    async function authenticateWithProvider(dispatchType, provider) {
        setIsLoading(true)
        try {
            await account.createOAuth2Session(provider, 'http://localhost:8080/', 'http://localhost:8080/login')
            const userData = await account.get()
            dispatch({ type: dispatchType, payload: userData })
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    /**
     * Creates a new account with the provided email, password, and name.
     *
     * @param {string} email - The email address of the new user.
     * @param {string} password - The password for the new user.
     * @param {string} name - The name of the new user.
     * @return {Promise<void>} A promise that resolves when the account creation is complete.
     */
    async function createAccount(email, password, name) {
        try {
            await account.create(ID.unique(), email, password, name)
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * Authenticates the user with email and password.
     *
     * @param {'LOGIN' | 'SIGNUP'} dispatchType - The type of action to dispatch.
     * @param {string} email - The email address of the user.
     * @param {string} password - The password of the user.
     * @param {string} [name] - The name of the user (passed to the `createAccount` function) (OPTIONAL).
     * @return {Promise<void>} A promise that resolves when the authentication is complete.
     */
    async function authenticateWithEmail(dispatchType, email, password, name) {
        setIsLoading(true)
        try {
            if (dispatchType === 'SIGNUP') {
                if (!name) name = email.split('@')[0]
                await createAccount(email, password, name)
            }
            await account.createEmailSession(email, password)
            const userData = await account.get()
            dispatch({ type: dispatchType, payload: userData })

            navigate('/', { replace: true })
        } catch (error) {
            console.error(error)
        }

        setIsLoading(false)
    }

    /**
     * Logs out the user by deleting their session and dispatching a LOGOUT action.
     *
     * @return {Promise<void>} A promise that resolves when the logout process is complete.
     */
    async function logout() {
        setIsLoading(true)
        setIsLogout(true)

        await account.deleteSession('current')
        dispatch({ type: 'LOGOUT' })

        setIsLoading(false)
        setIsLogout(false)
    }

    useEffect(() => {
        if (state.authSystem === 'appwrite') {
            checkIfUserSessionExists()
        } else {
            setIsLoading(false)
        }
    }, [state.authSystem])

    return (
        <AuthContext.Provider
            value={{
                ...state,
                authenticateWithProvider,
                authenticateWithEmail,
                logout
            }}
        >
            {isLoading ? (
                isLogout ? (
                    <AuthLoader loaderText='Logging out of your account' />
                ) : (
                    <AuthLoader loaderText='Loading' />
                )
            ) : (
                children
            )}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export { AuthContext, AuthProvider }

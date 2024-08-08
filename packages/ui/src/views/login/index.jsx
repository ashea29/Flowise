import { useState } from 'react'
import { Button, TextField, Container, Typography, Box, Link, Divider } from '@mui/material'
import { Google as GoogleIcon, GitHub as GitHubIcon } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from '@/ui-component/extended/Logo'
import { useAuth } from '@/hooks/useAuth'
import { escapeHtml } from '@/utils/escapeHtml'
import colors from '@/assets/scss/_themes-vars.module.scss'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const customization = useSelector((state) => state.customization)
    const { authenticateWithProvider, authenticateWithEmail, authSystem, authOptions } = useAuth()

    // Handle OAuth login (Google or GitHub)
    const handleOAuthLogin = async (event, provider) => {
        event.preventDefault()
        await authenticateWithProvider('LOGIN', provider)
    }

    // Handle email/password login
    const handleEmailLogin = async (event, email, password) => {
        event.preventDefault()
        await authenticateWithEmail('LOGIN', escapeHtml(email), escapeHtml(password))
    }

    return (
        <Container maxWidth='sm'>
            <Box display='flex' flexDirection='column' alignItems='center' mt={5}>
                <Logo />
                <Typography
                    variant='h1'
                    component='h1'
                    gutterBottom
                    sx={{
                        mt: 7,
                        mb: 4,
                        color: customization.isDarkMode ? colors.grey300 : '#8f54ff',
                        fontWeight: 200,
                        letterSpacing: '0.15rem'
                    }}
                >
                    Sign In
                </Typography>
                {authSystem === 'appwrite' && authOptions?.includes('oauth2') && (
                    <>
                        <Button
                            variant='contained'
                            color='primary'
                            startIcon={<GoogleIcon style={{ backgroundColor: 'inherit' }} />}
                            fullWidth
                            disableElevation
                            onClick={(e) => handleOAuthLogin(e, 'google')}
                            sx={{
                                mb: 2,
                                py: 1.5,
                                backgroundColor: customization.isDarkMode ? colors.darkPaper : colors.paper,
                                border: '2px solid',
                                color: customization.isDarkMode ? colors.grey300 : '#8f54ff',
                                borderColor: customization.isDarkMode ? colors.grey700 : '#8f54ff',
                                '&:hover': {
                                    backgroundColor: '#7e3aff',
                                    borderColor: '#7e3aff',
                                    color: customization.isDarkMode ? colors.grey300 : '#fff',
                                    '& .MuiSvgIcon-root': { fill: customization.isDarkMode ? colors.grey300 : '#fff' }
                                }
                            }}
                        >
                            Sign in with Google
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            startIcon={<GitHubIcon style={{ backgroundColor: 'inherit' }} />}
                            fullWidth
                            disableElevation
                            onClick={(e) => handleOAuthLogin(e, 'github')}
                            sx={{
                                mb: 4,
                                py: 1.5,
                                backgroundColor: customization.isDarkMode ? colors.darkPaper : colors.paper,
                                border: '2px solid',
                                color: customization.isDarkMode ? colors.grey300 : '#8f54ff',
                                borderColor: customization.isDarkMode ? colors.grey700 : '#8f54ff',
                                '&:hover': {
                                    backgroundColor: '#7e3aff',
                                    borderColor: '#7e3aff',
                                    color: customization.isDarkMode ? colors.grey300 : '#fff',
                                    '& .MuiSvgIcon-root': { fill: customization.isDarkMode ? colors.grey300 : '#fff' }
                                }
                            }}
                        >
                            Sign in with GitHub
                        </Button>
                        <Divider
                            component='div'
                            role='presentation'
                            sx={{
                                mb: 2,
                                color: customization.isDarkMode ? colors.grey700 : colors.grey500,
                                width: '100%',
                                '&::before, &::after': { borderTopColor: customization.isDarkMode ? colors.grey700 : colors.grey300 }
                            }}
                        >
                            <Typography>OR</Typography>
                        </Divider>
                    </>
                )}
                {authSystem === 'appwrite' && authOptions?.includes('email') && (
                    <form onSubmit={(e) => handleEmailLogin(e, email, password)} style={{ width: '100%' }}>
                        <TextField
                            type='email'
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label='Email Address'
                            autoComplete='email'
                            sx={{ '& .MuiOutlinedInput-notchedOutline': { borderRadius: '0.25rem' } }}
                        />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label='Password'
                            type='password'
                            autoComplete='current-password'
                            sx={{ '& .MuiOutlinedInput-notchedOutline': { borderRadius: '0.25rem' } }}
                        />
                        <Button
                            type='submit'
                            fullWidth
                            disableElevation
                            disabled={!email || !password}
                            variant='contained'
                            color='primary'
                            sx={{
                                mt: 3,
                                mb: 2,
                                py: 1.25,
                                fontSize: '1rem',
                                backgroundColor: customization.isDarkMode ? '#6e21ff' : '#8f54ff',
                                border: '2px solid',
                                borderColor: customization.isDarkMode ? '#6e21ff' : '#8f54ff',
                                color: customization.isDarkMode ? colors.grey300 : '#fff',
                                '&:hover': {
                                    backgroundColor: '#7e3aff',
                                    borderColor: '#7e3aff'
                                },
                                '&:disabled': {
                                    backgroundColor: customization.isDarkMode ? 'rgba(110, 33, 255, 0.52)' : 'rgba(0, 0, 0, 0.12)',
                                    color: customization.isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.26)',
                                    borderColor: 'rgba(0, 0, 0, 0.02)'
                                }
                            }}
                        >
                            Sign In
                        </Button>
                    </form>
                )}
                <Typography variant='body2' sx={{ mt: 2 }}>
                    Don&apos;t have an account?{' '}
                    <Link
                        component={RouterLink}
                        to='/signup'
                        sx={{
                            ml: 0.5,
                            color: customization.isDarkMode ? '#9c68ff' : '#8f54ff',
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' }
                        }}
                    >
                        Sign Up
                    </Link>
                </Typography>
            </Box>
        </Container>
    )
}

export default LoginPage

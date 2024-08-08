import { useState } from 'react'
import { Button, TextField, Container, Typography, Box, Link, Divider } from '@mui/material'
import { Google as GoogleIcon, GitHub as GitHubIcon } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from '@/ui-component/extended/Logo'
import { useAuth } from '@/hooks/useAuth'
import { escapeHtml } from '@/utils/escapeHtml'
import colors from '@/assets/scss/_themes-vars.module.scss'

const SignupPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordsMatch, setPasswordsMatch] = useState(false)
    const [passwordsTouched, setPasswordsTouched] = useState(false)
    const customization = useSelector((state) => state.customization)
    const { authenticateWithProvider, authenticateWithEmail, authSystem, authOptions } = useAuth()

    // Handle password match
    const handleBlur = () => {
        setPasswordsMatch(password === confirmPassword)
        setPasswordsTouched(true)
    }

    // Handle OAuth signup (Google or GitHub)
    const handleOAuthSignup = async (event, provider) => {
        event.preventDefault()
        await authenticateWithProvider('SIGNUP', provider)
    }

    // Handle email/password signup
    const handleEmailSignup = async (event, email, password, confirmPassword, name) => {
        event.preventDefault()

        if (password !== confirmPassword) {
            setPasswordsMatch(false)
            return
        }
        await authenticateWithEmail('SIGNUP', escapeHtml(email), escapeHtml(password), escapeHtml(name))
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
                    Create Account
                </Typography>
                {authSystem === 'appwrite' && authOptions?.includes('oauth2') && (
                    <>
                        <Button
                            variant='contained'
                            color='primary'
                            startIcon={<GoogleIcon style={{ backgroundColor: 'inherit' }} />}
                            fullWidth
                            disableElevation
                            onClick={(e) => handleOAuthSignup(e, 'google')}
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
                            Sign Up with Google
                        </Button>
                        <Button
                            variant='contained'
                            color='secondary'
                            startIcon={<GitHubIcon style={{ backgroundColor: 'inherit' }} />}
                            fullWidth
                            disableElevation
                            onClick={(e) => handleOAuthSignup(e, 'github')}
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
                            Sign Up with GitHub
                        </Button>
                    </>
                )}
                {authSystem === 'appwrite' && authOptions?.includes('oauth2') && authOptions?.includes('email') && (
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
                )}
                {authSystem === 'appwrite' && authOptions?.includes('email') && (
                    <form onSubmit={(e) => handleEmailSignup(e, email, password, confirmPassword, name)} style={{ width: '100%' }}>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label='Name'
                            autoComplete='name'
                            sx={{ '& .MuiOutlinedInput-notchedOutline': { borderRadius: '0.25rem' } }}
                        />
                        <TextField
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
                            label='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                            autoComplete='new-password'
                            sx={{ '& .MuiOutlinedInput-notchedOutline': { borderRadius: '0.25rem' } }}
                        />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            label='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type='password'
                            autoComplete='new-password'
                            onBlur={handleBlur}
                            error={passwordsTouched && !passwordsMatch}
                            helperText={passwordsTouched && !passwordsMatch ? 'Passwords do not match' : ''}
                            sx={{ '& .MuiOutlinedInput-notchedOutline': { borderRadius: '0.25rem' } }}
                        />
                        <Button
                            type='submit'
                            fullWidth
                            disableElevation
                            disabled={!email || !password || !confirmPassword || !passwordsMatch}
                            variant='contained'
                            color='primary'
                            sx={{
                                mt: 3,
                                mb: 2,
                                py: 1.25,
                                fontSize: '1rem',
                                border: '2px solid',
                                backgroundColor: customization.isDarkMode ? '#6e21ff' : '#8f54ff',
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
                            Sign Up
                        </Button>
                    </form>
                )}
                <Typography variant='body2' sx={{ mt: 2 }}>
                    Already have an account?{' '}
                    <Link
                        component={RouterLink}
                        to='/login'
                        sx={{
                            ml: 0.5,
                            color: customization.isDarkMode ? '#9c68ff' : '#8f54ff',
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' }
                        }}
                    >
                        Sign In
                    </Link>
                </Typography>
            </Box>
        </Container>
    )
}

export default SignupPage

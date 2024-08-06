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
    const customization = useSelector((state) => state.customization)
    const { authenticateWithProvider, authenticateWithEmail } = useAuth()

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
                    sx={{ mt: 7, mb: 3, color: customization.isDarkMode ? colors.grey300 : colors.darkPrimaryDark }}
                >
                    Create an account
                </Typography>
                {authMethod === 'appwrite' && authOptions?.includes('oauth2') && (
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
                                color: customization.isDarkMode ? colors.grey300 : colors.primaryMain,
                                borderColor: customization.isDarkMode ? colors.grey700 : colors.primaryMain,
                                '&:hover': {
                                    backgroundColor: colors.primary200 + ' !important',
                                    color: colors.darkPrimaryDark,
                                    borderColor: colors.primary200,
                                    '& .MuiSvgIcon-root': { fill: colors.darkPrimaryDark }
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
                                color: customization.isDarkMode ? colors.grey300 : colors.primaryMain,
                                borderColor: customization.isDarkMode ? colors.grey700 : colors.primaryMain,
                                '&:hover': {
                                    backgroundColor: colors.primary200 + ' !important',
                                    color: colors.darkPrimaryDark,
                                    borderColor: colors.primary200,
                                    '& .MuiSvgIcon-root': { fill: colors.darkPrimaryDark }
                                }
                            }}
                        >
                            Sign Up with GitHub
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
                {authMethod === 'appwrite' && authOptions?.includes('email') && (
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
                                py: 1.5,
                                '&:hover': { backgroundColor: colors.primary200 + ' !important', color: colors.darkPrimaryDark }
                            }}
                        >
                            Sign Up
                        </Button>
                    </form>
                )}
                <Typography variant='body2' sx={{ mt: 2 }}>
                    Already have an account?{' '}
                    <Link component={RouterLink} to='/login'>
                        Sign In
                    </Link>
                </Typography>
            </Box>
        </Container>
    )
}

export default SignupPage

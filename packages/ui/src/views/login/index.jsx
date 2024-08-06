import { Button, TextField, Container, Typography, Box, Link, Divider } from '@mui/material'
import { Google as GoogleIcon, GitHub as GitHubIcon } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from '@/ui-component/extended/Logo'
import { useAuth } from '@/hooks/useAuth'
import colors from '@/assets/scss/_themes-vars.module.scss'

const LoginPage = () => {
    const customization = useSelector((state) => state.customization)
    const { authenticateWithProvider, authenticateWithEmail } = useAuth()

    // Handle OAuth login (Google or GitHub)
    const handleOAuthLogin = async (event, provider) => {
        event.preventDefault()
        await authenticateWithProvider('LOGIN', provider)
    }

    // Handle email/password login
    const handleLogin = (event) => {
        event.preventDefault()
    }

    return (
        <Container maxWidth='sm'>
            <Box display='flex' flexDirection='column' alignItems='center' mt={5}>
                <Logo />
                <Typography variant='h1' component='h1' gutterBottom sx={{ mt: 7, mb: 3 }}>
                    Sign In
                </Typography>
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
                        borderColor: customization.isDarkMode ? colors.grey700 : colors.darkSecondaryLight,
                        '&:hover': {
                            backgroundColor: colors.primary200 + ' !important',
                            color: colors.darkPrimaryDark,
                            borderColor: colors.primary200,
                            '& .MuiSvgIcon-root': { fill: colors.darkPrimaryDark }
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
                        borderColor: customization.isDarkMode ? colors.grey700 : colors.darkSecondaryLight,
                        '&:hover': {
                            backgroundColor: colors.primary200 + ' !important',
                            color: colors.darkPrimaryDark,
                            borderColor: colors.primary200,
                            '& .MuiSvgIcon-root': { fill: colors.darkPrimaryDark }
                        }
                    }}
                >
                    Sign in with GitHub
                </Button>
                <Divider
                    component='div'
                    role='presentation'
                    sx={{ mb: 2, color: colors.grey700, width: '100%', '&::before, &::after': { borderTopColor: colors.grey700 } }}
                >
                    <Typography>OR</Typography>
                </Divider>
                <form onSubmit={handleLogin} style={{ width: '100%' }}>
                    <TextField
                        type='email'
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        label='Email Address'
                        autoComplete='email'
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        label='Password'
                        type='password'
                        autoComplete='current-password'
                    />
                    <Button
                        type='submit'
                        fullWidth
                        disableElevation
                        variant='contained'
                        color='primary'
                        sx={{
                            mt: 3,
                            mb: 2,
                            py: 1.5,
                            '&:hover': { backgroundColor: colors.primary200 + ' !important', color: colors.darkPrimaryDark }
                        }}
                    >
                        Sign In
                    </Button>
                </form>
                <Typography variant='body2' sx={{ mt: 2 }}>
                    Don&apos;t have an account?{' '}
                    <Link component={RouterLink} to='/signup'>
                        Sign Up
                    </Link>
                </Typography>
            </Box>
        </Container>
    )
}

export default LoginPage

import { Container, Typography, Button, Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <Container maxWidth='sm'>
            <Box display='flex' flexDirection='column' alignItems='center' mt={5}>
                <Typography variant='h1' component='h1' gutterBottom>
                    404
                </Typography>
                <Typography variant='h4' component='h2' gutterBottom>
                    Page Not Found
                </Typography>
                <Typography variant='body1' component='p' gutterBottom>
                    Sorry, the page you are looking for does not exist.
                </Typography>
                <Button variant='contained' color='primary' component={RouterLink} to='/'>
                    Go Home
                </Button>
            </Box>
        </Container>
    )
}

export default NotFoundPage

import { Container, Typography, Button, Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <Container maxWidth='sm'>
            <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='90vh'>
                <Typography variant='h1' component='h1' gutterBottom fontSize='4rem'>
                    404
                </Typography>
                <Typography variant='h4' component='h2' gutterBottom fontSize='1.5rem'>
                    Oh snap!
                </Typography>
                <Typography variant='body1' component='p' gutterBottom mb={3}>
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

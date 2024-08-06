import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import Logo from '@/ui-component/extended/Logo'

// assets
import colors from '@/assets/scss/_themes-vars.module.scss'

export const AuthLoader = ({ loaderText }) => {
    const customization = useSelector((state) => state.customization)

    const theme = useTheme()

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2rem',
                fontSize: '1.5rem',
                textAlign: 'center',
                backgroundColor: customization.isDarkMode ? colors.darkPaper : colors.paper
            }}
        >
            <Logo />
            <div
                style={{
                    fontSize: '1.5rem',
                    marginTop: '2rem',
                    color: customization.isDarkMode ? theme.palette.primary.contrastText : '#8D51FF'
                }}
            >
                {loaderText}...
            </div>
        </div>
    )
}

AuthLoader.propTypes = {
    loaderText: PropTypes.string.isRequired
}

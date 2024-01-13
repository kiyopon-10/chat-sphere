import React from 'react';
import {AppBar, Toolbar, Typography, Box, IconButton, Drawer, useMediaQuery} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';

const PrimaryAppBar = () => {

    const [sideMenu, setSideMenu] = React.useState(false)

    const toggleDrawer = (open: boolean) => (event: React.MouseEvent) => {
        setSideMenu(open)
    }

    const theme = useTheme()

    //const breakpoint ='sm'
    //const isSmallScreen = useMediaQuery(`(max-width:${breakpoint}})`);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

    React.useEffect(()=>{
        if(!isSmallScreen && sideMenu){
            setSideMenu(false)
        }
    }, [isSmallScreen])
    
    return(
        <AppBar 
            sx={{
                zIndex: (theme)=> theme.zIndex.drawer + 2,
                backgroundColor: theme.palette.background.default,
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Toolbar 
                variant="dense"
                sx={{
                    height: theme.primaryAppBar.height,
                    minHeight: theme.primaryAppBar.height,
                }}
            >
                <Box sx={{display: {xs: "block", sm: "none"}}} >
                    <IconButton color='inherit' aria-label='open drawer' edge="start" sx={{mr:1}}  onClick={toggleDrawer(!sideMenu)}>
                        <MenuIcon/>
                    </IconButton>
                </Box>

                <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer(false)}>
                    {[...Array(100)].map((_, i) => (
                        <Typography key={i} paragraph>
                            {i+1}
                        </Typography>
                    ))}
                </Drawer>

                <Link to="/" color="inherit" style={{ textDecoration: 'none' }}> 
                    <Typography variant='h6' noWrap component="div"
                        sx={{ display : {fontWeight: 700, letterSpacing: "-0.5px"}}}
                    >
                        CHAT-SPHERE
                    </Typography>
                </Link> 
            </Toolbar>
        </AppBar>
    )

}

export default PrimaryAppBar
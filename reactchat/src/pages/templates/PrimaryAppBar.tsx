import React from 'react';
import {AppBar, Toolbar, Typography, Box, IconButton, Drawer, useMediaQuery, toggleButtonClasses} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import ExploreCategories from '../../components/SecondaryDraw/ExploreCategories';

import MenuIcon from '@mui/icons-material/Menu';
import AccountButton from '../../components/PrimaryAppBar/AccountButton';

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

    // const list = () => {
    //     <Box sx={{paddingTop: `${theme.primaryAppBar.height}px`, minWidth: 200}} onClick={toggleDrawer(false)}>
    //         <ExploreCategories/>
    //     </Box>
    // }
    
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
                    <Box sx={{paddingTop: `${theme.primaryAppBar.height}px`, minWidth: 200}} onClick={toggleDrawer(false)}>
                        <ExploreCategories/>
                    </Box>
                </Drawer>

                <Link to="/" color="inherit" style={{ textDecoration: 'none' }}> 
                    <Typography variant='h6' noWrap component="div"
                        sx={{ display : {fontWeight: 700, letterSpacing: "-0.5px"}}}
                    >
                        CHAT-SPHERE
                    </Typography>
                </Link>
                <Box sx={{ flexGrow: 1 }}></Box>
                <AccountButton />
            </Toolbar>
        </AppBar>
    )

}

export default PrimaryAppBar
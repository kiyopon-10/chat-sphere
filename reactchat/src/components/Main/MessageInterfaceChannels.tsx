import React from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    ListItemAvatar,
    Avatar,
    Typography,
    IconButton,
    useMediaQuery,
    Drawer,
    useTheme
} from "@mui/material"

import { MEDIA_URL } from "../../config"
import Server from "../../pages/Server"
import { useParams } from "react-router-dom"
import ServerChannels from "../SecondaryDraw/ServerChannels"
import MoreVertIcon from "@mui/icons-material/MoreVert"


interface ServerChannelProps {
    data: Server[]
}

const MessageInterfaceChannel = (props: ServerChannelProps)=>{
    const {data} = props
    console.log("Data: ", data)
    const {serverId, channelId} = useParams()
    const channelName = data
                            ?.find((server)=>server.id == Number(serverId))
                            ?.channel_server?.find((channel)=>channel.id == Number(channelId))?.name || "Home"

    const theme = useTheme()

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

    const [sideMenu, setSideMenu] = React.useState(false)

    React.useEffect(()=>{
        if(!isSmallScreen && sideMenu){
            setSideMenu(false)
        }
    }, [isSmallScreen])

    const toggleDrawer = (open: boolean) => (event: React.MouseEvent) => {
        setSideMenu(open)
    }

    const list = () => (
        <Box
            sx={{paddingTop: `${theme.primaryAppBar.height}px`, minWidth: 200}}
            onClick={toggleDrawer(false)}
        >
            <ServerChannels data={data}/>
        </Box>
    )

    return <>
        <AppBar 
            sx={{
                backgroundColor: theme.palette.background.default,
                borderBottom: `1px solid ${theme.palette.divider}`
            }}
            color="default"
            position="sticky"
            elevation={0}
        >
            <Toolbar variant="dense"
                sx={{
                    minHeight: theme.primaryAppBar.height, height: theme.primaryAppBar.height,
                    display: "flex", alignItems: "center"
                }}
            >
                <Box sx={{display: {xs: "block", sm: "none"}}}>
                    <ListItemAvatar sx={{minWidth:"40px"}}>
                        <Avatar alt="Server Icon" src={`${MEDIA_URL}${data?.[0]?.icon}`}
                            sx={{width: "30px", height: "30px"}}
                        />
                    </ListItemAvatar>
                </Box>

                <Typography noWrap component="div">
                    {channelName}
                </Typography>

                <Box sx={{flexGrow: 1}}></Box>
                <Box sx={{display: { xs: "block", sm: "none"}}}>
                    <IconButton color="inherit" onClick={toggleDrawer(true)} edge="end">
                        <MoreVertIcon/>
                    </IconButton>
                </Box>
                <Drawer anchor="left" open={sideMenu} onClose={toggleDrawer(false)}>{list()}</Drawer>
            </Toolbar>
        </AppBar>
    </>
}

export default MessageInterfaceChannel
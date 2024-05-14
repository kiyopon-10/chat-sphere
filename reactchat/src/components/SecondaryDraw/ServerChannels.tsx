import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Box,
    // ListItemIcon,
    Typography,
} from "@mui/material";
// import useCrud from "../../hooks/useCrud";
// import React from "react";
import { Link, useParams } from "react-router-dom";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import { MEDIA_URL } from "../../config";
import { useTheme } from '@mui/material/styles';

import {Server} from '../../@types/server.d'


interface Category {
    id: number;
    name: string;
    description: string;
    icon: string;
}

interface ServerChannelProps {
    data: Server[]
}
  
const ServerChannels = (props: ServerChannelProps) => {
    const {data} = props
    const theme = useTheme();
    // const isDarkMode = theme.palette.mode === "dark";

    const server_name = data?.[0]?.name ?? "Server"

    const {serverId} = useParams()

    console.log(data)
  
    return (
        <>
            <Box
                sx={{
                    height: theme.primaryAppBar.height,
                    display: "flex",
                    alignItems: "center",
                    px: 2,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    position: "sticky",
                    top: 0,
                    backgroundColor: theme.palette.background.default,
                }}
            >
                <Typography
                    variant="body1"
                    style={{textOverflow:"ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}
                >
                    {server_name}
                </Typography>
            </Box>
            <List sx={{ py: 0 }}>
                {data.flatMap((obj) => 
                    obj.channel_server.map(item => (
                        <ListItem
                        disablePadding
                        key={item.id}
                        sx={{ display: "block", maxHeight: "40px"}}
                        dense={true}
                    >
                        <Link
                            to={`/server/${serverId}/${item.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <ListItemButton sx={{ minHeight: 48 }}>
                                <ListItemText
                                    primary={
                                        <Typography
                                            variant="body1"
                                            textAlign="start"
                                            paddingLeft={1}
                                        >
                                            {item.name}
                                        </Typography>
                                    }
                                />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                    ))
                )}
            </List>
        </>
    );
  };
  
  export default ServerChannels;
  
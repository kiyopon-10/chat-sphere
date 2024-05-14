import React from 'react';
import { useParams } from 'react-router-dom';
import useWebSocket from "react-use-websocket"
import useCrud from '../../hooks/useCrud';
import { Server } from '../../@types/server';
import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, TextField } from '@mui/material';
import MessageInterfaceChannel from './MessageInterfaceChannels';
import { useTheme } from '@emotion/react';
import Scroll from './Scroll';

interface ServerChannelProps {
    data: Server[]
}

interface SendMessageData {
    type: string,
    message: string,
    [key: string]: any
}

interface Message {
    sender: string,
    content: string,
    timestamp: string
}

const MessageInterface = (props: ServerChannelProps) => {

    const {data} = props

    const theme = useTheme()

    const [newMessage, setNewMessage] = React.useState<Message[]>([])
    const [message, setMessage] = React.useState("")
    // const [inputValue, setInputValue] = React.useState("")

    const {serverId, channelId} = useParams()
    const server_name = data?.[0]?.name ?? "Server"    

    const {fetchData} = useCrud<Server>([], `/messages/?channel_id=${channelId}`)

    const socketUrl = channelId
    ? `ws://127.0.0.1:8000/${serverId}/${channelId}`
    : null

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter"){
            e.preventDefault()
            sendJsonMessage({type:"message", message} as SendMessageData) 
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        sendJsonMessage({type:"message", message} as SendMessageData) 
    }

    const {sendJsonMessage} = useWebSocket(socketUrl, {
        onOpen: async() => {
            try{
                const data = await fetchData()
                setNewMessage([])
                setNewMessage(Array.isArray(data) ? data : [])
                console.log("Connected")
            }
            catch(error){
                console.log(error)
            }
        },
        onClose: () => {
            console.log("Closed")
        },
        onError: () => {
            console.log("Error")
        },
        onMessage: (msg) => {
            const data = JSON.parse(msg.data)
            setNewMessage(prev_msg => [...prev_msg, data.new_message])
            setMessage("")
        }
    })

    function formatTimeStamp(timestamp: string): string {
        const date = new Date(Date.parse(timestamp))
        //console.log(date)

        const formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
        const formattedTime = date.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: true})

        return `${formattedDate} at ${formattedTime}`
    }

    return <>
        <MessageInterfaceChannel data={data}/>
    {channelId === undefined ? 
        <Box 
            sx={{overflow:"hidden", p: {xs:0}, height: `calc(80vh)`, display:"flex", alignItems: "center", justifyContent: "center"}}
            >
                <Box sx={{textAlign: "center" }}>
                    <Typography variant='h4' fontWeight={700} letterSpacing={"-0.5px"}
                        sx={{px:5, maxWidth: "600px"}}
                    >
                        Welcome to {server_name}
                    </Typography>
                    <Typography>
                        {data?.[0]?.description ?? "This is our home"}
                    </Typography>
                </Box>
        </Box> : 
            <>
                <Box
                    sx={{overflow:"hidden", p: 0, height: `calc(100vh - 200px)`}}
                >
                    <Scroll>
                        <List
                            sx={{width: "100%", bgcolor: "background.paper"}}
                            >
                            {newMessage.map((msg:Message, idx:number) => {
                                return (
                                    <ListItem key={idx} alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="user image"/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primaryTypographyProps={{fontSize: "12px", variant: "body2"}}
                                            primary={
                                                <>
                                                    <Typography component="span" variant='body1' color="text.primary"
                                                    sx={{display: "inline", fontWeight: 500}}
                                                    >
                                                        {msg.sender}
                                                    </Typography>
                                                    <Typography component="span" variant="caption" color="textSecondary">
                                                        {"  at  "} {formatTimeStamp(msg.timestamp)}
                                                    </Typography>
                                                </>
                                            }
                                            secondary={
                                                <>
                                                    <Typography variant='body1'
                                                        sx={{overflow: "visible", whiteSpace: "normal", textOverflow: "clip",
                                                        display: "inline", lineHeight: 1.2, fontWeight: 400, letterSpacing: "-0.2px"
                                                    }}
                                                    component="span"
                                                    color="text.primary"
                                                    >
                                                        {msg.content}
                                                    </Typography>
                                                </>}
                                        />
                                    </ListItem>
                                )
                                })}   
                        </List>
                    </Scroll>
                </Box>
                <Box
                    sx={{position: "sticky", bottom: 0, width:"100%"}}
                >
                    <form onSubmit={handleSubmit} 
                        style={{bottom: 0, right: 0, padding: "1rem", backgroundColor: 'theme.palette.background.default', zIndex: 1}}
                    >
                        <Box sx={{display: "flex"}}>
                            <TextField 
                                fullWidth multiline minRows={1} maxRows={4}
                                value={message}
                                onChange={(e)=>setMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                sx={{flexGrow: 1}}
                            />
                        </Box>
                    </form>
                </Box>
            </>
    }
        </>
}

export default MessageInterface


{/* <div>
            {newMessage.map((msg:Message, idx:number) => {
                return (
                    <div key={idx}>
                        <p>{msg.sender}</p>
                        <p>{msg.content}</p>
                    </div>
                )
            })}
            <form>
                <label>
                    Enter Message:
                    <input
                        type="text" 
                        value={message}
                        onChange = {(e)=>setMessage(e.target.value)}
                    />
                </label>
            </form>
            <button onClick={()=>{ sendJsonMessage({type:"message", message}) }}>Send Message</button>
        </div> */}
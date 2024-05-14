import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import PrimaryAppBar from './templates/PrimaryAppBar';
import PrimaryDraw from './templates/PrimaryDraw';
import SecondaryDraw from './templates/SecondaryDraw';
import Main from './templates/Main';
import MessageInterface from '../components/Main/MessageInterface';
import ServerChannels from '../components/SecondaryDraw/ServerChannels';
import UserServers from '../components/PrimaryDraw/UserServers';
import { useNavigate, useParams } from 'react-router-dom';
import useCrud from '../hooks/useCrud';
import {Server} from '../@types/server.d'


const Server = () => {

    const navigate = useNavigate()
    const {serverId, channelId} = useParams()

    const {dataCRUD, error, isLoading, fetchData} = useCrud<Server>(
        [],
        `/server/select/?by_serverId=${serverId}`
    )

    if (error != null && error.message ==="400"){
        navigate("/")
    }

    React.useEffect(()=>{
        fetchData()
    }, [])

    // Check if the channelId is valid by searching for it in the data fetched from the API
    const isChannel = (): Boolean => {
        if(!channelId) return true

        return dataCRUD.some((server) =>
            server.channel_server.some(
                (channel) => channel.id === parseInt(channelId)
            )
        )
    }

    React.useEffect(()=>{
        if (!isChannel()){
            navigate(`/server/${serverId}`)
        }
    },[isChannel, channelId])

    return(
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <PrimaryAppBar />
            <PrimaryDraw>
                <UserServers open = {false} data = {dataCRUD}/>
            </PrimaryDraw>
            <SecondaryDraw>
                <ServerChannels data = {dataCRUD}/>
            </SecondaryDraw>
            <Main>
                <MessageInterface data = {dataCRUD}/>
            </Main>
        </Box>
    )
}

export default Server



//--------------------------------------------------------------------------------------------------------------------------------

// For study of concepts for accessing chat rooms from frontend

// import React from 'react';
// import useWebSocket from "react-use-websocket"

// const socketUrl = "ws://127.0.0.1:8000/ws/test"

// const Server = () => {

//     const [newMessage, setNewMessage] = React.useState<string[]>([])
//     const [message, setMessage] = React.useState("")
//     const [inputValue, setInputValue] = React.useState("")

//     const {sendJsonMessage} = useWebSocket(socketUrl, {
//         onOpen: () => {
//             console.log("Connected")
//         },
//         onClose: () => {
//             console.log("Closed")
//         },
//         onError: () => {
//             console.log("Error")
//         },
//         onMessage: (msg) => {
//             const data = JSON.parse(msg.data)
//             setNewMessage(prev_msg => [...prev_msg, data.new_message])
//         }
//     })

//     return (
//         <div>
//             {newMessage.map((msg, idx) => {
//                 return (
//                     <div key={idx}>
//                         <p>{msg}</p>
//                     </div>
//                 )
//             })}
//             <form>
//                 <label>
//                     Enter Message:
//                     <input
//                         type="text" 
//                         value={message}
//                         onChange = {(e)=>setMessage(e.target.value)}
//                     />
//                 </label>
//             </form>
//             <button onClick={()=>{ sendJsonMessage({type:"message", message}) }}>Send Message</button>
//         </div>
//     )
// }

// export default Server
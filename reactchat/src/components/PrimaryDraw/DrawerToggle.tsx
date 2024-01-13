import React from 'react';
import { Box, IconButton } from "@mui/material"
import ChevronLeft from "@mui/icons-material/ChevronLeft"
import ChevronRight from "@mui/icons-material/ChevronRight"

type Props = {
    open: boolean
    handleDrawerOpen: () => void
    handleDrawerClose: () => void

}

const DrawerToggle: React.FC<Props> = ({open, handleDrawerClose, handleDrawerOpen}) => {
    return(
        <Box
            sx={{
                display: 'flex',
                height: '50px',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <IconButton onClick={open ? handleDrawerClose: handleDrawerOpen}>
                {open ? <ChevronLeft /> :<ChevronRight />}
            </IconButton>
        </Box>
    )
}

export default DrawerToggle
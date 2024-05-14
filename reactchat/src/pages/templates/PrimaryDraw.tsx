import React from "react"
import { Box, useMediaQuery, styled } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import DrawerToggle from "../../components/PrimaryDraw/DrawerToggle";
import MuiDrawer from "@mui/material/Drawer"

// This type represents the properties that the PrimaryDraw component accepts. In this case, it has a single property called children,
// which is of type React.ReactNode. React.ReactNode is a type in React that represents the type of children that a React component
// can have. It can be anything: JSX, strings, arrays, etc.
type Props = {
    children: React.ReactNode
}

// This type represents the properties that a child component passed to PrimaryDraw should have. In this case, it has
// a single property called open, which is of type Boolean.
type ChildProps = {
    open: Boolean
}

// This type represents a React element (component) that accepts ChildProps.
type ChildElement = React.ReactElement<ChildProps>

const PrimaryDraw: React.FC<Props> = ({children}) => {

    const theme = useTheme()
    const below600 = useMediaQuery("(max-width:599px)")
    const [open, setOpen] = React.useState(!below600)


//----------------------------------------------------------------------------------------------------------------------------
    // This section is for the modifying the the width of the Drawer component according to the {open} state.

    const openedMixin = () => ({
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
        overflowX : "hidden"
    })

    const closedMixin = () => ({
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
        overflowX : "hidden",
        width: theme.primaryDraw.closed
    })

    const Drawer = styled(MuiDrawer, {})(({theme, open})  => ({
        width: theme.primaryDraw.width,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(open && {
            ...openedMixin(),
            "& .MuiDrawer-paper": openedMixin(),
        }),
        ...(!open && {
            ...closedMixin(),
            "& .MuiDrawer-paper": closedMixin(),
        }),
    }))

//----------------------------------------------------------------------------------------------------------------------------


    React.useEffect(()=>{
        setOpen(!below600)
    }, [below600])

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (

        // When the screen width is above 600px the variant is set to permanent. When we click on theDraweToggle button it
        // changes open to false (if true before) and passes that to the children prop. Since open is false the width gets
        // decreased to theme.primaryDraw.closed (70) as specified in the closedMixin. When the screen size is below 600px
        // the variant changes to temporary and open changes to false. And since the open prop changes to false it just
        // closes all together. But when the variant is permanent the drawer will never close, but when open turns to false,
        // the width will get decreased as per closedMixin(). The drawer will close only when the variant is temporary
        <Drawer open={open} variant = { below600 ? "temporary" : "permanent"}
            PaperProps={{
                sx:{
                    mt: `${theme.primaryAppBar.height}px`,
                    height:`calc(100vh- ${theme.primaryAppBar.height}px)`,
                    width: theme.primaryDraw.width
                }
            }}
        >
            <Box>
                <Box sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    p:0,
                    width: open ? "auto" : "100%"
                }}>
                    <DrawerToggle 
                        open={open}
                        handleDrawerClose={handleDrawerClose}
                        handleDrawerOpen={handleDrawerOpen}    
                    />
                </Box>
                {React.Children.map(children, (child) => {
                    return React.isValidElement(child)
                    ? React.cloneElement(child as ChildElement, {open})
                    : child
                })}
            </Box>
        </Drawer>
    )
}

export default PrimaryDraw




//--------------------------------------------------------------------------------------------------------------------------------

// For reference, when revisiting the code :

// const PrimaryDraw: React.FC<Props> = ({children}) => {: This line defines a functional component called PrimaryDraw that accepts properties of type Props. It receives the children prop which is of type React.ReactNode.

//     {React.Children.map(children, (child) => { ... })}: This line uses React.Children.map to iterate over each child element passed to PrimaryDraw. The map function in JavaScript iterates over each element of an array, in this case, the array of React children.
    
//     React.isValidElement(child) ? ... : ...: This is a conditional (ternary) operator. It checks if the child is a valid React element. If it is, it executes the code before ?, otherwise, it executes the code after :.
    
//     React.cloneElement(child as ChildElement, {open}): This line clones the valid React element (child) and assigns it new properties. Here, it's casting child as a ChildElement (a React element that accepts ChildProps). Then, it adds the open prop to it. open is presumably a boolean value that indicates whether the child should be open or not.
    
//     : child: If the child is not a valid React element, it returns the original child.
    
//     In essence, this PrimaryDraw component iterates over its children, and if a child is a valid React element, it clones it and adds an open prop to it. Otherwise, it returns the child as it is.
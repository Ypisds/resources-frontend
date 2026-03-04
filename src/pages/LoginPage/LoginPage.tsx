import { Outlet } from "react-router-dom";
import { CssBaseline, Container, Box } from "@mui/material";

export function LoginPage(){
     
    return <>
        <CssBaseline/>

        <Box sx={{ 
            bgcolor: '#f5f5f5',
            minHeight: '100vh',  
            width: '100vw',
            display: 'flex',
            alignItems: 'center', 
            justifyContent: 'center' 
            }}>
                <Container maxWidth="lg" sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'

                }}>
                    <Outlet />
                </Container>
        </Box>    
    </>
}
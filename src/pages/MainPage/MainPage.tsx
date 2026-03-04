import { Outlet } from "react-router-dom";
import { Header } from "../../component/Header/Header";
import { CssBaseline , Box } from "@mui/material";

export function MainPage(){

    return <>
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',
            width: '100vw'      
        }}>
            <CssBaseline />
            <Header />

            <Box 
                component='main' 
                sx={{ 
                    bgcolor: '#f5f5f5',
                    flexGrow: 1,        
                    display: 'flex',
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width: '100%'
                }}
            >
                <Outlet />
            </Box>    
        </Box>   
    </>
}
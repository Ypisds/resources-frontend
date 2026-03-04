import { Box, Button, Stack } from "@mui/material"
import { Name } from "../Name/Name"
import { useNavigate, Link } from "react-router-dom"
import SearchIcon from '@mui/icons-material/Search';

export function Header(){
    const navigate = useNavigate();

    return (
        <Box component='header' sx={{
            minHeight: '60px',
            bgcolor: '#ffffff',
            boxShadow: 1,
            borderBottom: '1px solid #e0e0e0',
            px: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <Link to='/' style={{textDecoration: 'none'}}>
                <Name />
            </Link>
            
            
            <Stack direction="row" spacing={2}>
                <Button 
                    startIcon={<SearchIcon />}
                    onClick={() => navigate('/busca')}
                >
                    Buscar Recurso
                </Button>
                <Button 
                    variant="contained" 
                    color="error"
                    onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/login');
                    }}
                >
                    Logout
                </Button>
            </Stack>
        </Box>
    )
}
import { Card, CardContent, Typography, Box, TextField, InputAdornment, Button, Snackbar, Alert } from "@mui/material"
import { Name } from "../Name/Name"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import { useState, useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from '../../api.ts'
import { type Error } from "../../model/SnackError.ts";
import { type LoginUser } from "../../model/User.ts";



export function Login(){
    const [user, setUser] = useState<LoginUser>({
        username: '',
        password: ''
    })
    const location = useLocation()
    const navigate = useNavigate()
    const [error, setError] = useState<Error>({
        openError: !!location.state?.successMessage,
        errorMessage: location.state?.successMessage || ""
    })
    

    const handleLogin = async (e: React.SubmitEvent) => {
        e.preventDefault()
        
        const formData = new URLSearchParams();
        formData.append('username', user.username); 
        formData.append('password', user.password);

        try {
            const response = await api.post('/token', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            
            const { access_token } = response.data;
            
            
            localStorage.setItem('token', access_token);
            
            
            navigate('/')

        } catch (error) {
            console.error(error);
            setError({
                openError: true,
                errorMessage: "Login ou senha incorretos."
            });
        }
    }

    useEffect(()=>{
        if(location.state?.successMessage){
            window.history.replaceState({}, document.title)
        }
    }, [location])

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>){
       const {name, value} = e.target

       setUser((prev) => ({
        ...prev,
        [name]: value
       }))
    }


    return (
        <Card sx={{
            minWidth: '500px',
            minHeight: '600px',
            padding: 2
        }}>
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 10,
                    mt: 1
                }}>
                    <Name />
                </Box>

                <Box component='form'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3
                }}
                onSubmit={(e) => handleLogin(e)}
                >
                    <TextField type="text"
                    variant="outlined"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon />
                                </InputAdornment>
                            )   
                        }
                    }}
                    label="Login"
                    placeholder="Seu login"
                    name="username"
                    value={user.username}
                    onChange={(e) => handleChange(e)}
                    required
                    />

                    <TextField type="password"
                    variant="outlined"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PasswordIcon />
                                </InputAdornment>
                            )   
                        }
                    }}
                    label="Senha"
                    placeholder="********"
                    name="password"
                    value={user.password}
                    onChange={(e) => handleChange(e)}
                    required
                    
                    />

                    <Button
                    variant="contained"
                    type="submit"
                    >
                        Entrar
                    </Button>

                    <Box sx={{textAlign: 'center'}}>
                        <Typography variant="caption" color="grey">
                            Não possui uma conta ainda? <Box component={Link} to='/register' sx={{textDecoration: 'underline', color: 'grey'}}>Registre-se aqui</Box>
                        </Typography>
                    </Box>
                </Box>
                
                <Snackbar
                    open={error.openError}
                    onClose={() => setError({openError: false, errorMessage: ''})}
                    autoHideDuration={4000}
                    message={error.errorMessage}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                >
                    <Alert severity="success" variant="filled">
                        {error.errorMessage}
                    </Alert>
                </Snackbar>

            </CardContent>
        </Card>
    )
}
import { Card, CardContent, Typography, Box, TextField, InputAdornment, Button, Snackbar, Alert } from "@mui/material"
import { Name } from "../Name/Name"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import { useState } from "react";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Link } from "react-router-dom";
import { type CreateUser } from "../../model/User";
import api from '../../api.ts'
import { useNavigate } from "react-router-dom";
import { type Error } from "../../model/SnackError.ts";



export function Register(){
    const [user, setUser] = useState<CreateUser>({
        name: '',
        password: '',
        username: ''
    })
    const [error, setError] = useState<Error>({
        openError: false,
        errorMessage: ''
    })
    const navigate = useNavigate()


    function handleRegister(e: React.SubmitEvent){
        e.preventDefault()
        
        api({
            method: 'post',
            url: '/create-user',
            data: user
        }).then((response) => {
            if(response.status === 201 || response.status === 200) {
                navigate('/login', {replace: true, state: {successMessage: "Usuário criado com sucesso"}})
            }
        }).catch((e) => {
           if(e.status === 409){
                setError({
                    openError: true,
                    errorMessage: "Login já utilizado"
                })
           }
           else{
                setError({
                    openError: true,
                    errorMessage: "Ocorreu um erro ao criar o usuário"
                })
           }
        })
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) {
        const {name, value} = e.target

        setUser((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    function handleClose(){
        setError({
            errorMessage: '',
            openError: false
        })
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
                onSubmit={(e) => handleRegister(e)}
                >
                    <TextField type="text"
                    variant="outlined"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PermIdentityIcon/>
                                </InputAdornment>
                            )   
                        }
                    }}
                    label="Nome"
                    name="name"
                    placeholder="Seu nome"
                    value={user.name}
                    onChange={(e) => handleChange(e)}
                    required
                    />

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
                        Registrar
                    </Button>

                    <Box sx={{textAlign: 'center'}}>
                        <Typography variant="caption" color="grey">
                            Já possui uma conta? <Box component={Link} to='/login' sx={{textDecoration: 'underline', color: 'grey'}}>Entre agora</Box>
                        </Typography>
                    </Box>
                </Box>
                

            </CardContent>

            <Snackbar
                open={error.openError}
                onClose={handleClose}
                message={error.errorMessage}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert severity="error" variant="filled">
                    {error.errorMessage}
                </Alert>
            </Snackbar>
        </Card>

        
    )
}
import { Card, CardContent, Typography, Box, TextField, InputAdornment, Button } from "@mui/material"
import { Name } from "../Name/Name"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import { useState } from "react";
import { Link } from "react-router-dom";

export function Login(){
    const [usuario, setUsuario] = useState("")
    const [senha, setSenha] = useState("")

    function handleLogin(e: React.SubmitEvent){
        e.preventDefault()
        console.log(usuario)
        console.log(senha)
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
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
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
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
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
                

            </CardContent>
        </Card>
    )
}
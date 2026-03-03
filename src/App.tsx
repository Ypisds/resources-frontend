import { Container, CssBaseline, Box } from '@mui/material'
import router from './routes.tsx'
import { RouterProvider } from 'react-router-dom'

function App() {

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
        <RouterProvider router={router}/>
      </Container>
    </Box>
    
  </>
}

export default App

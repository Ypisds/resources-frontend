import {Box, Stack, Typography } from "@mui/material";



export function Name(){
    return <Stack direction="row" alignItems="center" spacing={1}>
      
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          fontWeight: 800, 
          letterSpacing: '-1px'
        }}
      >
        <Box 
          component="span" 
          sx={{ 
            color: 'primary.main',
            fontWeight: 800 
          }}
        >
          Fast
        </Box>
        <Box 
          component="span" 
          sx={{ 
            color: 'black', 
            fontWeight: 300 
          }}
        >
          Resources
        </Box>
      </Typography>
    </Stack>
}
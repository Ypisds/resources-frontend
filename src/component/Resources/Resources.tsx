import { TableContainer, Table, TableCell, TableHead, TableRow, TableBody, Paper, Typography, Box, Pagination } from "@mui/material";
import { Row } from "../Row/Row";
import { type PageResource } from "../../model/Resource";
import { useEffect, useState } from "react";
import { CreateResource } from "../CreateResource/CreateResource";
import api from "../../api";




export function Resources(){
    const [currentPage, setCurrentPage] = useState(1);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    
    const [pages, setPages] = useState<PageResource>({
        items: [],
        total: 0,
        page: 1,
        size: 10,
        pages: 0
    });

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await api.get<PageResource>(`/resources`, {
                    params: {
                        page: currentPage,
                        size: 10
                    }
                });
                setPages(response.data);
            } catch (error) {
                console.error("Erro ao buscar recursos:", error);
            }
        };

        fetchResources();
    }, [currentPage, refreshTrigger]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const refreshData = () => {
        setRefreshTrigger(prev => prev + 1);
        setCurrentPage(1); 
    };
    

  
  return (
    <Box sx={{
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '1000px'
    }}>
        <Typography variant="h2" color="text.primary" sx={{mb: 3}}>Últimos Recursos Postados</Typography>
        <TableContainer component={Paper} 
            sx={{ 
                mt: 3, 
                boxShadow: 3, 
                mb: 4,
                maxHeight: '60vh', 
                overflow: 'auto',   
                '&::-webkit-scrollbar': {
                    width: '0.4em'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,.1)',
                    borderRadius: '4px'
                }
        }}>
        <Table stickyHeader aria-label="collapsible table">
            <TableHead>
            <TableRow>
                <TableCell />
                <TableCell>TÍTULO</TableCell>
                <TableCell align="right">TIPO</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {pages.items.map((resource) => (
                <Row key={resource.id} row={resource} />
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        <Pagination 
                count={pages.pages} 
                page={currentPage}  
                onChange={handlePageChange} 
                color="primary" 
                size="large"
                sx={{ mb: 4 }}
            />
        <CreateResource onResourceCreated={refreshData} />
    </Box>
  );
}
import { useState, useEffect } from "react";
import { Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel, Paper, Pagination, TableContainer, TableCell, Table, TableHead, TableRow, TableBody } from "@mui/material";
import api from "../../api";
import { Row } from "../Row/Row";
import { type PageResource, type TipoResource } from "../../model/Resource";

type FilterType = TipoResource | "Todos";

export function SearchResources() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState<TipoResource | "Todos">("Todos");
    const [pages, setPages] = useState<PageResource>({ items: [], total: 0, page: 1, size: 10, pages: 0 });

    useEffect(() => {
    
        const getData = async () => {
            try {
                const response = await api.get<PageResource>("/resources", {
                    params: {
                        page: currentPage,
                        size: 10,
                        titulo: searchTerm || undefined,
                        tipo: selectedType === "Todos" ? undefined : selectedType
                    }
                });
                setPages(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        
        const delayDebounceFn = setTimeout(() => {
            getData();
        }, 500);

        return () => clearTimeout(delayDebounceFn);

    
    }, [currentPage, selectedType, searchTerm]);

    

    return (
        <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '1000px', p: 3 }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>Explorar Recursos</Typography>
            
            
            <Paper sx={{ p: 3, width: '100%', mb: 4, display: 'flex', gap: 2, boxShadow: 2 }}>
                <TextField 
                    label="Pesquisar por título..." 
                    fullWidth 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Tipo</InputLabel>
                    <Select
                        value={selectedType}
                        label="Tipo"
                        onChange={(e) => setSelectedType(e.target.value as FilterType)}
                    >
                        <MenuItem value="Todos">Todos os Tipos</MenuItem>
                        <MenuItem value="Vídeo">Vídeo</MenuItem>
                        <MenuItem value="PDF">PDF</MenuItem>
                        <MenuItem value="Link">Link Externo</MenuItem>
                    </Select>
                </FormControl>
            </Paper>

            
            <TableContainer component={Paper} sx={{ maxHeight: '50vh', overflow: 'auto' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell sx={{ fontWeight: 'bold' }}>TÍTULO</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 'bold' }}>TIPO</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pages.items.map((resource) => (
                            <Row key={resource.id} row={resource} />
                        ))}
                        {pages.items.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                                    Nenhum recurso encontrado para os filtros aplicados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Pagination 
                count={pages.pages} 
                page={currentPage} 
                onChange={(_, v) => setCurrentPage(v)} 
                sx={{ mt: 4 }}
                color="primary"
            />
        </Box>
    );
}
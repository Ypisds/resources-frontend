import { useState } from "react";
import { 
    TableRow, TableCell, IconButton, Collapse, Box, Typography, 
    Stack, Chip, Dialog, DialogTitle, DialogContent, DialogActions, 
    TextField, Button, FormControl, InputLabel, Select, MenuItem, CircularProgress 
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'; 
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import api from "../../api.ts";
import { type ResourceResponse, type ResourceCreateRequest, type TipoResource } from "../../model/Resource";

export function Row({ row }: { row: ResourceResponse }) {
    const [open, setOpen] = useState(false); 
    const [openEdit, setOpenEdit] = useState(false); 
    const [openDelete, setOpenDelete] = useState(false); 
    const [loadingAI, setLoadingAI] = useState(false);
    const [tagInput, setTagInput] = useState(""); 
    
    const [editData, setEditData] = useState<ResourceCreateRequest>({
        titulo: row.titulo,
        descricao: row.descricao,
        tipo: row.tipo as TipoResource,
        url: row.url,
        tags: row.tags || []
    });

    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => {
        setOpenEdit(false);
        setLoadingAI(false);
        setTagInput("");
    };

    
    const handleDelete = async () => {
        try {
            await api.delete(`/resources/${row.id}`);
            window.location.reload();
        } catch (error) {
            console.error("Erro ao deletar recurso:", error);
        }
    };

    const handleGenerateWithAI = async () => {
        if (!editData.titulo) return;
        setLoadingAI(true);
        try {
            const response = await api.post("/ai", {
                titulo: editData.titulo,
                tipo: editData.tipo
            });
            const { descricao, tags } = response.data;
            setEditData(prev => ({ ...prev, descricao, tags }));
        } catch (error) {
            console.error("Erro na IA:", error);
        } finally {
            setLoadingAI(false);
        }
    };

    const handleUpdate = async () => {
        try {
            await api.put(`/resources/${row.id}`, editData);
            setOpenEdit(false);
            window.location.reload();
        } catch (error) {
            console.error("Erro ao atualizar:", error);
        }
    };

    const handleTagAdd = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!editData.tags.includes(tagInput.trim())) {
                setEditData({ ...editData, tags: [...editData.tags, tagInput.trim()] });
            }
            setTagInput("");
        }
    };

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{row.titulo}</TableCell>
                <TableCell align="right">{row.tipo.toUpperCase()}</TableCell>
            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom>Detalhes do Recurso</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Descrição:</strong> {row.descricao}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    <strong>Link:</strong> 
                                    <a href={row.url} target="_blank" rel="noopener noreferrer" 
                                       style={{ textDecoration: 'underline', color: 'blue', marginLeft: '4px' }}>
                                        {row.url}
                                    </a>
                                </Typography>
                                <Box sx={{ mt: 2, mb: 1 }}>
                                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Tags:</Typography>
                                        {row.tags?.map((tag, index) => (
                                            <Chip key={index} label={tag} size="small" color="primary" variant="outlined" />
                                        ))}
                                    </Stack>
                                </Box>
                            </Box>

                            
                            <Stack direction="row" spacing={1}>
                                <IconButton color="primary" onClick={handleOpenEdit}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="error" onClick={() => setOpenDelete(true)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Stack>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

            
            <Dialog open={openEdit} onClose={handleCloseEdit} fullWidth maxWidth="sm">
                <DialogTitle sx={{ fontWeight: 'bold' }}>Editar Recurso</DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField 
                                label="Título" fullWidth required disabled={loadingAI}
                                value={editData.titulo}
                                onChange={(e) => setEditData({ ...editData, titulo: e.target.value })}
                            />
                            <Button 
                                variant="outlined" color="secondary" onClick={handleGenerateWithAI}
                                disabled={loadingAI || !editData.titulo}
                                startIcon={loadingAI ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeIcon />}
                            >
                                IA
                            </Button>
                        </Box>

                        <FormControl fullWidth disabled={loadingAI}>
                            <InputLabel>Tipo de Recurso</InputLabel>
                            <Select
                                value={editData.tipo}
                                label="Tipo de Recurso"
                                onChange={(e) => setEditData({ ...editData, tipo: e.target.value as TipoResource })}
                            >
                                <MenuItem value="Vídeo">Vídeo</MenuItem>
                                <MenuItem value="PDF">PDF</MenuItem>
                                <MenuItem value="Link">Link Externo</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField 
                            label="URL" fullWidth required disabled={loadingAI}
                            value={editData.url}
                            onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                        />

                        <TextField 
                            label="Descrição" fullWidth multiline rows={3} disabled={loadingAI}
                            value={editData.descricao || ""}
                            onChange={(e) => setEditData({ ...editData, descricao: e.target.value })}
                        />

                        <Box>
                            <TextField 
                                label="Tags (Pressione Enter para adicionar)" 
                                fullWidth 
                                disabled={loadingAI}
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagAdd}
                            />
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                                {editData.tags.map((tag) => (
                                    <Chip 
                                        key={tag} 
                                        label={tag} 
                                        disabled={loadingAI}
                                        onDelete={() => setEditData({
                                            ...editData, 
                                            tags: editData.tags.filter(t => t !== tag)
                                        })} 
                                    />
                                ))}
                            </Stack>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleCloseEdit} disabled={loadingAI}>Cancelar</Button>
                    <Button variant="contained" onClick={handleUpdate} disabled={loadingAI}>Salvar</Button>
                </DialogActions>
            </Dialog>

            
            <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                <DialogTitle>Excluir Recurso</DialogTitle>
                <DialogContent>
                    <Typography>
                        Tem certeza que deseja excluir <strong>{row.titulo}</strong>? Esta ação não pode ser desfeita.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenDelete(false)}>Cancelar</Button>
                    <Button variant="contained" color="error" onClick={handleDelete}>
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
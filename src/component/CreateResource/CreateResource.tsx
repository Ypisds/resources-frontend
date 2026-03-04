import { useState } from "react";
import { 
    Fab, Dialog, DialogTitle, DialogContent, DialogActions, 
    TextField, Button, Select, MenuItem, InputLabel, 
    FormControl, Box, Chip, Stack, CircularProgress 
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'; 
import api from "../../api.ts";
import { type ResourceCreateRequest, type TipoResource } from "../../model/Resource";

export function CreateResource({ onResourceCreated }: { onResourceCreated: () => void }) {
    const [open, setOpen] = useState(false);
    const [loadingAI, setLoadingAI] = useState(false); 
    
    const [formData, setFormData] = useState<ResourceCreateRequest>({
        titulo: "",
        descricao: "",
        tipo: "Vídeo", 
        url: "",
        tags: []
    });
    const [tagInput, setTagInput] = useState("");

    const handleClose = () => {
        if (loadingAI) return; 
        setOpen(false);
        setFormData({ titulo: "", descricao: "", tipo: "Vídeo", url: "", tags: [] });
    };

    
    const handleGenerateWithAI = async () => {
        if (!formData.titulo) return;

        setLoadingAI(true);
        try {
            const response = await api.post("/ai", {
                titulo: formData.titulo,
                tipo: formData.tipo
            });

            
            const { descricao, tags } = response.data;
            setFormData(prev => ({
                ...prev,
                descricao: descricao,
                tags: tags
            }));
        } catch (error) {
            console.error("Erro ao consultar IA:", error);
            
        } finally {
            setLoadingAI(false);
        }
    };

    const handleSubmit = async () => {
        try {
            await api.post("/resources/", formData);
            onResourceCreated(); 
            handleClose();
        } catch (error) {
            console.error("Erro ao criar recurso", error);
        }
    };

    const handleTagAdd = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!formData.tags.includes(tagInput.trim())) {
                setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
            }
            setTagInput("");
        }
    };

    return (
        <>
            <Fab 
                color="primary" 
                aria-label="add" 
                onClick={() => setOpen(true)}
                sx={{ position: 'fixed', bottom: 32, right: 32 }}
            >
                <AddIcon />
            </Fab>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle sx={{ fontWeight: 'bold' }}>Novo Recurso Digital</DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        
                        
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                            <TextField 
                                label="Título" 
                                fullWidth 
                                required 
                                disabled={loadingAI}
                                value={formData.titulo}
                                onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                            />
                            <Button 
                                variant="outlined" 
                                color="secondary"
                                onClick={handleGenerateWithAI}
                                disabled={loadingAI || !formData.titulo}
                                sx={{ height: '56px', minWidth: '130px' }}
                                startIcon={loadingAI ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeIcon />}
                            >
                                {loadingAI ? "IA..." : "Sugestão"}
                            </Button>
                        </Box>

                        <FormControl fullWidth disabled={loadingAI}>
                            <InputLabel>Tipo de Recurso</InputLabel>
                            <Select
                                value={formData.tipo}
                                label="Tipo de Recurso"
                                onChange={(e) => setFormData({...formData, tipo: e.target.value as TipoResource})}
                            >
                                <MenuItem value="Vídeo">Vídeo</MenuItem>
                                <MenuItem value="PDF">PDF</MenuItem>
                                <MenuItem value="Link">Link Externo</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField 
                            label="URL do Recurso" 
                            fullWidth 
                            required 
                            disabled={loadingAI}
                            placeholder="https://..."
                            value={formData.url}
                            onChange={(e) => setFormData({...formData, url: e.target.value})}
                        />

                        <TextField 
                            label="Descrição" 
                            fullWidth 
                            multiline 
                            rows={3}
                            disabled={loadingAI}
                            value={formData.descricao || ""}
                            onChange={(e) => setFormData({...formData, descricao: e.target.value})}
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
                                {formData.tags.map((tag) => (
                                    <Chip 
                                        key={tag} 
                                        label={tag} 
                                        disabled={loadingAI}
                                        onDelete={() => setFormData({
                                            ...formData, 
                                            tags: formData.tags.filter(t => t !== tag)
                                        })} 
                                    />
                                ))}
                            </Stack>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleClose} color="inherit" disabled={loadingAI}>Cancelar</Button>
                    <Button 
                        onClick={handleSubmit} 
                        variant="contained" 
                        disabled={loadingAI || !formData.titulo || !formData.url}
                    >
                        Criar Recurso
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
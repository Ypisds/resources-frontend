export type TipoResource = "Vídeo" | "PDF" | "link"

export interface ResourceCreateRequest{
    titulo: string
    descricao: string | null
    tipo: TipoResource
    url: string
    tags: Array<string>
}

export interface ResourceResponse{
    id: number
    titulo: string
    descricao: string | null
    tipo: TipoResource
    url: string
    tags: Array<string>
}

export interface PageResource{
    items: Array<ResourceResponse>
    total: number
    page: number
    size: number
    pages: number
}
    


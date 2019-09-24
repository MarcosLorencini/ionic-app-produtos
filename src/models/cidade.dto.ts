import { EstadoDTO } from "./estado.dto";

export interface CidadeDTO {
    id: string;
    nome: string;
    //busca a cidade sem a obrigatoriedade de trazer o estado
    estado? : EstadoDTO;
}
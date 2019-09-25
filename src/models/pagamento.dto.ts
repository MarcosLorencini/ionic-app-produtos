export interface PagamentoDTO {
    numeroDeParcelas : number;
    //o @type tem que ser em string - pagamento com o boleto ou cartao
    "@type" : string;
}
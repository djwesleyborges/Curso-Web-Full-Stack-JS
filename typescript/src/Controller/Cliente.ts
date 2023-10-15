interface INomeCompleto{
    nome: string,
    sobrenome: string
}

export interface IPessoa{
    nome: string | INomeCompleto;
    idade: number | string;
}

export interface IContato{
    telefone: string;
    email: string | IPessoa;
}

export type ICliente = IPessoa & IContato;


export function salvarCliente(cliente: ICliente){

    const idade: number = cliente.idade as number

}

export function salvar<T>(args: T): T {
    return args;
}

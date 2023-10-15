import { ICliente, salvarCliente, salvar, IContato } from './Cliente'

salvarCliente({
    nome: {
        nome: 'Wesley',
        sobrenome: 'Borges'
    },
    telefone: "",
    email: "",
    idade: "33"
});

salvar<ICliente>({
    nome: {
        nome: 'Wesley',
        sobrenome: 'Borges'
    },
    telefone: "",
    email: "",
    idade: "33"
});

salvar<IContato>({
    telefone: '91414713',
    email: 'as@g.com'
})
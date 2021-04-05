#language: pt
Funcionalidade: Listagem

    Como um usuário eu desejo acessar a Listagem
    para que eu possa visualizar meus dados de cadastro.

    Cenario: Listagem sem registro
        Dado que o site não possui registros
        Quando acessar a listagem
        Entao devo visualizar a lisgagem vazia

    Cenario: Listagem com apenas um registro
        Dado que o site possui apenas um registro
        Quando acessar a listagem
        Entao visualizar apenas um registro na listagem
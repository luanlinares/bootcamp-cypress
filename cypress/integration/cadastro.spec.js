/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {
        /// rotas com mocks. 
        // Necessário por enquanto, dado que a aplicação demoautomation está instável

        cy.server();
        cy.route({
            method: 'POST',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: {}
        }).as('postNewtable');

        cy.route({
            method: 'POST', 
            url: '**/api/1/databases/userdetails/collections/usertable?**', 
            status: 200, 
            response: {}
        }).as('postUsertable');

        cy.route({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: {}
        }).as('getNewtable');

        //Visitar o site (Usando a url base e complemento)
        cy.visit('Register.html');
        
        //Preencher formulario com texto -> type('texto')
        cy.get('input[placeholder="First Name"]').type(chance.first());
        cy.get('input[ng-model^=Last]').type(chance.last());
        cy.get('input[ng-model^=Email]').type(chance.email());
        cy.get('input[ng-model^=Phone]').type(chance.phone({formatted: false}));

        //Usar radiobutton e checkbox -> check('Item a selecionar')
        cy.get('input[value=Male]').check();
        cy.get('input[type=checkbox]').check('Cricket');
        cy.get('input[type=checkbox]').check('Movies');

        //Selecionar opção em uma lista -> select('Item a selecionar') e select2 (combos)
        cy.get('select#Skills').select('Javascript');
        cy.get('select#countries').select('Argentina');
        cy.get('select#country').select('Australia', { force: true});
        cy.get('select#yearbox').select('1987');
        cy.get('select[ng-model^=month]').select('June');
        cy.get('select#daybox').select('10');

        cy.get('input#firstpassword').type('Nic@2406');
        cy.get('input#secondpassword').type('Nic@2406');

        //Upload de arquivos -> attachFile
        cy.get('input#imagesrc').attachFile('imgtst.png');
        
        //Clicar no botão -> click
        cy.get('button#submitbtn').click();

        cy.wait('@postNewtable').then((resNewtable) => {
            expect(resNewtable.status).to.eq(200)
        })

        cy.wait('@postUsertable').then((resUsertable) => {

            expect(resUsertable.status).to.eq(200)
        })

        cy.wait('@getNewtable').then((resNewtable) => {
            expect(resNewtable.status).to.eq(200)
        })

        cy.url().should('contain', 'WebTable');

    });
});


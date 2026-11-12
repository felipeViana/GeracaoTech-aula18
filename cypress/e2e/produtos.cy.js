describe('Página da Lojinha', () => {
    beforeEach(() => {
        cy.visit('/frontend/');
    });

    it('deve apresentar o título da página', () => {
        cy.contains('h1', 'Lojinha').should('be.visible');
    });

    it('deve apresentar os três produtos cadastrados', () => {
        cy.get('.produto').should('have.length', 3);
    });

    it('deve apresentar os nomes dos produtos', () => {
        cy.contains('.produto', 'Caderno').should('be.visible');
        cy.contains('.produto', 'Caneta').should('be.visible');
        cy.contains('.produto', 'Mochila').should('be.visible');
    });

    it('deve apresentar os preços dos produtos', () => {
        cy.contains('.produto', 'Caderno')
            .should('contain.text', 'R$ 19,90');

        cy.contains('.produto', 'Caneta')
            .should('contain.text', 'R$ 4,50');

        cy.contains('.produto', 'Mochila')
            .should('contain.text', 'R$ 89,90');
    });
});

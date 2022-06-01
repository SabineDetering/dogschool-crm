describe('start screen', () => {
    it('successfully loads', () => {
        cy.visit('/')
    })
})

it('login as guest', () => {
    cy.visit('/')
    cy.get('[data-cy=guestLogin]')
        .click()
    cy.contains('Sign in')
        .click()
    cy.location().should((location) => {
        expect(location.pathname).to.eq('/dashboard')
    })
})

describe('client page', () => {
    it('successfully loads', () => {
        cy.visit('/clients')
    })
})

it('create new client', () => {
    cy.visit('/clients')
    cy.get('[data-cy=addClient]').click()
    cy.get('h2').should('contain','Add new client')
    
})
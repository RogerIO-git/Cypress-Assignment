import Auth from '../../page/auth.page'
import Product from '../../page/product.page'
import userData from '../../data/users.data'

describe('Authentication', () => {
    beforeEach(() => {
        cy.visit('/')
      })

    it('Login with a standard user', () => {
        Auth.login(userData.valid.username, userData.valid.password)
        cy.get(Product.productPageTitle).should('be.visible')
    })

    it('Login with a invalid user', () => {
        Auth.login(userData.invalid.username, userData.invalid.password)
        cy.get(Auth.loginErrorMsg).contains(userData.invalid.errorMsg)
    })

    it('Login with a locked out user', () => {
        Auth.login(userData.lockedOutUser.username, userData.lockedOutUser.password)
        cy.get(Auth.loginErrorMsg).contains(userData.lockedOutUser.errorMsg)
    })

    it('Login with a problem user user', () => {
        Auth.login(userData.problemUser.username, userData.problemUser.password)
        cy.get(Product.productPageTitle).should('be.visible')
    })

    it('Login with a performance user user', () => {
        Auth.login(userData.performanceGlitchUser.username, userData.performanceGlitchUser.password)
        cy.get(Product.productPageTitle).should('be.visible')
    })
})
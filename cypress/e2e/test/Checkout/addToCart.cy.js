import Auth from '../../page/auth.page'
import Cart from '../../page/cart.page'
import Checkout from '../../page/checkout.page'
import userData from '../../data/users.data'
import productData from '../../data/products.data'

describe('Checkout', () => {
    beforeEach(() => {
        cy.visit('/')
      })

    for(let i = 0; i < productData.products.length-1 ; i++){
        it('Add a single product to cart '+productData.products[i].name, () => {
            Auth.login(userData.valid.username,userData.valid.password)

            Cart.addToCart(productData.products[i].name)
            Cart.navigateToCart()

            cy.get(Cart.cartNotification).should('have.text', 1)
            cy.get(Cart.cartQuantity).should('have.text', 1)
            cy.get(Cart.removeFromCartBtn(productData.products[i].name)).should('be.visible')
            cy.get(Cart.cartItemsName).should('have.text', productData.products[i].name)
            cy.get(Cart.cartItemPrice).contains(productData.products[i].price)
        })

        it('Remove one item from cart', () => {
            Auth.login(userData.valid.username,userData.valid.password)

            Cart.addToCart(productData.products[i].name)
            Cart.navigateToCart()

            cy.get(Cart.cartQuantity).should('have.text', 1)
            cy.get(Cart.cartItemsName).should('have.text', productData.products[i].name)
            Cart.removeFromCart(productData.products[i].name)

            cy.get(Cart.cartItemsName).should('not.exist')
            cy.get(Cart.removedCartItem).should('exist')
        })

        it('Remove one item from product list', () => {
            Auth.login(userData.valid.username,userData.valid.password)

            Cart.addToCart(productData.products[i].name)

            cy.get(Cart.cartNotification).should('have.text', 1)

            Cart.removeFromCart(productData.products[i].name)
            cy.get(Cart.cartNotification).should('not.exist')
        })
    }

    it('Add a multiple products to cart', () => {
        Auth.login(userData.valid.username,userData.valid.password)

        Cart.addToCart(productData.products[0].name)
        Cart.addToCart(productData.products[1].name)
        Cart.navigateToCart()

        cy.get(Cart.cartNotification).should('have.text', 2)
        cy.get(Cart.cartQuantity).eq(0).should('have.text', 1)
        cy.get(Cart.cartQuantity).eq(1).should('have.text', 1)
        cy.get(Cart.removeSauceLabBackPackBtn).should('be.visible')
        cy.get(Cart.cartItemsName).eq(0).should('have.text', productData.products[0].name)
        cy.get(Cart.cartItemsName).eq(1).should('have.text', productData.products[1].name)
    })

    it('Enter checkout info', () => {
        Auth.login(userData.valid.username,userData.valid.password)

        Cart.addToCart(productData.products[0].name)
        Cart.navigateToCart()
        Cart.navigateToCheckout()

        Checkout.fillCheckoutInfo(userData.valid.first_name, userData.valid.last_name, userData.valid.zipcode)
        Checkout.navigateToCheckoutStep2()
        cy.get(Checkout.checkoutOverviewTitle).contains('Checkout: Overview')

    })

    it('Checkout Overview', () => {
        Auth.login(userData.valid.username,userData.valid.password)

        Cart.addToCart(productData.products[0].name)
        Cart.navigateToCart()
        Cart.navigateToCheckout()

        Checkout.fillCheckoutInfo(userData.valid.first_name, userData.valid.last_name, userData.valid.zipcode)
        Checkout.navigateToCheckoutStep2()
        cy.get(Cart.cartQuantity).should('have.text', 1)
        cy.get(Cart.cartItemsName).should('have.text', productData.products[0].name)
        cy.get(Checkout.checkoutInfo).eq(0).should('have.text', userData.valid.card)
        cy.get(Checkout.checkoutInfo).eq(1).should('have.text', userData.valid.shipment)
        cy.get(Checkout.checkoutSubTotal).contains(productData.products[0].price)
    })

    it('Checkout Complete', () => {
        Auth.login(userData.valid.username,userData.valid.password)

        Cart.addToCart(productData.products[0].name)
        Cart.navigateToCart()
        Cart.navigateToCheckout()

        Checkout.fillCheckoutInfo(userData.valid.first_name, userData.valid.last_name, userData.valid.zipcode)
        Checkout.navigateToCheckoutStep2()
        cy.get(Checkout.finishBtn).click()
        cy.get(Checkout.ponyexpressImg).should('be.visible')
        cy.get(Checkout.completePurchaseText).contains('THANK YOU FOR YOUR ORDER')
    })
})
import Auth from '../../page/auth.page'
import Product from '../../page/product.page'
import productData from '../../data/products.data'
import userData from '../../data/users.data'

describe('Filter', () => {
    beforeEach(() => {
        cy.visit('/')
        Auth.login(userData.valid.username,userData.valid.password)
      })

    it('should sort product list from A-Z', () => {
        Product.selectFilter(productData.filter['A to Z'])

        productData.products.sort()

        cy.get(Product.itemsName).each(($elem, index) => {
            expect($elem.text()).equal(productData.products[index].name)
        })
    })

    it('should sort product list from Z-A', () => {
        Product.selectFilter(productData.filter['Z to A'])

        productData.products.sort().reverse()

        cy.get(Product.itemsName).each(($elem, index) => {
            expect($elem.text()).equal(productData.products[index].name)
        })
    })

    it('should sort product list from low to high', () => {
        Product.selectFilter(productData.filter['Low to High'])

        productData.products.sort((a, b) => a.price - b.price)

        cy.get(Product.itemsPrice).each(($elem, index) => {
            expect($elem.text()).equal(`$${productData.products[index].price}`)
        })
    })

    it('should sort product list from high to low', () => {
        Product.selectFilter(productData.filter['High to Low'])

        productData.products.sort((a, b) => b.price - a.price)

        cy.get(Product.itemsPrice).each(($elem, index) => {
            expect($elem.text()).equal(`$${productData.products[index].price}`)
        })
    })
})
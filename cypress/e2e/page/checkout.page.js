class Checkout{
    
    get first_name() { return ('#first-name') }
    get last_name() { return ('#last-name') }
    get zipCode() { return ('#postal-code') }

    get continueBtn() { return ('input.submit-button') }

    get checkoutOverviewTitle() { return ('.header_secondary_container > .title') }
    get checkoutInfo() { return ('.summary_value_label') }
    get checkoutSubTotal() { return ('.summary_subtotal_label') }
    get finishBtn() { return ('#finish') }

    get ponyexpressImg() { return ('.pony_express') }
    get completePurchaseText() { return ('h2.complete-header') }

    fillCheckoutInfo(fname, lname, zipcode){
        cy.get(this.first_name).type(fname)
        cy.get(this.last_name).type(lname)
        cy.get(this.zipCode).type(zipcode)
    }

    navigateToCheckoutStep2(){
        cy.get(this.continueBtn).click()
    }
    
}
export default new Checkout()
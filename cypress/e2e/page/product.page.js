class Product{
    
    get productPageTitle() { return ('.header_secondary_container > .title') }
    get itemsName() { return ('.inventory_item_name') }
    get itemsPrice() { return ('.inventory_item_price') }
    

    selectFilter(filter){
        cy.get('.product_sort_container').select(filter)
    }
    
}
export default new Product()
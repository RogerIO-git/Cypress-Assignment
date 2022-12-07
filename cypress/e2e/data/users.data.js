module.exports = {
    valid: {
        username: 'standard_user',
        password: 'secret_sauce',
        first_name: 'Test',
        last_name: 'User',
        zipcode: '10001',
        card: 'SauceCard #31337',
        shipment: 'FREE PONY EXPRESS DELIVERY!'
    },
    invalid: {
        username: 'standard_use',
        password: 'secret_sauce',
        errorMsg: 'Username and password do not match any user in this service'
    },
    lockedOutUser: {
        username: 'locked_out_user',
        password: 'secret_sauce',
        errorMsg: 'Sorry, this user has been locked out.'
    },
    problemUser: {
        username: 'problem_user',
        password: 'secret_sauce'
    },
    performanceGlitchUser: {
        username: 'performance_glitch_user',
        password: 'secret_sauce'
    }
}
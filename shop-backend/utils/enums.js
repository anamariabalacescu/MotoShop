
require('dotenv').config()
const USER_TYPES = {
    ADMIN: 'admin',
    CLIENT: 'client'
}

const switchUserSecret = (userType) => {
    switch (userType) {
        case USER_TYPES.ADMIN:
            return process.env.SECRET_ADMIN
        case USER_TYPES.CLIENT:
            return process.env.SECRET_CLIENT
        default:
            throw new Error('Invalid user type')
    }
}

module.exports = {
    USER_TYPES,
    switchUserSecret
}
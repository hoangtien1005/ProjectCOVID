const { DEPOSIT, WITHDRAWAL, PAYMENT, API_URL } = require("../constants");
const bcrypt = require('bcrypt')
const axios = require('axios')
module.exports = {
    getTransactionName: (action) => {
        switch (action) {
            case DEPOSIT:
                return "Nạp tiền vào tài khoản";
            case WITHDRAWAL:
                return "Rút tiền ra khỏi tài khoản";
            case PAYMENT:
                return "Thanh toán hóa đơn";

            default:
                return "Không rõ";
        }
    },

    generatePassword: async (password) => {
        return await bcrypt.hash(password.toString(), 10)
    },

    isValidPassword: async (password, userPassword) => {
        return await bcrypt.compare(password, userPassword)
    },

    callBankingApi: async(endpoint, method = 'GET', payload = {}) => {

        if(!endpoint) {
            return {}
        }
        const url = API_URL + endpoint
        const { data } = await axios({
            method: method,
            url: url,
            data: payload
        })
        return { data }
    }
}
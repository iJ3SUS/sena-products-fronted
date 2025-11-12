import { freeze } from '@/utils/utils'

export const getPriceWithoutVAT = (price, tax) => {
    return Number((price / (1 + (tax/100))).toFixed(2))
}

export const calculateTax = (price, tax) => {
    return Number((price * (tax/100)).toFixed(2))
}

export const getTax = (taxes, id) => {

    const tax = taxes.find(e => e.id == id)

    return tax ? freeze(tax) : null

}
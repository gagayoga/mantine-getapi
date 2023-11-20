import {API} from '@/common/api'

export async function getProduct(skip) {
    const data = await API.get(`/get-products?skip=${skip}`)  
    return data
} 
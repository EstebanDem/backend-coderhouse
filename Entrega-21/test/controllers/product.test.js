const axios = require('axios');

test('[GET] api/productos/:non-existent-id returns product not found', async() => {
    const nonExistentProductUrl = 'http://localhost:3031/api/productos/non-existent-id';

    const response = await axiosGet(nonExistentProductUrl);
    expect(response.status).toBe(400)
    expect(response.data).toHaveProperty('error', 'product not found')

});

test('[PUT] api/productos/:non-existent-id returns product not found or invalid body content', async() => {
    const nonExistentProductUrl = 'http://localhost:3031/api/productos/non-existent-id';
    const body = {}
    const response = await axiosPut(nonExistentProductUrl, body);
    expect(response.status).toBe(404)
    expect(response.data).toHaveProperty('error', 'product not found or invalid body content.')

});

const axiosGet = async (url) => {
    let response;
    try {
        response = await axios.get(url);
    } catch (err) {
        response = err.response
    }
    return response;

};

const axiosPut = async (url, object) => {
    let response;
    try {
        response = await axios.put(url, object);
    } catch (err) {
        response = err.response
    }
    return response;

};



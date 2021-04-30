import * as api from './api.js';

const host = 'https://parseapi.back4app.com';

api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllCountries() {
    return await api.get(host + '/classes/countries');
}

export async function getCountryByID(id) {
    return await api.get(host + `/classes/countries/${id}`);
}

export async function editCountry(id, data) {
    return await api.put(host + `/classes/countries/${id}`, data);
}

export async function deleteCountry(id) {
    return await api.del(host + `/classes/countries/${id}`);
}

export async function createCountry(data) {
    return await api.post(host + '/classes/countries', data);
}
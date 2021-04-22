import * as api from './api.js';

const userHost = 'https://parseapi.back4app.com';
const dataHost = ''

api.settings.userHost = userHost;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllCountries() {
    return await api.get(userHost + '/classes/countries');
}
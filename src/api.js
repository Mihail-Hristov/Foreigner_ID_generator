export const settings = {
    host: '',
}


async function reguest(url, option) {
    try {
        const response = await fetch(url, option);

        if (!response.ok) {
            const error = await response.json();
            return alert(error.message);
        }

        try {
            const data = await response.json();
            return data;
        } catch {
            return response;
        }
    } catch (err) {
        alert(err.message);
        //throw new Error(err.message);
    }
}

function getOption(method = 'get', body) {
    const option = {
        method,
        headers: {
            'X-Parse-Application-Id': 'WBP7h9AyU5TzyTPR2Rt5VrVN9wH7WjU1spFMxgmS',
            'X-Parse-REST-API-Key': 'PkmhA1cAWzSQYQKmEPx0XjXeX70dSitetaSyinsp',
        }
    }

    const token = sessionStorage.getItem('authToken');

    if (token) {
        option.headers['X-Parse-Session-Token'] = token;
    }

    if (body) {
        option.headers['Content-Type'] = 'application/json';
        option.body = JSON.stringify(body);
    }

    return option;
}

export async function login(username, password) {
    const obj = {
        username,
        password
    }

    const result = await post(settings.host + '/login', obj);

    sessionStorage.setItem('authToken', result.sessionToken);
    sessionStorage.setItem('userId', result.objectId);

    return result;
}


export async function logout() {
    const result = await get(settings.host + '/users/me');

    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');

    return result;
}

export async function get(url) {
    return await reguest(url, getOption());
}

export async function post(url, data) {
    return await reguest(url, getOption('post', data));
}

export async function put(url, data) {
    return await reguest(url, getOption('put', data));
}

export async function del(url) {
    return await reguest(url, getOption('delete'));
}
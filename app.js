import page from './node_modules/page/page.mjs';
import { render } from './node_modules/lit-html/lit-html.js';
import { logout } from './src/data.js'

import { homePage } from './views/home.js';
import { adminPage } from './views/admin.js';
import { loginPage } from './views/login.js';

page('/', setupRender, homePage);
page('/admin', setupRender, adminPage);
page('/login', setupRender, loginPage);

const main = document.getElementById('site-content');
document.getElementById('logoutLink').addEventListener('click', logoutUser);

setUserNav('home')
page.start();

function setupRender(ctx, next) {
    ctx.render = (context) => render(context, main);

    ctx.setUserNav = setUserNav;

    next();
}

function setUserNav(activate) {
    const token = sessionStorage.getItem('authToken');
    const btns = {
        'home': document.getElementById('homeLink'),
        'admin': document.getElementById('adminLink'),
        'login': document.getElementById('loginLink'),
    }

    if (token) {
        document.querySelector('#user').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
    } else {
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
    }

    for (const key in btns) {
        if (btns[key].classList == 'active') {
            btns[key].classList.remove('active');
        }
    }

    if (activate) {
        btns[activate].classList = 'active';
    }

}

async function logoutUser(ev) {
    ev.preventDefault();

    await logout();

    page.redirect('/home');
}
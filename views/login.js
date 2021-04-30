import { html } from '../node_modules/lit-html/lit-html.js';

import { login } from '../src/data.js';

const loginTemplate = (onSubmit) => html `
<section id="login">
    <div class="login">
        <form @submit=${onSubmit} id="login-form" action="#" method="post">
            <h1>Вход</h1>
            <hr>

            <p>Имейл</p>
            <input placeholder="example@domain.bg" name="username" type="text">

            <p>Парола</p>
            <input type="password" placeholder="Въведете парола" name="password">
            <input type="submit" class="registerbtn" value="Вход">
        </form>
    </div>
</section>
`;

export function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));
    ctx.setUserNav('login')

    async function onSubmit(ev) {
        ev.preventDefault();

        const loginForm = new FormData(ev.target);

        const username = loginForm.get('username');
        const password = loginForm.get('password');

        if(!username || !password) {
            return alert('Моля попълнете всички полета!');
        }

        const data = await login(username, password);

        ctx.page.redirect('/');
    }
}
import { html } from '../node_modules/lit-html/lit-html.js';

import { login } from '../src/data.js';

const loginTemplate = (onSubmit) => html `
<section id="login">
    <div class="login">
        <form @submit=${onSubmit} id="login-form" action="#" method="post">
            <h1>Login form</h1>
            <hr>

            <p>Email</p>
            <input placeholder="example@domain.bg" name="email" type="text">

            <p>Password</p>
            <input type="password" placeholder="Password..." name="password">
            <input type="submit" class="registerbtn" value="Login">
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

        const username = loginForm.get('email');
        const password = loginForm.get('password');

        if(!username || !password) {
            return alert("Please fill all fields!");
        }

        const data = await login(username, password);

        ctx.page.redirect('/');
    }
}
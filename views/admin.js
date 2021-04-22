import { html } from '../node_modules/lit-html/lit-html.js';

import { getAllCountries } from '../src/data.js';

const adminTemplate = (data, edit) => html`
<table id="table">
        <thead>
        <tr>
        <td colspan="3">
            <input type="text" id="searchField" />
            <button type="button" id="searchBtn">Search</button>
        </td>
        <tr>
        <th>Код на държава</th>
        <th>Име на държава</th>
        <th>Действие</th>
    </tr>
        </thead>
       
        <tbody>
        ${data.results.map(elementTemplate)}
        </tbody>
    </table>
`;

const elementTemplate = (element) => html`
            <tr>
                <td>${element.countryId}</td>
                <td>${element.countryName}</td>
                <td><i id='edit' class="fas fa-edit"></i></td>
            </tr>
`;

export async function adminPage(ctx) {
    const data = await getAllCountries();

    console.log(data);
    ctx.render(adminTemplate(data));
    ctx.setUserNav('admin')

    document.getElementById('edit').addEventListener('click', edit)

    function edit(ev) {
        console.log(ev.target.parentNode.parentNode);
    }
}
import { html } from '../node_modules/lit-html/lit-html.js';
import { deleteCountry } from '../src/data.js'

import { getAllCountries } from '../src/data.js';

const adminTemplate = (data, addNewItem , onsubmit, ctx) => html`

<div class="headerAdmin">
    <button @click=${addNewItem} class="create" href="/create">New</button>
    <form @submit=${onsubmit} class="search">
        <input type="text" placeholder="Search.." name="search">
        <button type="submit"><i class="fa fa-search"></i></button>
    </form>
</div>
<table id="table">
        <thead>
        <tr>
        <th>Код на държава</th>
        <th>Име на държава</th>
        <th>Действие</th>
    </tr>
        </thead>
       
        <tbody>
        ${data.results.map(t => html`
        <tr>
            <td>${t.countryId}</td>
            <td>${t.countryName}</td>
            <td>
                <a href=/edit/${t.objectId} class="fa fa-edit"></a>
                <a @click=${async () => {
                    const confirmation = confirm('Are you sure!');

                    if(!confirmation) {
                        return;
                    }
            
                    try{
                        const result = await deleteCountry(t.objectId);
                    }catch {

                    }finally {
                        ctx.render(adminTemplate(data, addNewItem, onsubmit, ctx));
                    }
                }
                }
                }} class="fa fa-close"></a>
            </td>
        </tr>
        `)}
        </tbody>
    </table>
`;

export async function adminPage(ctx) {
    const data = await getAllCountries();

    console.log(data);
    ctx.render(adminTemplate(data, addNewItem, onsubmit, ctx));
    ctx.setUserNav('admin')

    function onsubmit(ev) {
        ev.preventDefault();

        const searchForm = new FormData(ev.target);
        const search = searchForm.get('search').trim();

        ctx.render(adminTemplate(data, onsubmit, search));
    }

    function addNewItem() {
        ctx.page.redirect('/create');
    }
}
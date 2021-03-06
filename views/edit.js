import { html } from '../node_modules/lit-html/lit-html.js';

import { getCountryByID, editCountry } from '../src/data.js'

const editTemplate = (onsubmit, data, cancel) => html `
<section class="container">
  <form @submit=${onsubmit} action="action_page.php">
    <div class="row">
      <div class="col-25">
        <label for="code">Country code</label>
      </div>
      <div class="col-75">
        <input type="text" id="code" name="code" value="${data.countryId}">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="country">Country name</label>
      </div>
      <div class="col-75">
        <input type="text" id="country" name="country" value="${data.countryName}">
      </div>
    </div>
   
    <div class="row">
      <input type="submit" value="Save">
      <button @click=${cancel} class="cancelBtn">Cancel</buuton>
    </section>
  </form>
</div>

`;

export async function editPage(ctx) {
    const id = ctx.params.id;

    const data = await getCountryByID(id);

    ctx.render(editTemplate(onsubmit, data, cancel));

    async function onsubmit(ev) {
        ev.preventDefault();

        const editForm = new FormData(ev.target);

        let countryId = editForm.get('code');
        const countryName = editForm.get('country');

        if(countryId.length < 2 || countryId.length > 2) {
          return alert('Code of the country must be exactly 2 characters!');
        }

        countryId = countryId.toUpperCase();

        const obj = {
          countryId,
          countryName
        }

        await editCountry(id, obj)

        ctx.page.redirect('/admin')
    }

    function cancel(ev) {
      ev.preventDefault()

      ctx.page.redirect('/admin')
    }
}
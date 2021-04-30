import { html } from '../node_modules/lit-html/lit-html.js';

import { createCountry } from '../src/data.js'

const createTemplate = (onSubmit) => html `
<section class="container">
  <form @submit=${onSubmit} action="action_page.php">
    <div class="row">
      <div class="col-25">
        <label for="code">Код</label>
      </div>
      <div class="col-75">
        <input type="text" id="code" name="code">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="country">Държава</label>
      </div>
      <div class="col-75">
        <input type="text" id="country" name="country">
      </div>
    </div>
   
    <div class="row">
      <input type="submit" value="Запази">
    </section>
  </form>
</div>

`;

export function createPage(ctx) {
    ctx.render(createTemplate(onSubmit))

    async function onSubmit(ev) {
      ev.preventDefault();

      const createForm = new FormData(ev.target);

      let countryId = createForm.get('code');
      const countryName = createForm.get('country');

      if(countryId.length < 2 || countryId.length > 2) {
        return alert('Кода на държавата трябва да е от два символа!');
      }

      countryId = countryId.toUpperCase();

      const obj = {
        countryId,
        countryName
      }

      await createCountry(obj);

      ctx.page.redirect('/admin');
    }
}
import { html } from '../node_modules/lit-html/lit-html.js';

import { getAllCountries } from '../src/data.js'

const homeTemplate = (onsubmit, data, newID) => html`
<section class="container">
  <form @submit=${onsubmit} action="action_page.php">
    <div class="row">
      <div class="col-25">
        <label for="fname">Име</label>
      </div>
      <div class="col-75">
        <input type="text" id="fname" name="firstname" placeholder="Собствено име">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="lname">Фамилия</label>
      </div>
      <div class="col-75">
        <input type="text" id="lname" name="lastname" placeholder="Фамилно име">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="Birthday">Дата на раждане</label>
      </div>
      <div class="col-75">
        <input type="date" id="birthday" name="birthday">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="country">Държава</label>
      </div>
      <div class="col-75">
        <select id="country" name="country">
          ${data.results.map(optionTemplate)}
        </select>
      </div>
    </div>
   
    <div class="row">
      <input type="submit" value="Генерирай">
    </section>
  </form>
</div>

${newID ? html`<aside><p>${newID}</p></aside>` : ''}

`;

const optionTemplate = (element) => html`
<option value="${element.countryId}">${element.countryName}</option>
`;

export async function homePage(ctx) {
  const data = await getAllCountries();

  ctx.render(homeTemplate(onsubmit, data));
  ctx.setUserNav('home');

  function onsubmit(ev) {
    ev.preventDefault();

    const form = new FormData(ev.target);

    const firstName = form.get('firstname');
    const lastName = form.get('lastname');
    const country = form.get('country');
    let birthday = form.get('birthday');

    if (!firstName || !lastName || !birthday) {
      return alert("Моля попълнете всички полета!");
    }

    const id = firstName.charAt(0) + lastName.charAt(0) + country + birthday;

    ctx.render(homeTemplate(onsubmit, data, id));

  }
}
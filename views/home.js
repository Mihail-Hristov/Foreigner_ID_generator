import { html } from '../node_modules/lit-html/lit-html.js';
import { until } from '../node_modules/lit-html/directives/until.js';

import { getAllCountries } from '../src/data.js'

const homeTemplate = (onsubmit, data) => html`
<section class="container">
  <form @submit=${onsubmit} action="action_page.php">
    <div class="row">
      <div class="col-25">
        <label for="fname">First name</label>
      </div>
      <div class="col-75">
        <input type="text" id="fname" name="firstname" placeholder="First name">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="lname">Last name</label>
      </div>
      <div class="col-75">
        <input type="text" id="lname" name="lastname" placeholder="Last name">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="Birthday">Date of birth</label>
      </div>
      <div class="col-75">
        <input type="date" id="birthday" name="birthday">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="country">Country of birth</label>
      </div>
      <div class="col-75">
        <select id="country" name="country">
          ${data.results.map(optionTemplate)}
        </select>
      </div>
    </div>
   
    <div class="row">
      <input type="submit" value="Generate">
    </section>
  </form>
</div>

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

    const firstName = form.get('firstname').trim();
    const lastName = form.get('lastname').trim();
    const country = form.get('country');
    let birthday = form.get('birthday');

    if (!firstName || !lastName || !birthday) {
      return alert("Please fill all fields!");
    }

    if(birthday.includes('/')) {
      birthday.replaceAll('/', '.')
    }else if(birthday.includes('-')) {
      birthday = birthday.replaceAll('-', '.')
    }else {
      alert('Please input the correct date format!');
      return;
    }

    const birthdayArray = birthday.split('.');


    birthday = birthdayArray[2].substring(2) + birthdayArray[1] + birthdayArray[0];

    const id = birthday + firstName.charAt(0) + lastName.charAt(0) + country;
    
    document.querySelector('#personName').innerHTML = `${firstName} ${lastName}`;
    document.querySelector('#result').innerHTML = id;

    const modal = document.getElementById('idModal');

    modal.style.display = 'block';

    document.querySelector('.close').addEventListener('click', function() {
      modal.style.display = 'none';
    });

  }
}

const spin = () => html `
<div class="loader"></div>
`;
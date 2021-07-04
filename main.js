"use strict";

window.onload = () => {
  var countries, list;

  countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

  countries.forEach(function(element) {
    list = document.createElement('li');
    list.innerHTML = element;
    document.getElementById('autocomplete').appendChild(list);
  });

  const input = document.getElementById('city');

  input.onkeyup = () => {
    var inputUpper, ul, li;

    ul = document.querySelector('#autocomplete');

    if (input.value == "") {
      ul.style.display = "none";
    }
    else {
      ul.style.display = "block";
    }

    inputUpper = input.value.toUpperCase();

    li = document.querySelectorAll('#autocomplete li');

    li.forEach(function(LI) {
      if (LI.innerHTML.toUpperCase().indexOf(inputUpper) > -1) {
        LI.style.display = "block";

        LI.onclick = () => {
          ul.style.display = "none";
          input.value = LI.innerHTML;

          weather(window.event);

        };

      }
      else {
        LI.style.display = "none";
      }
    });

  };

}

function weather(e) {
  e.preventDefault();

  const inputV = document.getElementById('city').value;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputV}&appid=0fa169ed92520fa2c7ffad854d1f54d9`)
    .then(response => response.json())
    .then(data => {

      document.getElementById('temperature').innerHTML = (data.main.temp - 273.15).toFixed(0) + "&deg;C";

      document.getElementById('cityName').innerText = data.name;
    })

}

let popup = document.getElementById('popup');
let overlay = document.getElementById('overlay');


function openPopup() {
  popup.style.transform = "scaleY(1)";
  overlay.style.visibility = "visible";
}

function closePopup() {
  popup.style.transform = "scaleY(0)";
  overlay.style.visibility = "hidden";
}

function changeTheme() {
  let body = document.getElementById('body');
  let themeColor = document.getElementById('themeColor');

  if (localStorage.getItem('weatherMode') == "light") {
    body.style.backgroundImage = `url(dark.jpeg)`;
    themeColor.content = "#6262C1";
    localStorage.setItem('weatherMode', 'dark');
  }

  else if (localStorage.getItem('weatherMode') == "dark") {
    body.style.backgroundImage = `url(light.jpeg)`;
    themeColor.content = "#F6A945";
    localStorage.setItem('weatherMode', 'light');
  }

  closePopup();

}
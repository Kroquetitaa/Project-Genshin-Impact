import './style.css';

const api = async () => {
  const petitionAPI = await fetch("https://api.genshin.dev");
  const convertToJSON = await petitionAPI.json();
  const data = convertToJSON.types;
  getNavbarTemplate(data);
};

const getNavbarTemplate = (list) => {
  const headerContent = document.querySelector("#nav");
  for (let i = 0; i < list.length; i++) {
    generateHTML(
      headerContent,
      ` 
            <ul class="list">
                <li class="list--title">
                    <a href='#'>${list[i]}</a>
                </li>
            </ul>
`
    );
  }
};

const generateHTML = (content, figure) => {
  content.innerHTML += figure;
};

api();

import "./style.css";

const api = async () => {
  const petitionAPI = await fetch("https://api.genshin.dev");
  const convertToJSON = await petitionAPI.json();
  const data = convertToJSON.types;
  selectedCharacter(data);
};

const selectedCharacter = (list) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === "characters") {
      petitionCharacters(list[i]);
    }
  }
};

const petitionCharacters = async (data) => {
  const petitionAPI = await fetch("https://api.genshin.dev" + "/" + data);
  const allCharacters = await petitionAPI.json();
  for (let i = 0; i < allCharacters.length; i++) {
    const characteristics = await fetch(
      "https://api.genshin.dev" + "/" + data + "/" + allCharacters[i]
    );
    const info = await characteristics.json();
    newObject(info);
  }
};

const newObject = (list) => {
  return getListTemplate({
    nombre: list.name,
    vision: list.vision,
    arma: list.weapon,
    afiliacion: list.affiliation,
    rareza: list.rarity,
    contelacion: list.constellation,
    cumpleaños: list.birthday,
    descripcion: list.description,
    talentos: list.skillTalents.map((value) => {
      return {
        nombreTalento: value.name,
        desbloqueo: value.unlock,
        descripcion: value.description,
        tipo: value.type,
      };
    }),
    talentosPasivos: list.passiveTalents.map((value) => {
      return {
        nombreTalentoPasivo: value.name,
        desbloqueo: value.unlock,
        descripcion: value.description,
        nivel: value.level,
      };
    }),
    constelacion: list.constellations.map((value) => {
      return {
        nombreConstelacion: value.name,
        desbloqueo: value.unlock,
        descripcion: value.description,
        nivel: value.level,
      };
    }),
    vision: list.vision_key,
    tipoArma: list.weapon_type,
  });
};

const getListTemplate = (object) => {
  const div = document.querySelector("#cards");
    console.log( )
    generateHTML( div, 
        `
        <div class="card--list">
            <div class="info">
                <h2>Nombre: ${ object.nombre } Vision: ${object.vision}</h2>
                <p>Tipo de arma: ${object.arma} Rareza: ${object.rareza}<p>
                <p>Descripcion: ${object.descripcion}<p>
            </div>
            <div class="talents">
                <h2>Talentos</h2>
                <p>${ object.talentos.map( value => value.nombreTalento + '</br>' ) }</p>
                <p>${ object.talentos.map( value => value.desbloqueo + '</br>' ) }</p>
                <p>${ object.talentos.map( value => value.tipo + '</br>' ) }</p>
            </div>
            <div class="passiveTalents">
                <h2>Talentos Pasivos</h2>
                <p>Nombre talento: ${ object.talentosPasivos.map( value => value.nombreTalentoPasivo + '</br>' ) }</p>
                <p>Desbloqueo: ${ object.talentosPasivos.map( value => value.desbloqueo + '</br>' ) }</p>
                <p>Niveles: ${ object.talentosPasivos.map( value => value.nivel + '</br>' ) }</p>
            </div>
            <div class="constellation">
                <h2>Constelacciones</h2>
                <p>Constelacion: ${ object.constelacion.map( value => value.nombreConstelacion + '</br>' ) }</p>
                <p>Desbloqueo: ${ object.constelacion.map( value => value.desbloqueo + '</br>' ) }</p>
                <p>Niveles: ${ object.constelacion.map( value => value.nivel ) }</p>
            </div>
        </div>
        `)
};

const generateHTML = (content, figure) => {
  content.innerHTML += figure;
};

api();

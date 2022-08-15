import './style.css'

const generateFooter = () =>  {
    const footer = document.querySelector('#footer')
    return generateHTML( footer,
        `<ul class="footer-class">
            <li>
                <a href='#'>Copyrigth</a>
            </li>
            <li>
                <a href='#'>Genshin Impact</a>
            </li>
            <li>
                <a href='#'>Derechos reservados</a>
            </li>
        </ul>`
    )
}


const generateHTML = ( container, figure ) => {
    container.innerHTML += figure;
}

generateFooter();
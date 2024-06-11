/* ================== LANGUAGE =========================*/
const flags = document.querySelector("#flags");
const resume = document.getElementById('resume');
const languageDiv = document.querySelector('.nav__language');

const changeLanguage = async (language) => {
    const requestJson = await fetch(`./asset/translation/${language}.json`);
    const text = await requestJson.json();

    const textsToChange = document.querySelectorAll("[data-section]");
    for (const textToChange of textsToChange) {
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;
        
        textToChange.innerHTML = text[section][value];
    }

    const placeholdersToChange = document.querySelectorAll("[data-placeholder-section]");
    for (const placeholderToChange of placeholdersToChange) {
        const section = placeholderToChange.dataset.placeholderSection;
        const value = placeholderToChange.dataset.placeholderValue;
        
        placeholderToChange.placeholder = text[section][value];
    }

    localStorage.setItem('language', language);
};

const updateFlagAndLanguage = (language) => {
    if (language === 'it') {
        resume.href = 'resume/resumeITA.pdf';
        flags.src = './asset/flag-2.png';
        languageDiv.setAttribute('data-language', 'it');
    } else {
        resume.href = 'resume/resumeENG.pdf';
        flags.src = './asset/flag-1.png';
        languageDiv.setAttribute('data-language', 'en');
    }
};

const handleLanguageChange = () => {
    const currentLanguage = languageDiv.getAttribute('data-language');
    const newLanguage = currentLanguage === 'en' ? 'it' : 'en';
    
    updateFlagAndLanguage(newLanguage);
    changeLanguage(newLanguage);
};

flags.addEventListener("click", handleLanguageChange);

document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    updateFlagAndLanguage(savedLanguage);
    changeLanguage(savedLanguage);
});




/*=============== SWIPER ===============*/
window.onload = function() {
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
      
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
    });
};




document.addEventListener('DOMContentLoaded', function() {

    /* ============= BACKGROUND ================ */
    const starsContainer = document.querySelector('.stars');
    const viewportHeight = window.innerHeight;

    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');

        const randomTopOffset = Math.floor(Math.random() * viewportHeight);
        const randomLeftOffset = Math.floor(Math.random() * 100); 
        const randomFallDuration = Math.floor(Math.random() * 6) + 4;

        star.style.setProperty('--top-offset', `${randomTopOffset}px`);
        star.style.setProperty('left', `${randomLeftOffset}%`);
        star.style.setProperty('--fall-duration', `${randomFallDuration}s`);

        starsContainer.appendChild(star);
    }

    const numberOfStars = Math.floor(Math.random() * 3) + 1;
    let starCreationDelay = 0;
    for (let i = 0; i < numberOfStars; i++) {
        setTimeout(createStar, starCreationDelay); 
        starCreationDelay += Math.floor(Math.random() * 500) + 200;
    }



    /*=============== SHOW MENU ===============*/
    const navMenu = document.getElementById('nav-menu'),
          navToggle = document.getElementById('nav-toggle'),
          navClose = document.getElementById('nav-close'),
          navLinks = document.querySelectorAll('.nav__link');


    if(navToggle){
        navToggle.addEventListener('click', () =>{
            navMenu.classList.add('show-menu')
        })
    }

    if(navClose){
        navClose.addEventListener('click', () =>{
            navMenu.classList.remove('show-menu')
        })
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    window.addEventListener('click', function(e){
	
        if (document.getElementById('nav-menu').contains(e.target) || document.getElementById('nav-toggle').contains(e.target)){
            console.log("Clicked in Box");
        } else{
            console.log("Clicked outside Box");
            if(navMenu.classList.contains('show-menu')){
                navMenu.classList.remove('show-menu')
            }
        }
    })



    /* ============== ARROW SECTION =============== */
    setTimeout(function() {
        document.getElementById('arrow-section-hero').classList.add('visible');
    }, 3000);

    setTimeout(function() {
        document.getElementById('arrow-section-about').classList.add('visible');
    }, 3000);



    /*=============== ACTIVE MODAL ===============*/
    const workLink = document.querySelectorAll('.work__button'),
          workModal = document.querySelectorAll('.work__modal'),
          modalClose = document.querySelectorAll('.modal__close'),
          body = document.getElementById('body')

    workLink.forEach((link, index) => {
        link.addEventListener('click', () => {
            workModal[index].classList.add('active-modal');
            body.classList.add('noscroll')
        });
    });

    modalClose.forEach((close, index) => {
        close.addEventListener('click', () => {
            workModal[index].classList.remove('active-modal');
            body.classList.remove('noscroll')
        });
    });


    /*=============== EMAIL JS ===============*/
    const contactForm = document.getElementById('contact-form'),
          contactResult = document.getElementById('contact-result');

    const sendEmail = (e) => {
        e.preventDefault()

        const currentLanguage = languageDiv.getAttribute('data-language');

        emailjs.sendForm('service_ud22ufw', 'template_4ujjrh5', '#contact-form', 'BTe_Ulf2y7uirNrgV')
            .then(() => {
                console.log(currentLanguage);
                if(currentLanguage == 'en'){
                    contactResult.textContent = 'Status: message sent successfully ✅'

                    setTimeout(() => {
                        contactResult.textContent = 'Status: message not sent ⏳'
                    }, 5000)
                }
                else{
                    contactResult.textContent = 'Stato: messaggio inviato con successo ✅'

                    setTimeout(() => {
                        contactResult.textContent = 'Stato: messaggio non inviato ⏳'
                    }, 5000)
                }
                
                contactForm.reset()
            }, () => {

                if(currentLanguage == 'en'){
                    contactResult.textContent = 'Status: service error ❌'
                }
                else{
                    contactResult.textContent = 'Stato: errore di servizio ❌'
                }
        })
    }

    contactForm.addEventListener('submit', sendEmail)
});

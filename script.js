// Visar/döljer text i teknikboxarna och justerar höjden
function toggleText(id) {
    var text = document.getElementById(id); // Hittar elementet med det givna id:t
    var box = text.closest('.tech-item'); // Hittar närmaste förälder-element med klassen 'tech-item'

    // Kollar om texten är dold (display är "none" eller tom sträng)
    if (text.style.display === "none" || text.style.display === "") {

        text.style.display = "block"; // Om texten är dold, visa den genom att sätta display till "block"
        box.style.height = "auto";  // // Sätt höjden på boxen till "auto" för att anpassa till innehållet
    } else {
        text.style.display = "none"; // Om texten visas, döljs den genom att sätta display till "none"
        box.style.height = "280px"; // Återställer boxens höjd till ursprunglig strl 280px
    }
}

// Växlar visning av modaler
function toggleModal(id) {
    const modal = document.getElementById('modal-' + id); // Hittar modal-elementet baserat på id
    const overlay = document.querySelector('.overlay');  // Hittar overlay-elementet
    
    // Växlar active class på både modal och overlay
    modal.classList.toggle('active');
    overlay.classList.toggle('active');
}


// Bildspelsfunktion - kör bara om elementen finns

document.addEventListener('DOMContentLoaded', function() {
    // Hittar alla slides
    const slides = document.querySelectorAll('.slide');

    if (slides.length > 0) {  // Kontrollera att vi har slides
        let currentSlide = 0;
        const totalSlides = slides.length;

        // Funktion för att visa specifik slide
        function showSlide(n) {
            slides.forEach(slide => slide.style.opacity = '0');
            slides[n].style.opacity = '1';
        }
        // // Funktion för att byta till nästa slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        // Starta bildspelet
        showSlide(0); // Visa första bilden
        setInterval(nextSlide, 5000); // Byt bild var 5:e sekund
    }
});


// HEADER-LADDNING
// med hamburger-funktionalitet
// Laddar header.html-innehållet dynamiskt
document.addEventListener('DOMContentLoaded', function() {
    // Hittar element där headern ska placeras
    const headerContainer = document.getElementById('header-container');
    
     // Kontrollerar om elementet hittades
    if (!headerContainer) {
        console.error('Kunde inte hitta header-container elementet');
        return;
    }

     // Försöker hämta header.html
    fetch('header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })

        // Om hämtningen lyckades:
        // 1. Lägger in header-innehållet
        // 2. Aktiverar hamburgermenyn

        .then(data => {
            headerContainer.innerHTML = data;
            // Initiera hamburger-menyn efter att headern har laddats
            initHamburgerMenu();
        }) 

        // Om något går fel:
        // 1. Loggar felet
        // 2. Lägger in en backup-navigation
        .catch(error => {
            console.error('Problem med att ladda header:', error);
            headerContainer.innerHTML = `
                <header class="main-header">
                    <nav class="nav-menu">
                        <ul>
                            <li><a href="index.html">Startsida</a></li>
                            <li><a href="om-mig.html">Om mig</a></li>
                            <li><a href="teknik.html">Teknik</a></li>
                            <li><a href="kontakt.html">Kontakt</a></li>
                            <li><a href="cv.html">CV</a></li>
                        </ul>
                    </nav>
                </header>`;
        });
});


/* 
Initierar hamburgermenyn för mobila enheter
Hanterar klick-events för att visa/dölja menyn 
*/
function initHamburgerMenu() {
    // Hittar hamburger-knappen och navigationsmenyn i DOM:en
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Kontrollerar att både hamburger-knappen och menyn finns
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() { // Lägger till en click-eventlyssnare på hamburger-knappen
            
            console.log('Hamburger clicked'); // Loggar klicket i konsolen (för debugging)
            navMenu.classList.toggle('active'); // Växlar mellan att visa/dölja navmenu genom att toggla 'active' klassen
            hamburger.classList.toggle('active'); 
            // Växlar också 'active' på hamburger-knappen för att 
            // visa visuell feedback (animering av knappen)
        });
    }
}

// MODAL FUNKTIONER
/*
Öppnar/stänger modaler (popup-fönster)
Hanterar overflow på body
Döljer sökrutan på små skärmar när modal är öppen
*/
function openModal(modalId) {

    // Hämtar modal-elementet med det angivna ID:t
    const modal = document.getElementById(modalId);
    // Hämtar sökrutan som kan behöva döljas
    const searchSection = document.querySelector('.search-section');

    if (modal) {
        // Gör modalen synlig genom att ändra display-egenskapen
        modal.style.display = "block";
        
        // Väntar 10ms innan vi lägger till show-klassen
        // Möjliggör CSS-övergångar/animationer
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        document.body.style.overflow = 'hidden'; // Förhindrar scrollning på huvudsidan när modalen är öppen
        document.body.classList.add('modal-open'); // Lägger till en klass som kan användas för styling
        
        // Om skärmen är mindre än 600px bred
        if (window.innerWidth <= 600) {
            searchSection.style.display = 'none'; // Dölj sökrutan för bättre mobil-upplevelse
        }
    }
}

// Funktion för att stänga modal
function closeModal(modalId) {
    // Hämtar modal-elementet som ska stängas
    const modal = document.getElementById(modalId);
    // Hämtar sökrutan som ska visas igen
    const searchSection = document.querySelector('.search-section');
    
    if (modal) {
        modal.classList.remove('show'); // Tar bort show-klassen = tar bort 'show' = modalen tonar ut mjukt
        
        // Väntar 300ms (samma tid som CSS-transition) innan modalen döljs helt
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);

        document.body.style.overflow = ''; // Återaktiverar scrollning på huvudsidan   
        document.body.classList.remove('modal-open'); // Tar bort modal-open klassen
        searchSection.style.display = ''; // Visar sökrutan igen
    }
}

// Funktion som körs när användaren klickar någonstans i fönstret
window.onclick = function(event) {
    // Kontrollerar om klicket var på modal-bakgrunden (utanför innehållet)
    if (event.target.classList.contains('modal')) {

        event.target.style.display = "none"; // Döljer modalen
        document.body.style.overflow = ''; // Återaktiverar scrollning      
        document.body.classList.remove('modal-open'); // Tar bort modal-open klassen
    }
}


//SÖKFUNKTION
/*
Söker i modalernas innehåll
Visar sökresultat i en ny modal
Hanterar "inga resultat" fall
*/
// Huvudsökfunktion som hanterar sökning i innehållet
function searchContent(searchText) {
    // Hämtar alla existerande modaler (popup-fönster)
    const existingModals = document.querySelectorAll('.modal');
    // Stänger alla öppna modaler först
    existingModals.forEach(modal => {
        modal.style.display = 'none';  // Döljer modalen
        modal.classList.remove('show'); // Tar bort show-klassen som visar modalen
    });
 
    // Hämtar alla modaler som ska sökas igenom
    const modals = document.querySelectorAll('.modal');
    // Flagga för att hålla koll på om några resultat hittades
    let foundResults = false;
    // Variabel för att bygga upp HTML för sökresultaten
    let resultsHtml = '';
 
    // Går igenom varje modal och letar efter söktexten
    modals.forEach(modal => {
        // Gör om innehållet till små bokstäver för att göra sökningen skiftlägesokänslig
        const content = modal.textContent.toLowerCase();
        // Kontrollerar om söktexten finns i innehållet
        if (content.includes(searchText)) {
            foundResults = true; // Markerar att vi hittat minst ett resultat

            // Kopierar innehållet från modalen
            const modalContent = modal.querySelector('.modal-content').cloneNode(true);
            // Tar bort stäng-knappen från det kopierade innehållet
            const closeBtn = modalContent.querySelector('.close');
            if (closeBtn) closeBtn.remove();
            // Lägger till en klass för sökresultatens styling
            modalContent.classList.add('search-modal-content');
            // Lägger till det nya innehållet till resultat-HTML:en
            resultsHtml += modalContent.outerHTML;
        }
    });
 
    // Hämtar eller skapar modalen för sökresultat
    let searchModal = document.getElementById('searchResultModal');
    if (!searchModal) {
        // Skapar en ny modal om den inte finns
        searchModal = document.createElement('article');
        searchModal.id = 'searchResultModal';
        searchModal.className = 'modal';
        document.body.appendChild(searchModal);
    }
 
    // Fyller sökresultatmodalen med innehåll baserat på om resultat hittades
    if (foundResults) {
        // Om resultat hittades, visa dessa
        searchModal.innerHTML = `
            <section class="modal-content">
                <button class="close" onclick="closeModal('searchResultModal')">&times;</button>
                <h3>Sökresultat för "${searchText}"</h3>
                <section class="search-results">
                    ${resultsHtml}
                </section>
            </section>
        `;
    } else {
        // Om inga resultat hittades, visa meddelande om detta
        searchModal.innerHTML = `
            <section class="modal-content">
                <button class="close" onclick="closeModal('searchResultModal')">&times;</button>
                <h3>Inga resultat</h3>
                <p>Inga träffar hittades för "${searchText}"</p>
            </section>
        `;
    }
 
    // Öppnar modalen med sökresultaten
    openModal('searchResultModal');
 }
 
 // Funktion som hanterar själva sökformuläret
 function handleSearch(event) {
    // Förhindrar att formuläret skickas på vanligt sätt
    event.preventDefault();
    // Hämtar och omvandlar söktexten till små bokstäver
    const searchText = document.getElementById('tech-search').value.toLowerCase();
    
    // Kontrollerar att söktexten är minst 2 tecken lång
    if (searchText.length < 2) {
        alert('Vänligen skriv minst två tecken');
        return;
    }
    
    // Anropar huvudsökfunktionen
    searchContent(searchText);
 }
 

 // Funktion för att visa meddelande när inga resultat hittas
 function showNoResults(searchText) {
    // Hämtar eller skapar modal för "inga resultat"
    let searchModal = document.getElementById('searchModal');
    if (!searchModal) {  
        // Skapar ett nytt article-element
        searchModal = document.createElement('article');
        // Ger den ett ID så vi kan hitta den senare
        searchModal.id = 'searchModal';
        // Ger den klassen 'modal' för styling
        searchModal.className = 'modal';
        // Lägger till den i DOM:en
        document.querySelector('.modal-container').appendChild(searchModal);
    }
 
    // Sätter innehållet i modalen
    searchModal.innerHTML = `
        <section class="modal-content">
            <button class="close" onclick="closeModal('searchModal')" aria-label="Stäng">&times;</button>
            <h3>Inga resultat</h3>
            <p>Inga träffar hittades för "${searchText}"</p>
        </section>
    `;
    // Visar modalen
    openModal('searchModal');
 }
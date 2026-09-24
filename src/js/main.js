/* Your JS here. */
const diningData = {
    lunch: {
        title: "Lunch Recommendations",
        spots: [
            { name: "Jip Bap", desc: "Customizable Korean noodle and rice bowls. Quick and delicious."},
            { name: "Shawarma Joint", desc: "Very filling with great lunchtime deals! Pitas, bowls, wraps, and more."},
            { name: "Poke Lab", desc: "Fresh and versatile options make for a healthy and tasty lunch option."}
        ]
    },
    coffee: {
        title: "Coffee and Drink Recommendations",
        spots: [
            { name: "Sinclaire's Coffee", desc: "Arguably the best coffee on campus with two locations - Presby Hall and the law building."},
            { name: "Latea", desc: "Yummy boba and tea drinks! They also offer a weekly BOGO deal."},
            { name: "BrewLab/BakeLab", desc: "BrewLab for a convenient, tasty coffee or study spot and BakeLab for some of the best pastries on campus (in my opinion)"}
        ]
    },
    dinner: {
        title: "Dinner Recommendations",
        spots: [
            { name: "Oozu Ramen", desc: "Popular for a reason - such great ramen and a good sit-down atmosphere."},
            { name: "Dimsum House", desc: "Family-style meals with large and varied options. Always delicious no matter what I've tried!"},
            { name: "Bangkok Thai", desc: "A campus favorite, Bangkok has some of the best Thai food at UIUC."}
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {

    const modal = document.getElementById('modal-window');
    const openModalButton = document.getElementById('open-modal-btn');
    const closeModalButton = document.getElementById('close-modal-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    document.querySelectorAll('.dining-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            const data = diningData[category];

            if (data) {
                modalTitle.textContent = data.title;
                modalBody.innerHTML = data.spots.map(spot => `
                    <div class="spot-item">
                        <div class="spot-info">
                            <h4>${spot.name}</h4>
                            <p>${spot.desc}</p>
                        </div>
                    </div>
                `).join('');
                modal.classList.add('show');
            }
        });
    });

    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shrink');
        } else {
            navbar.classList.remove('shrink');
        }
    });

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-item');
    const updateNav = () => {
        let currentID = '';
        const position = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.body.offsetHeight;

        if (position + windowHeight >= docHeight - 10) {
            const lastSection = sections[sections.length - 1];
            if (lastSection) {
                currentID = lastSection.getAttribute('id');
            }
        } else {
            sections.forEach(section => {
                const sectiontop = section.offsetTop - 120;
                const sectionHeight = section.clientHeight;

                if (position >= sectiontop && position < sectiontop + sectionHeight) {
                    currentID = section.getAttribute('id');
                }
            });
        }
        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentID}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateNav);

    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetID = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetID);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    openModalButton.addEventListener('click', () => {
        modalTitle.textContent = "Things to Do in Champaign-Urbana";
        modalBody.innerHTML = `
            <div class="carousel-wrapper">
                <button id="modal-prev-btn" class="carousel-btn"><i class="fa-solid fa-chevron-left"></i></button>
                <div class="carousel-viewport">
                    <div id="modal-carousel-track" class="carousel-track">
                        <div class="carousel-slide">
                            <img src="assets/curtis_orchard.jpg" alt="Curtis Orchard">
                            <h4>Curtis Orchard</h4>
                            <p>A fun fall attraction offering apple picking, cider, and a gift shop.</p>
                        </div>
                        <div class="carousel-slide">
                            <img src="assets/japanese_gardens.jpg" alt="Japanese Gardens">
                            <h4>Japan House</h4>
                            <p>Beautiful Japanese gardens and a tea house offering traditional tea ceremonies. Borders the arboretum too!</p>
                        </div>
                        <div class="carousel-slide">
                            <img src="assets/downtown.jpeg" alt="Downtown">
                            <h4>Downtown Champaign/Urbana</h4>
                            <p>Explore different restaurants, bookstores, and local shops.</p>
                        </div>
                    </div>
                </div>
                <button id="modal-next-btn" class="carousel-btn"><i class="fa-solid fa-chevron-right"></i></button>
            </div>
        `;
        modal.classList.add('show');
        const modalTrack = document.getElementById('modal-carousel-track');
        const modalSlides = modalTrack.querySelectorAll('.carousel-slide');
        const modalPrevBtn = document.getElementById('modal-prev-btn');
        const modalNextBtn = document.getElementById('modal-next-btn');
        let modalCurridx = 0;

        //lines 159-170 suggested by Copilot
        const updateModalCarousel = () => {
            modalTrack.style.transform = `translateX(-${modalCurridx * 100}%)`;
        };

        modalNextBtn.addEventListener('click', () => {
            modalCurridx = (modalCurridx + 1) % modalSlides.length;
            updateModalCarousel();
        });

        modalPrevBtn.addEventListener('click', () => {
            modalCurridx = (modalCurridx - 1 + modalSlides.length) % modalSlides.length;
            updateModalCarousel();
        });
    });

    closeModalButton.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });

    const track = document.getElementById('carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const previousButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    let curridx = 0;
    const totalSlides = slides.length;

    //Copilot populated lines 182-194 based on lines 159-170
    if (track && previousButton && nextButton) {
        const updateCarousel = () => {
            track.style.transform = `translateX(-${curridx * 100}%)`;
        };

        nextButton.addEventListener('click', () => {
            curridx = (curridx + 1) % totalSlides;
            updateCarousel();
        });

        previousButton.addEventListener('click', () => {
            curridx = (curridx - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });
    }

});

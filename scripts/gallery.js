document.addEventListener('DOMContentLoaded', function () {
    loadGallery();
});


function loadGallery() {

    const images = document.querySelectorAll('.imageCert');

    images.forEach(image => {
        image.addEventListener('click', openImage);
    });

}


function openImage(e) {

    const image = e.currentTarget;


    // =========================================
    // Crear imagen ampliada
    // =========================================

    const fullImage = document.createElement('img');

    fullImage.src = image.src;
    fullImage.alt = image.alt;

    fullImage.classList.add('cert-lightbox__image');


    // =========================================
    // Crear lightbox
    // =========================================

    const lightbox = document.createElement('div');

    lightbox.classList.add('cert-lightbox');


    // =========================================
    // Crear botón cerrar
    // =========================================

    const closeButton = document.createElement('button');

    closeButton.type = 'button';
    closeButton.textContent = '×';

    closeButton.classList.add('cert-lightbox__close');

    closeButton.setAttribute(
        'aria-label',
        'Cerrar imagen'
    );


    // =========================================
    // Evento botón cerrar
    // =========================================

    closeButton.addEventListener('click', closeImage);


    // =========================================
    // Cerrar haciendo clic fuera de la imagen
    // =========================================

    lightbox.addEventListener('click', function (event) {

        if (event.target === lightbox) {
            closeImage();
        }

    });


    // =========================================
    // Agregar elementos
    // =========================================

    lightbox.appendChild(closeButton);
    lightbox.appendChild(fullImage);


    // =========================================
    // Agregar al documento
    // =========================================

    document.body.appendChild(lightbox);


    // =========================================
    // Bloquear scroll
    // =========================================

    document.body.classList.add('fijarBody');

}


function closeImage() {

    const lightbox = document.querySelector('.cert-lightbox');

    if (lightbox) {
        lightbox.remove();
    }

    document.body.classList.remove('fijarBody');

}
document.addEventListener("DOMContentLoaded", () => {

    /**
     * Inicializa un carrusel
     * @param {HTMLElement} carrusel
     * @param {string[]} imagenes
     */
    function crearCarrusel(carrusel, imagenes) {

        const track = carrusel.querySelector(".galeriaCarousel__track");
        const btnPrev = carrusel.querySelector(
            ".galeriaCarousel__btn--prev"
        );
        const btnNext = carrusel.querySelector(
            ".galeriaCarousel__btn--next"
        );

        const dots = document.querySelector(
            `#${carrusel.id}Dots`
        );

        if (!track || !btnPrev || !btnNext) {
            console.warn("Estructura del carrusel incompleta:", carrusel);
            return;
        }

        if (!imagenes || imagenes.length === 0) {
            console.warn("El carrusel no tiene imágenes:", carrusel);
            return;
        }

        let indiceActual = 0;

        // Limpiar contenido anterior
        track.innerHTML = "";

        if (dots) {
            dots.innerHTML = "";
        }

        // Crear imágenes
        imagenes.forEach((imagen, indice) => {

            const slide = document.createElement("div");
            slide.classList.add("galeriaCarousel__slide");

            const img = document.createElement("img");

            img.src = imagen;
            img.alt = `Imagen ${indice + 1}`;
            img.loading = "lazy";

            slide.appendChild(img);
            track.appendChild(slide);

            // Crear indicador
            if (dots) {

                const dot = document.createElement("button");

                dot.type = "button";
                dot.classList.add("galeriaCarousel__dot");

                dot.setAttribute(
                    "aria-label",
                    `Ir a la imagen ${indice + 1}`
                );

                dot.addEventListener("click", () => {
                    indiceActual = indice;
                    actualizarCarrusel();
                });

                dots.appendChild(dot);
            }
        });


        /**
         * Actualiza la posición del carrusel
         */
        function actualizarCarrusel() {

            track.style.transform =
                `translateX(-${indiceActual * 100}%)`;

            if (dots) {

                const indicadores =
                    dots.querySelectorAll(
                        ".galeriaCarousel__dot"
                    );

                indicadores.forEach((dot, indice) => {

                    dot.classList.toggle(
                        "activo",
                        indice === indiceActual
                    );

                });
            }

            btnPrev.disabled = indiceActual === 0;
            btnNext.disabled =
                indiceActual === imagenes.length - 1;
        }


        // Botón anterior
        btnPrev.addEventListener("click", () => {

            if (indiceActual > 0) {
                indiceActual--;
                actualizarCarrusel();
            }

        });


        // Botón siguiente
        btnNext.addEventListener("click", () => {

            if (indiceActual < imagenes.length - 1) {
                indiceActual++;
                actualizarCarrusel();
            }

        });


        // Soporte para teclado
        carrusel.addEventListener("keydown", (event) => {

            if (event.key === "ArrowLeft") {
                btnPrev.click();
            }

            if (event.key === "ArrowRight") {
                btnNext.click();
            }

        });


        // Estado inicial
        actualizarCarrusel();
    }


    /**
     * Inicializa todos los carruseles
     */
    document
        .querySelectorAll(".galeriaCarousel")
        .forEach(carrusel => {

            if (!carrusel.id) {
                console.warn(
                    "El carrusel necesita un ID:",
                    carrusel
                );
                return;
            }

            /*
             * Busca automáticamente el JSON correspondiente.
             *
             * Ejemplo:
             * galeriaRegisterCashFree
             *
             * busca:
             * imagenesRegisterCashFree
             */
            const nombre =
                carrusel.id.replace(
                    /^galeria/,
                    ""
                );

            const json =
                document.querySelector(
                    `#imagenes${nombre}`
                );

            if (!json) {
                console.warn(
                    `No se encontró el arreglo de imágenes para ${carrusel.id}`
                );
                return;
            }

            let imagenes;

            try {

                imagenes =
                    JSON.parse(
                        json.textContent
                    );

            } catch (error) {

                console.error(
                    `Error al leer las imágenes de ${carrusel.id}:`,
                    error
                );

                return;
            }

            crearCarrusel(
                carrusel,
                imagenes
            );

        });

});
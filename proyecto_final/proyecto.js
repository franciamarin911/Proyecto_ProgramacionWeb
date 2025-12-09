document.addEventListener("DOMContentLoaded", () => {
  //SECCION PROYECTOFINAL.HTML
  // --- Botones de la sección inicio ---
  const btnCotizacion = document.getElementById("Btn_Cotizacion");
  const btnUnirse = document.getElementById("Btn_UnirseEquipo");

  if (btnCotizacion) {
    btnCotizacion.addEventListener("click", () => {
      const urlCotizacion =
        "https://docs.google.com/forms/d/e/1FAIpQLSdZo-DmGSPpV-737XNydv8jdfCR6WN_gD2cNoLyxso4jIhISw/viewform?usp=publish-editor";
      window.open(urlCotizacion, "_blank");
    });
  }

  if (btnUnirse) {
    btnUnirse.addEventListener("click", () => {
      const urlUnirse =
        "https://docs.google.com/forms/d/e/1FAIpQLScqLjkJHd0r4ecGvhVvu6U2n-OwKggiLNbWQ6Rp6V2tyqF3ow/viewform?usp=publish-editor";
      window.open(urlUnirse, "_blank");
    });
  }

  // Formulario "Recibe una llamada"
  const btnLlamada = document.getElementById("form-llamada");
  if (btnLlamada) {
    btnLlamada.addEventListener("click", (evento) => {
      evento.preventDefault();

      const nombreInput = document.getElementById("NombreC");
      const nombre = nombreInput ? nombreInput.value.trim() : "";
      const celularInput = document.getElementById("CelularC");
      const celular = celularInput ? celularInput.value.trim() : "";
      const correoInput = document.getElementById("CorreoC");
      const correo = correoInput ? correoInput.value.trim() : "";
      const interesSelect = document.getElementById("InteresC");
      const interes = interesSelect ? interesSelect.value.trim() : "";

      // Validación básica
      if (!nombre || !celular || !correo || !interes) {
        alert("Por favor completa todos los campos antes de solicitar la llamada.");
        return;
      }

      // Validación muy sencilla de correo
      if (!correo.includes("@") || !correo.includes(".")) {
        alert("Por favor ingresa un correo electrónico válido.");
        return;
      }

      // Validación muy sencilla de celular (mínimo 8 dígitos)
      const soloDigitos = celular.replace(/\D/g, "");
      if (soloDigitos.length < 8) {
        alert("Por favor ingresa un número de celular válido.");
        return;
      }

      alert(
        "Solicitud de llamada enviada:\n\n" +
        "Nombre: " +
        nombre +
        "\n" +
        "Celular: " +
        celular +
        "\n" +
        "Correo: " +
        correo +
        "\n" +
        "Servicio de interés: " +
        interes
      );

      // Opcional: limpiar campos
      if (interesSelect) interesSelect.selectedIndex = 0;
      if (nombreInput) nombreInput.value = "";
      if (celularInput) celularInput.value = "";
      if (correoInput) correoInput.value = "";
    });
  }

  // Menú hamburguesa (todas las páginas) ---
  const menuToggle = document.querySelector(".menu-toggle");
  const listaMenu = document.querySelector(".lista-menu");

  if (menuToggle && listaMenu) {
    menuToggle.addEventListener("click", () => {
      const abierto = menuToggle.classList.toggle("abierto");
      listaMenu.classList.toggle("abierto", abierto);
      menuToggle.setAttribute("aria-expanded", abierto ? "true" : "false");
    });

    // Cerrar menú al hacer clic en un enlace
    listaMenu.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        menuToggle.classList.remove("abierto");
        listaMenu.classList.remove("abierto");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // --- Galería como carrusel con filtros 
  const allSlides = Array.from(document.querySelectorAll("#galeria .fotos img"));
  const filterButtons = document.querySelectorAll(".galeria-btn");
  const paginator = document.getElementById("paginador-galeria");
  const prevBtn = document.querySelector(".galeria-arrow.prev");
  const nextBtn = document.querySelector(".galeria-arrow.next");

  if (allSlides.length && filterButtons.length && paginator && prevBtn && nextBtn) {
    let currentCategory = "exterior";
    let slidesFiltrados = [];
    let currentIndex = 0;

    function crearPaginador() {
      paginator.innerHTML = "";
      slidesFiltrados.forEach((_, index) => {
        const dot = document.createElement("button");
        if (index === currentIndex) dot.classList.add("activo");
        dot.addEventListener("click", () => mostrarSlide(index));
        paginator.appendChild(dot);
      });
    }

    function mostrarSlide(index) {
      if (!slidesFiltrados.length) return;

      const total = slidesFiltrados.length;
      currentIndex = (index + total) % total;

      // quitar activa de todas las imágenes
      allSlides.forEach((img) => img.classList.remove("activa"));

      // activar solo la actual
      slidesFiltrados[currentIndex].classList.add("activa");

      // actualizar los puntitos del carrusel
      const dots = paginator.querySelectorAll("button");
      dots.forEach((dot) => dot.classList.remove("activo"));
      if (dots[currentIndex]) dots[currentIndex].classList.add("activo");
    }

    function aplicarFiltroGaleria(categoria) {
      currentCategory = categoria;

      // marcar botón activo
      filterButtons.forEach((btn) => {
        const activa = btn.dataset.filter === categoria;
        btn.classList.toggle("activa", activa);
      });

      // limpiar clases activas anteriores
      allSlides.forEach((img) => img.classList.remove("activa"));

      // filtrar imágenes por categoría
      slidesFiltrados = allSlides.filter(
        (img) => img.dataset.category === categoria
      );

      if (!slidesFiltrados.length) {
        paginator.innerHTML = "";
        return;
      }

      currentIndex = 0;
      crearPaginador();
      mostrarSlide(currentIndex);
    }

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const categoria = btn.dataset.filter;
        aplicarFiltroGaleria(categoria);
      });
    });

    prevBtn.addEventListener("click", () => {
      mostrarSlide(currentIndex - 1);
    });

    nextBtn.addEventListener("click", () => {
      mostrarSlide(currentIndex + 1);
    });

    setInterval(() => {
      mostrarSlide(currentIndex + 1);
    }, 3000);

    // iniciar en "exterior"
    aplicarFiltroGaleria(currentCategory);
  }

  // Resaltar botones
  if (document.body.classList.contains("pagina-inicio")) {
    const seccionesHome = document.querySelectorAll(
      "#inicio, #nosotros, #elegirnos, #galeria"
    );
    const enlacesHome = document.querySelectorAll('.lista-menu a[href^="#"]');

    function actualizarMenuActivo() {
      let seccionActiva = null;

      seccionesHome.forEach((seccion) => {
        const rect = seccion.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) {
          seccionActiva = seccion.id;
        }
      });

      if (!seccionActiva) return;

      enlacesHome.forEach((enlace) => {
        const hash = enlace.getAttribute("href");
        if (hash === `#${seccionActiva}`) {
          enlace.setAttribute("aria-current", "page");
        } else {
          enlace.removeAttribute("aria-current");
        }
      });
    }

    window.addEventListener("scroll", actualizarMenuActivo);
    window.addEventListener("load", actualizarMenuActivo);

    enlacesHome.forEach((enlace) => {
      enlace.addEventListener("click", () => {
        setTimeout(actualizarMenuActivo, 300);
      });
    });
  }
  //SECCION PROYECTOS.HTML
  const botonesFiltroProyectos = document.querySelectorAll(".boton-filtro-proyecto");
  const tarjetasProyectos = document.querySelectorAll(".tarjeta-proyecto-3d");

  if (botonesFiltroProyectos.length && tarjetasProyectos.length) {
    function aplicarFiltroProyectos(tipo) {
      tarjetasProyectos.forEach((tarjeta) => {
        const tipoTarjeta = tarjeta.getAttribute("data-tipo-proyecto");
        if (tipo === "todos" || tipoTarjeta === tipo) {
          tarjeta.classList.remove("oculto");
        } else {
          tarjeta.classList.add("oculto");
        }
      });
    }

    botonesFiltroProyectos.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tipo = btn.getAttribute("data-tipo");

        botonesFiltroProyectos.forEach((b) => b.classList.remove("activo"));
        btn.classList.add("activo");

        aplicarFiltroProyectos(tipo);
      });
    });

    const btnTodos = document.querySelector(
      '.boton-filtro-proyecto[data-tipo="todos"]'
    );
    if (btnTodos) {
      btnTodos.classList.add("activo");
      aplicarFiltroProyectos("todos");
    }
  }
  //SECCION CONTACTO.HTML
  const formularioContacto = document.getElementById("formulario-contacto");

  if (formularioContacto) {
    formularioContacto.addEventListener("submit", function (e) {
      e.preventDefault(); // evita el envío real

      // Obtener valores
      const nombre = document.getElementById("nombre").value.trim();
      const correo = document.getElementById("correo").value.trim();
      const celular = document.getElementById("celular").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();

      // Validación básica
      if (!nombre || !correo || !celular || !mensaje) {
        alert("Por favor completa todos los campos antes de enviar.");
        return;
      }

      // Validación mínima de correo
      if (!correo.includes("@") || !correo.includes(".")) {
        alert("Por favor ingresa un correo electrónico válido.");
        return;
      }

      // Validación mínima de celular
      const soloDigitos = celular.replace(/\D/g, "");
      if (soloDigitos.length < 8) {
        alert("Por favor ingresa un número de celular válido.");
        return;
      }

      // “Simulación” de envío con los datos capturados
      alert(
        "Gracias por contactarte con MEGA CONSTRUCCIONES\n\n" +
        "Estos son los datos que enviaste:\n" +
        "Nombre: " +
        nombre +
        "\n" +
        "Correo: " +
        correo +
        "\n" +
        "Celular: " +
        celular +
        "\n" +
        "Mensaje: " +
        mensaje
      );

      // Limpiar el formulario
      this.reset();
    });
  }
});

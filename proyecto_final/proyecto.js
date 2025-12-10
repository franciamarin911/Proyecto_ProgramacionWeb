document.addEventListener("DOMContentLoaded", () => { // Espera a que todo el HTML esté cargado antes de ejecutar el JS
  //SECCION PROYECTOFINAL.HTML // Comentario de referencia para el archivo/proyecto
  // --- Botones de la sección inicio --- // Maneja los botones principales de la página de inicio
  const btnCotizacion = document.getElementById("Btn_Cotizacion"); // Botón para ir al formulario de cotización
  const btnUnirse = document.getElementById("Btn_UnirseEquipo"); // Botón para ir al formulario de unirse al equipo

  if (btnCotizacion) { // Verifica que el botón de cotización exista en la página
    btnCotizacion.addEventListener("click", () => { // Cuando se hace clic en el botón de cotización
      const urlCotizacion =
        "https://docs.google.com/forms/d/e/1FAIpQLSdZo-DmGSPpV-737XNydv8jdfCR6WN_gD2cNoLyxso4jIhISw/viewform?usp=publish-editor"; // URL del formulario de cotización
      window.open(urlCotizacion, "_blank"); // Abre el formulario de cotización en una nueva pestaña
    });
  }

  if (btnUnirse) { // Verifica que el botón de unirse al equipo exista
    btnUnirse.addEventListener("click", () => { // Cuando se hace clic en el botón de unirse al equipo
      const urlUnirse =
        "https://docs.google.com/forms/d/e/1FAIpQLScqLjkJHd0r4ecGvhVvu6U2n-OwKggiLNbWQ6Rp6V2tyqF3ow/viewform?usp=publish-editor"; // URL del formulario para unirse al equipo
      window.open(urlUnirse, "_blank"); // Abre el formulario en una nueva pestaña
    });
  }

  // Formulario "Recibe una llamada" // Lógica del formulario para solicitar una llamada
  const btnLlamada = document.getElementById("form-llamada"); // Botón/enlace que dispara la solicitud de llamada
  if (btnLlamada) { // Verifica que el elemento exista
    btnLlamada.addEventListener("click", (evento) => { // Agrega evento de clic al botón
      evento.preventDefault(); // Evita el comportamiento por defecto (enviar el formulario o recargar página)

      const nombreInput = document.getElementById("NombreC"); // Campo de nombre
      const nombre = nombreInput ? nombreInput.value.trim() : ""; // Toma el valor del nombre sin espacios extra
      const celularInput = document.getElementById("CelularC"); // Campo de celular
      const celular = celularInput ? celularInput.value.trim() : ""; // Toma el valor del celular
      const correoInput = document.getElementById("CorreoC"); // Campo de correo electrónico
      const correo = correoInput ? correoInput.value.trim() : ""; // Toma el valor del correo
      const interesSelect = document.getElementById("InteresC"); // Select del servicio de interés
      const interes = interesSelect ? interesSelect.value.trim() : ""; // Toma la opción seleccionada

      // Validación básica // Revisa que todos los campos tengan algún valor
      if (!nombre || !celular || !correo || !interes) {
        alert("Por favor completa todos los campos antes de solicitar la llamada."); // Muestra alerta si falta algún campo
        return; // Detiene la función
      }

      // Validación muy sencilla de correo // Chequeo rápido del formato del correo
      if (!correo.includes("@") || !correo.includes(".")) {
        alert("Por favor ingresa un correo electrónico válido."); // Mensaje si el correo no parece válido
        return;
      }

      // Validación muy sencilla de celular (mínimo 8 dígitos) // Asegura longitud mínima del número
      const soloDigitos = celular.replace(/\D/g, ""); // Elimina cualquier carácter que no sea número
      if (soloDigitos.length < 8) {
        alert("Por favor ingresa un número de celular válido."); // Mensaje si el número es muy corto
        return;
      }

      alert( // Muestra un resumen de la solicitud de llamada
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

      // Opcional: limpiar campos // Deja el formulario listo para otro registro
      if (interesSelect) interesSelect.selectedIndex = 0; // Reinicia el select
      if (nombreInput) nombreInput.value = ""; // Limpia el nombre
      if (celularInput) celularInput.value = ""; // Limpia el celular
      if (correoInput) correoInput.value = ""; // Limpia el correo
    });
  }

  // Menú hamburguesa (todas las páginas) --- // Control del menú responsive
  const menuToggle = document.querySelector(".menu-toggle"); // Icono/botón del menú hamburguesa
  const listaMenu = document.querySelector(".lista-menu"); // Contenedor de la lista de enlaces del menú

  if (menuToggle && listaMenu) { // Verifica que existan ambos elementos
    menuToggle.addEventListener("click", () => { // Cuando se hace clic en el ícono del menú
      const abierto = menuToggle.classList.toggle("abierto"); // Alterna la clase "abierto" y guarda si está abierto o cerrado
      listaMenu.classList.toggle("abierto", abierto); // Abre o cierra la lista según el estado
      menuToggle.setAttribute("aria-expanded", abierto ? "true" : "false"); // Actualiza atributo de accesibilidad
    });

    // Cerrar menú al hacer clic en un enlace // Cada clic en un enlace cierra el menú
    listaMenu.addEventListener("click", (e) => {
      if (e.target.tagName === "A") { // Comprueba que el clic fue sobre un enlace
        menuToggle.classList.remove("abierto"); // Quita clase "abierto" del botón
        listaMenu.classList.remove("abierto"); // Quita clase "abierto" de la lista
        menuToggle.setAttribute("aria-expanded", "false"); // Marca el menú como cerrado para accesibilidad
      }
    });
  }

  // --- Galería como carrusel con filtros  // Lógica del carrusel de imágenes con categorías
  const allSlides = Array.from(document.querySelectorAll("#galeria .fotos img")); // Todas las imágenes de la galería
  const filterButtons = document.querySelectorAll(".galeria-btn"); // Botones de filtro por categoría
  const paginator = document.getElementById("paginador-galeria"); // Contenedor de los puntos de paginación
  const prevBtn = document.querySelector(".galeria-arrow.prev"); // Flecha para ir a la imagen anterior
  const nextBtn = document.querySelector(".galeria-arrow.next"); // Flecha para ir a la imagen siguiente

  if (allSlides.length && filterButtons.length && paginator && prevBtn && nextBtn) { // Solo se ejecuta si todos los elementos de la galería existen
    let currentCategory = "exterior"; // Categoría inicial por defecto
    let slidesFiltrados = []; // Arreglo de imágenes filtradas por categoría
    let currentIndex = 0; // Índice de la imagen que se está mostrando

    function crearPaginador() { // Crea los puntitos de navegación según la cantidad de imágenes filtradas
      paginator.innerHTML = ""; // Limpia cualquier paginador anterior
      slidesFiltrados.forEach((_, index) => { // Recorre las imágenes filtradas
        const dot = document.createElement("button"); // Crea un botón para cada imagen
        if (index === currentIndex) dot.classList.add("activo"); // Marca como activo el punto de la imagen actual
        dot.addEventListener("click", () => mostrarSlide(index)); // Al hacer clic muestra la imagen correspondiente
        paginator.appendChild(dot); // Agrega el botón al contenedor
      });
    }

    function mostrarSlide(index) { // Muestra la imagen del carrusel en la posición indicada
      if (!slidesFiltrados.length) return; // Si no hay imágenes filtradas, no hace nada

      const total = slidesFiltrados.length; // Total de imágenes disponibles
      currentIndex = (index + total) % total; // Calcula el índice actual con efecto de carrusel circular

      // quitar activa de todas las imágenes // Primero desactiva todas las imágenes
      allSlides.forEach((img) => img.classList.remove("activa"));

      // activar solo la actual // Activa solo la imagen correspondiente al índice actual
      slidesFiltrados[currentIndex].classList.add("activa");

      // actualizar los puntitos del carrusel // Actualiza el estado visual de los puntos
      const dots = paginator.querySelectorAll("button");
      dots.forEach((dot) => dot.classList.remove("activo")); // Quita el estado activo de todos
      if (dots[currentIndex]) dots[currentIndex].classList.add("activo"); // Activa el punto de la imagen actual
    }

    function aplicarFiltroGaleria(categoria) { // Aplica el filtro de categoría a la galería
      currentCategory = categoria; // Guarda la categoría seleccionada

      // marcar botón activo // Marca el botón de filtro correspondiente
      filterButtons.forEach((btn) => {
        const activa = btn.dataset.filter === categoria; // Compara el data-filter con la categoría actual
        btn.classList.toggle("activa", activa); // Añade o quita la clase activa
      });

      // limpiar clases activas anteriores // Quita la clase activa de todas las imágenes
      allSlides.forEach((img) => img.classList.remove("activa"));

      // filtrar imágenes por categoría // Filtra solo las imágenes que coinciden con la categoría
      slidesFiltrados = allSlides.filter(
        (img) => img.dataset.category === categoria
      );

      if (!slidesFiltrados.length) { // Si no hay imágenes para esa categoría
        paginator.innerHTML = ""; // Limpia los puntos del paginador
        return;
      }

      currentIndex = 0; // Reinicia el índice al primer elemento
      crearPaginador(); // Crea los puntos del paginador según la nueva lista filtrada
      mostrarSlide(currentIndex); // Muestra la primera imagen filtrada
    }

    filterButtons.forEach((btn) => { // Agrega evento click a cada botón de filtro
      btn.addEventListener("click", () => {
        const categoria = btn.dataset.filter; // Obtiene la categoría desde el data-attribute
        aplicarFiltroGaleria(categoria); // Llama a la función para aplicar el filtro
      });
    });

    prevBtn.addEventListener("click", () => { // Botón de flecha izquierda
      mostrarSlide(currentIndex - 1); // Muestra la imagen anterior
    });

    nextBtn.addEventListener("click", () => { // Botón de flecha derecha
      mostrarSlide(currentIndex + 1); // Muestra la siguiente imagen
    });

    setInterval(() => { // Cambia automáticamente de imagen cada cierto tiempo
      mostrarSlide(currentIndex + 1); // Avanza a la siguiente imagen
    }, 3000); // Intervalo de 3 segundos

    // iniciar en "exterior" // Aplica el filtro inicial al cargar la página
    aplicarFiltroGaleria(currentCategory);
  }

  // Resaltar botones // Resalta el enlace del menú según la sección visible
  if (document.body.classList.contains("pagina-inicio")) { // Solo se ejecuta en la página de inicio
    const seccionesHome = document.querySelectorAll(
      "#inicio, #nosotros, #elegirnos, #galeria"
    ); // Secciones que se van a observar
    const enlacesHome = document.querySelectorAll('.lista-menu a[href^="#"]'); // Enlaces del menú que apuntan a secciones internas

    function actualizarMenuActivo() { // Actualiza qué enlace está marcado como activo
      let seccionActiva = null; // Aquí guardamos la sección que está en pantalla

      seccionesHome.forEach((seccion) => { // Recorre cada sección
        const rect = seccion.getBoundingClientRect(); // Obtiene posición de la sección en la ventana
        if (rect.top <= 140 && rect.bottom >= 140) { // Si el punto 140px desde arriba está dentro de la sección
          seccionActiva = seccion.id; // Guarda el id de esa sección
        }
      });

      if (!seccionActiva) return; // Si no hay sección activa, no hace nada

      enlacesHome.forEach((enlace) => { // Recorre todos los enlaces del menú
        const hash = enlace.getAttribute("href"); // Obtiene el destino del enlace (#id)
        if (hash === `#${seccionActiva}`) { // Compara con la sección activa
          enlace.setAttribute("aria-current", "page"); // Marca el enlace como activo para accesibilidad y estilos
        } else {
          enlace.removeAttribute("aria-current"); // Quita la marca de activo al resto
        }
      });
    }

    window.addEventListener("scroll", actualizarMenuActivo); // Actualiza el menú cuando se hace scroll
    window.addEventListener("load", actualizarMenuActivo); // Y también al cargar la página

    enlacesHome.forEach((enlace) => { // Para cada enlace del menú interno
      enlace.addEventListener("click", () => {
        setTimeout(actualizarMenuActivo, 300); // Espera un poco y luego actualiza el activo (útil para scroll suave)
      });
    });
  }
  //SECCION PROYECTOS.HTML // Lógica de filtros para la página de proyectos
  const botonesFiltroProyectos = document.querySelectorAll(".boton-filtro-proyecto"); // Botones de filtro de proyectos
  const tarjetasProyectos = document.querySelectorAll(".tarjeta-proyecto-3d"); // Tarjetas que representan cada proyecto

  if (botonesFiltroProyectos.length && tarjetasProyectos.length) { // Solo si existen botones y tarjetas
    function aplicarFiltroProyectos(tipo) { // Muestra/oculta proyectos según el tipo
      tarjetasProyectos.forEach((tarjeta) => {
        const tipoTarjeta = tarjeta.getAttribute("data-tipo-proyecto"); // Lee el tipo de proyecto de la tarjeta
        if (tipo === "todos" || tipoTarjeta === tipo) { // Si el filtro es "todos" o coincide el tipo
          tarjeta.classList.remove("oculto"); // Muestra la tarjeta
        } else {
          tarjeta.classList.add("oculto"); // Oculta la tarjeta
        }
      });
    }

    botonesFiltroProyectos.forEach((btn) => { // Recorre todos los botones de filtro
      btn.addEventListener("click", () => { // Al hacer clic en un botón
        const tipo = btn.getAttribute("data-tipo"); // Obtiene el tipo de filtro del botón

        botonesFiltroProyectos.forEach((b) => b.classList.remove("activo")); // Quita la clase activo de todos los botones
        btn.classList.add("activo"); // Marca el botón actual como activo

        aplicarFiltroProyectos(tipo); // Aplica el filtro seleccionado
      });
    });

    const btnTodos = document.querySelector(
      '.boton-filtro-proyecto[data-tipo="todos"]'
    ); // Obtiene el botón que muestra todos los proyectos
    if (btnTodos) {
      btnTodos.classList.add("activo"); // Lo marca como activo inicialmente
      aplicarFiltroProyectos("todos"); // Muestra todos los proyectos al inicio
    }
  }
  //SECCION CONTACTO.HTML // Lógica del formulario de contacto general
  const formularioContacto = document.getElementById("formulario-contacto"); // Formulario de contacto de la página

  if (formularioContacto) { // Verifica si el formulario existe
    formularioContacto.addEventListener("submit", function (e) { // Evento al enviar el formulario
      e.preventDefault(); // evita el envío real // Evita recargar o mandar datos a un servidor

      // Obtener valores // Toma y limpia los datos escritos por el usuario
      const nombre = document.getElementById("nombre").value.trim();
      const correo = document.getElementById("correo").value.trim();
      const celular = document.getElementById("celular").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();

      // Validación básica // Comprueba que todos los campos estén llenos
      if (!nombre || !correo || !celular || !mensaje) {
        alert("Por favor completa todos los campos antes de enviar."); // Alerta si falta información
        return;
      }

      // Validación mínima de correo // Verificación rápida del formato del correo
      if (!correo.includes("@") || !correo.includes(".")) {
        alert("Por favor ingresa un correo electrónico válido."); // Mensaje si el correo está mal escrito
        return;
      }

      // Validación mínima de celular // Validación simple para el número de celular
      const soloDigitos = celular.replace(/\D/g, ""); // Deja solo los dígitos
      if (soloDigitos.length < 8) {
        alert("Por favor ingresa un número de celular válido."); // Mensaje si el número es demasiado corto
        return;
      }

      // “Simulación” de envío con los datos capturados // Muestra un resumen de lo que el usuario envió
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

      // Limpiar el formulario // Reinicia todos los campos a vacío
      this.reset();
    });
  }
});

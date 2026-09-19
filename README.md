# Trabajo Integrador Final - Desarrollo Web

Este proyecto consiste en una aplicación de publicaciones realizada con React y conectada a Supabase.
La aplicación permite realizar las cuatro operaciones principales de un CRUD: crear, consultar, editar y eliminar publicaciones. Cada publicación tiene un título, un contenido y una fecha de creación.

## Funciones de publicaciones.js

En el archivo `src/servicios/publicaciones.js` se encuentran las cuatro funciones que se encargan de comunicarse con la tabla `publicaciones` de Supabase.

### obtenerPublicaciones()

Esta función se encarga de obtener las publicaciones guardadas en la base de datos y ordenarlas desde la más reciente a la más antigua. Se utiliza cuando se carga la página para mostrar las publicaciones existentes.También se vuelve a utilizar después de realizar cambios para mantener actualizada la lista que se muestra en pantalla.

### crearPublicacion()

Esta función se encarga de guardar una nueva publicación en Supabase, recibiendo el título y el contenido ingresados por el usuario. Se ejecuta cuando se completa el formulario y se presiona el botón "Crear publicación".

### actualizarPublicacion()

Esta función permite modificar una publicación que ya existe. Recibe el id de la publicación y los nuevos datos que se quieren guardar. Se utiliza cuando se presiona el botón "Editar" de una publicación. Sus datos se cargan en el formulario y al presionar "Guardar cambios" se ejecuta esta función.

### eliminarPublicacion()

Esta función se encarga de eliminar una publicación de la base de datos utilizando su id. Se ejecuta cuando se presiona el botón "Borrar". Antes de eliminarla se muestra un mensaje de confirmación para evitar borrar una publicación por error.

## Uso de Inteligencia Artificial

Para realizar el diseño de la página se tomaron como referencia diferentes diseños de páginas web encontrados en Pinterest, principalmente para definir la combinación de colores y la organización visual.
También se utilizó la ayuda de Inteligencia Artificial en el archivo `Publicaciones.css` como apoyo para adaptar esas referencias y lograr un diseño más atractivo y ordenado, trabajando sobre los colores, tamaños, espacios y estilos de los diferentes elementos de la página.
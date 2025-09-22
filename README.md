
## Arquitectura de solución
Tenemos Frontend en React con TypeScript. La UI se compone de componentes reutilizables (por ejemplo, AuthorCard) ubicados en src/components. El formulario se hace con inputs  y se realizan validaciones en el propio componente.

Las pruebas de componentes viven junto al código en src/components/tests en el cual tenemos 1 suite de pruebas con 2 pruebas unitarias para verificar renderizado y comportamiento desde la perspectiva del usuario.

Basicamente para el desarrollo de lo solicitado en el parcial se reutilizo el componente de author card agregando el boton de añadir a favoritos y que se muestre una pequeña etiqueta cuando se le de clcik a ese boton, asimismo con el componente actualizado se creo el page para favoritos que es casi que una copia del que se tenia de autores, donde se muestran los actores de la misma manera y solo se modifican algunos botones.

Para la parte de las pruebas se creo el archivo AuthorForm.test.tsx que nos sirve de suite para hacer las 2 pruebas unitarias sencillas en donde obtenemos los componentes del formulario y verificamos que todo se renderizo correctamente, la otra prueba lo que hace es una simulacion en donde verificamos que el boton este desabilitado hasta que se completen todos los campos requeridos, se hace el paso a paso en donde se hace una primera verificacion, luego se ingresa el nombre y se vuelve a verificar que el boton este desabilitado y ya por ultimo ingresando la fecha de cumpleaños el boton deberia activarse.

## Opcion elegida en parte B
Decidi irme con la opción 2 - pruebas unitarias porque me parece mas importante que accesibilidad.

- Qué validan:
  
Renderizado de los campos requeridos (name, description, birthDate, image) y botón de envío.
Regla del enunciado: el botón permanece deshabilitado hasta completar los campos requeridos; al completarlos, se habilita y dispara onSubmit.

- Cómo validarla:
  
Ejecuta las pruebas y verifica que pasen los 2 tests del archivo src/components/tests/AuthorForm.test.tsx.

## Instrucciones para correr la app 

Requisitos: Node.js LTS (>=18) y npm.

Instalar dependencias:

```bash
npm install
```
Iniciar el servidor de desarrollo:
```bash
npm run dev
```


Abre http://localhost:3000 para verificar que todo esta en orden.

Para correr las pruebas, ejecuta en la terminal:
```bash
npm test
```



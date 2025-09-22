
## Arquitectura de solución
Tenemos Frontend en React con TypeScript. La UI se compone de componentes reutilizables (por ejemplo, AuthorCard) ubicados en src/components. El formulario se hace con inputs  y se realizan validaciones en el propio componente.

Las pruebas de componentes viven junto al código en src/components/tests en el cual tenemos 1 suite de pruebas con 2 pruebas unitarias para verificar renderizado y comportamiento desde la perspectiva del usuario.


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



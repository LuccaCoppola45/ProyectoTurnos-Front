# ProyectoturnosFront

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.7.

## Estructura de la aplicación

La interfaz está organizada por páginas, componentes reutilizables y servicios:

```text
src/app/
├── components/       # Componentes independientes, cada uno con su HTML, TS y CSS
├── models/           # Modelos TypeScript del dominio
├── pages/            # Páginas compuestas a partir de componentes
├── interceptors/     # Interceptores HTTP para el token Bearer
├── services/         # Acceso y lógica para los datos
├── utils/            # Utilidades compartidas
├── app.routes.ts     # Rutas de la aplicación
└── app.config.ts     # Configuración global de Angular
```

## Conexión con el backend

La URL del backend se configura en `src/environments/environment.ts` (por defecto `http://localhost:8080`).
El frontend inicia sesión o registra usuarios en `/api/auth`, carga comercios desde `/api/comercios` y
crea turnos en `/turnos`. El token JWT se conserva en el navegador y se envía como `Authorization: Bearer`.
Se necesita tener el backend y su base de datos en ejecución; comercios y servicios deben estar cargados
para que aparezcan en el catálogo. La disponibilidad y validación del horario las confirma el backend al reservar.

## Development server

To start a local development server, run:

```bash
cd proyectoturnos-front
npm start
```

Once the frontend and backend are running, open `http://localhost:4200/`, sign in or create an account,
then browse businesses and request an appointment.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

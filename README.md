# Home Library Service

## Prerequisites

- NodeJS - [Install NodeJS](https://nodejs.org/en/)
- Git - [Download & Install Git](https://git-scm.com/downloads).
- Docker - [Install Docker](https://docs.docker.com/engine/install/)

## Steps for running

### Downloading

```
git clone {repository URL}
```

### Switch to branch `service-part-3`

```
git checkout auth
```

### Installing NPM modules

```
npm i
```

### Running application in docker

```
npm run docker
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

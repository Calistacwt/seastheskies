# React x Vite

## Prerequisites

- Node.js `>=20`
- NPM `>=10`

> Use [volta.sh](https://volta.sh) for the best experience as the node environment.

## Configuration

Copy file `.env.example` to `.env.[environment]`
> `[environment]` is relative base on `NODE_ENV` value

- Local / Development Environment:
  ```bash
  cp .env.example .env.development
  ```
- Staging / Production Environment
  ```bash
  cp .env.example .env.production
  ```

| Key                      | Description                       | Required | Type     |
|--------------------------|-----------------------------------|----------|----------|
| `APP_NAME`               | App Name                          | **✓**    | `string` |
| `APP_VERSION`            | App Version                       |          | `string` |
| `APP_BUILD_SIGNATURE`    | App Build Signature               |          | `string` |
|                          |                                   |          |          |
| `API_BASE_URL`           | API Base URL                      | **✓**    | `string` |
| `API_CLIENT_ID`          | API Credential Client ID          | **✓**    | `string` |
| `API_CLIENT_SECRET`      | API Credential Client Secret      | **✓**    | `string` |
| `API_PLATFORM_ID`        | API Platform ID                   |          | `number` |
|                          |                                   |          |          |
| `MOCK_API_BASE_URL`      | Mock API Base URL                 |          | `string` |
| `MOCK_API_CLIENT_ID`     | Mock API Credential Client ID     |          | `string` |
| `MOCK_API_CLIENT_SECRET` | Mock API Credential Client Secret |          | `string` |

## Installation

```bash
npm ci
```

> Why using `npm ci` instead of `npm install`? [Read this](https://docs.npmjs.com/cli/v10/commands/npm-ci)

## Usage

### Local

- Start Application
  ```bash
  npm start
  ```
- Build Application
  ```bash
  npm run build
  ```
- Check [package.json](./package.json) to see more script.

### Docker

- Build Image
  ```bash
  docker build -t cr.nbs.dev/js/skeleton/react-vite:latest -f ./deployments/web/Dockerfile .
  ```
- Run Image
  ```bash
  docker run -d --name react-vite:latest -p 8888:80 cr.nbs.dev/js/skeleton/react-vite:latest
  ```  

## Contributors

- Muhammad Manshur <manshur@nusantarabetastudio.com>
- Jodi Setiawan <jodi@nusantarabetastudio.com>

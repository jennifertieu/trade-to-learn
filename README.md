<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="./trade-to-learn-preview.png" alt="Logo" style="max-width: 100%">
<h1 align="center">Trade to Learn</h1>

  <p align="center">
A beginner friendly way to start trading, Trade to Learn is a simple and easy-to-use trading application that uses real-market data. It does NOT require any real money investment or the submission of personal information.
    <br />
    <a href="https://tradetolearn.app">View Site</a>
    ·
    <a href="https://github.com/jennifertieu/trade-to-learn/issues">Report Bug</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

Trade to Learn is a beginner-friendly way to start trading stocks. Born out of my desire to learn how to trade and intimidated by existing trading applications, I created a simple and easy-to-use trading application that uses real-market data (StockData API - free version).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

The application is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with TypeScript. The MongoDB database stored data about the user, their trades (portfolio, transactions, etc), and stock quote data from the StockData API Free Version. Due to the daily API limit of the StockData API, the stock data is stored in MongoDB after each API call and when the daily limit is reached, the application uses the stock data in the database.

- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![TypeScript][TypeScript]][TypeScript-url]
- [![JavaScript][JavaScript.com]][JavaScript-url]
- [![Tailwind][Tailwindcss.com]][TailwindCSS-url]
- [![MongoDB][MongoDB.com]][MongoDB-url]
- [![Cypress][Cypress.io]][Cypress-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

1. [`npm`](https://www.npmjs.com/) is needed to install dependencies

```sh
npm install npm@latest -g
```

2. Get a free API Key at [https://stockdata.com](https://www.stockdata.org/)

#### Database

1. Requires [MongoDB](https://www.mongodb.com/) database connection string

#### Authentication

The application uses [NextAuth](https://next-auth.js.org/) for authentications. The methods to authenticate into the application are [Google](https://next-auth.js.org/providers/google) and [Email Link](https://next-auth.js.org/providers/email).

1. The Email Provider requires SMTP account credentials with [Sendgrid](https://sendgrid.com/).
2. To use Google OAuth you need a client ID and client Secret from a project located in the [Google Cloud Platform Console](https://console.cloud.google.com/). [Click here for more instructions](https://support.google.com/cloud/answer/6158849?hl=en) or search for instructions online.
3. NextAuth configuration requires the `NEXTAUTH_URL` and `NEXTAUTH_SECRET` to encrypt the NextAuth.js JWT and to hash email verification tokens.

Generate NEXTAUTH_SECRET with the openssl command and use output value

```
openssl rand -base64 32
```

Development

```
NEXTAUTH_URL=http://localhost:3000
```

Production

```
NEXTAUTH_URL=https://tradetolearn.app
```

#### Set up `.env` file

```
STOCK_DATA_URL=
STOCK_DATA_API_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
MONGODB_URI=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
SMTP_USER=
SMTP_PASSWORD=
SMTP_HOST=
SMTP_PORT=
EMAIL_FROM=
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/jennifertieu/trade-to-learn.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Jennifer Tieu - [@jteacodes](https://twitter.com/jteacodes) - jennifer.tieuu@gmail.com

[![LinkedIn][linkedin-shield]][linkedin-url]

Project Link: [https://github.com/jennifertieu/trade-to-learn](https://github.com/jennifertieu/trade-to-learn)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/jennifertieu
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[JavaScript.com]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[JavaScript-url]: https://www.javascript.com/
[TailwindCSS.com]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[MongoDB.com]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Cypress.io]: https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e
[Cypress-url]: https://www.cypress.io/

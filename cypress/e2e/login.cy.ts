import { Cookie } from "next-auth/core/lib/cookie";

describe("Login page", () => {
  // before(() => {
  //   cy.log("Visiting http://localhost:3000");
  //   cy.visit("/auth/signin"); // navigate to signin page that has the OAuth providers
  // });
  // it("Login with Google", () => {
  //   const username = Cypress.env("GOOGLE_USER");
  //   const password = Cypress.env("GOOGLE_PW");
  //   const loginUrl = `${Cypress.env("SITE_NAME")}/auth/signin`;
  //   const cookieName = Cypress.env("COOKIE_NAME");
  //   const socialLoginOptions = {
  //     username,
  //     password,
  //     loginUrl,
  //     headless: false,
  //     logs: false,
  //     isPopup: true,
  //     loginSelector: "[data-testid=google]", // selector from the signin page
  //     postLoginSelector: "[data-testid=trade]", // selector from the page the user should be redirected to after login
  //   };
  //   return cy
  //     .task<{
  //       cookies: any;
  //       lsd: any;
  //       ssd: any;
  //     }>("GoogleSocialLogin", socialLoginOptions)
  //     .then(({ cookies }) => {
  //       cy.clearCookies();
  //       const cookie = cookies
  //         .filter((cookie: Cookie) => cookie.name === cookieName)
  //         .pop();
  //       if (cookie) {
  //         cy.session("cookies", () => {
  //           cy.setCookie(cookie.name, cookie.value, {
  //             domain: cookie.domain,
  //             expiry: cookie.expires,
  //             httpOnly: cookie.httpOnly,
  //             path: cookie.path,
  //             secure: cookie.secure,
  //           });
  //         });
  //         // remove the two lines below if you need to stay logged in
  //         // for your remaining tests
  //         // cy.visit('/api/auth/signout'); // signout flow line #1
  //         // cy.get('form').submit(); // signout flow line #2
  //       }
  //     });
  // });
});

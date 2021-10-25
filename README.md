# Cypress Typescript example

I've recently worked on a TypeScript project and wanted to use it in conjunction with Cypress to improve my understanding. While I cant say I'm 100% of the way there what I do have is a fresh memory of the stumbling blocks I've hit. Before continuing though please see resources that helped me solve some of the problems as well as help from my colleagues listed below, these may be helpful for you too.

- [Cypress Docs](https://docs.cypress.io/guides/tooling/typescript-support#Install-TypeScript)
- [Filiphric.com](https://filiphric.com/starting-with-typescript-in-cypress)

Below is a list of the things I needed to do which were a bit out of the ordinary for me personally.

---

## cypress.json

_This is generally in the root of your project._

```
{
  "baseUrl": "https://www.ao.com",
  "video": false,
  "ignoreTestFiles": "*.c.ts"
}
```

If you're already confident with Cypress configuration then by all means skip this section.

If you're not then the `baseUrl` is defining the base of our test path, https://example.cypress.io because I figure thats pretty reliable.

I've set `video` to false to speed things up, capturing videos of runs can be very useful but in this case I've opted for speed.

`ignoreTestFiles` has been done as I'm wanting to keep files in there with my specs so I've opted the pattern `*.c.ts` to describe my commands files. You can see this in `integration/multi_file`. This is the main thing that was a bit different for me and isn't really anything to do with Typescript, if you dont plan to follow this pattern (and I wont argue why you should) then you don't need any of this.

---

## tsconfig.json

_This is generally in the root of your project._

Assuming you dont already have typescript in your project:

> Install Typscript
>
> `npm install typescript --save-dev`
>
> Create a typescript config (tsconfig.json) file
>
> `npx tsc --init`
>
> You may need to run the following before hand
>
> `npx tsc`

You should have a `tsconfig.json` file that looks similar to the below snippet, if you've created one fresh then there will be a great deal of comments in there as well to help you get set up.

```
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "types": ["cypress"]
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

Note ontop of what was added in the original file I've added the include and exclude lines and types as well.

---

## multi_file.c.ts and multi_file.spec.ts

_Located in `cypress/integration/multi_file`_

```
//multi_file.c.ts

declare global {
  namespace Cypress {
    interface Chainable {
      titleCheck(): Chainable<Element>;
    }
  }
}

Cypress.Commands.add("titleCheck", () => {
  cy.get("h1").should("have.length.greaterThan", 0);
});

export {};
```

This is an single purpose commands file for a particular spec or group of specs, unlike commands.js/ts located in support this file needs to be imported into your spec as below (see first line).

```
//multi_file.spec.ts


import "./multi_file.c";

describe("Desktop Navigation Bar Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Given I make a valid search I expect relevant results.", () => {
    cy.titleCheck();
  });
});

```

If you pull down this repo you should find that this spec should work

> To run the test type `npm run cy:open` if you want to use the GUI or `npm run cy:run` if you want it all to run in cli (this will run all the specs, the GUI allows you to pick and choose more easily). You can see these scripts defined in the `package.json` in the root of the project.

if you're curious change the custom command in `multi_file.c.ts` to this:

```
Cypress.Commands.add("titleCheck", () => {
  cy.get("h2").should("have.length.greaterThan", 0);
});
```

All thats changed is `cy.get("h1")...` has changed to `cy.get("h2")...` if you run the test again you should see this reflected in the sidebar.

More on custom commands in the Cypress documentation [here](https://docs.cypress.io/api/cypress-api/custom-commands) and on using Typescript in a traditional Cypress pattern [here](https://docs.cypress.io/guides/tooling/typescript-support#Install-TypeScript).

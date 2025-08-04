# Description

This is a project of issues management web application developed with React and TypeScipt. With the application, users can create, track and modify the issues.

## Technologies used

As the application grows, additional technologies will be listed.

- Next.JS - "The React Framework for the Web".

- TypeScript - a strongly typed programming language that builds on JavaScript.

- Node.JS - free, open-source, cross-platform JavaScript runtime environment.

- npm - package manager for the JavaScript programming language maintained by npm, Inc., a subsidiary of GitHub.

- Prettier - an opinionated code formatter that enforces a consistent style by parsing your code and re-printing it with its own rules.

- ESLint - a pluggable linting utility for JavaScript and TypeScript, used to identify and fix problems in the code. Plugins extend ESLint's functionality to support additional rules, frameworks, or coding styles.

- Tailwind CSS - a utility-first CSS framework.

- Prisma - an open-source Object-Relational Mapper (ORM) designed for Node.js and TypeScript applications.

- EasyMDE - a drop-in JavaScript text area replacement for writing beautiful and understandable Markdown.

- React SimpleMDE Markdown Editor - a React component wrapper for EasyMDE.

- React Markdown + remark plugins - a React component to render markdown with remark plugins to support GFM syntax, easier lines breakdown.

- Next Auth - an open-source, full-stack authentication library primarily designed for Next.js applications.

- Axios - a promise-based HTTP Client for node.js and the browser.

- TanStack Query (previously React Query) - a JavaScript library designed to simplify the complex task of data fetching and caching in React applications.

## Installation

The project uses `npm` as the package manager.

```shell
$ npm install
```

## Running the project

To run the application in development mode:

```shell
$ npm run dev
```

To build the project files perform Typescript transpilation:

```shell
$ npm run build
```

## Features

As the application grows, new features will be added and described here.

- Issues:
    - Explore issues in a table format
    - View issues details in a dedicated page with markdown descriptions view
    - Create issues with rich markdown syntax descriptions (requires authentication)
    - Edit issues data such as titles and descriptions, switch between available statuses and set an assignee among users (requires authentication)
    - Delete issues from their dedicated pages with confirmation (requires authentication)
- Authentication:
    - Sign In with your Google Account to be able to perform dangerous operations with issues, such as creating, editing, switching statuses and deleting

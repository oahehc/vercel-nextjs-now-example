# Vercel (Zeit Now) & Next.js

How to apply multiple environments for our application by using Next.js and Vercel(Zeit Now).

## Start a Next.js project and Deploy Through Vercel

1. Init a Next.js project

```shell
npx create-next-app [ProjectName]
```

2. Create repository at GitHub, GitLab, or Bitbucket. Then link with our project.

```shell
git remote add origin git@github.com:[GitHubAccount]/[ProjectName].git
git push -u origin master
```

3. Import Git Repository to Vercel

- [choose the git provider](https://vercel.com/docs)
  ![deploy to vercel](https://i.imgur.com/C2KPpbi.png)
- connect to your git provider
- import project
  ![import project](https://i.imgur.com/7B9QYhd.png)
  you might need to update the access setting at you git provider, select the repository you want to deploy by Vercel.
  ![repository access](https://i.imgur.com/aI7XVJJ.png)
- leave all the settings as default
  Because we use Next.js template without any customization, Vercel will be able to identify it and provide the correct default settings.
  ![settings](https://i.imgur.com/L7pas4W.png)
- check our application after the status change from `Building` to `Ready`
  ![deploy status](https://i.imgur.com/WwpPrG0.png)

Now, we should have our application online. Thereafter, let's check how to create multiple environments for our application.

## Apply Environment Variables for Multiple Environments

### The environments provide by Vercel

We will see that Vercel provide multiple links for each deployments.
![link environments](https://i.imgur.com/XtcrS4Q.png)

And there are three different environments in Vercel.  
![vercel environment](https://i.imgur.com/qjZWNu9.png)

So, what's the relationship between those links and the environments (production, preview, development)?

1. Vercel default provide two URLs for each project: `[ProjectName].now.sh` and `[ProjectName].[VercelAccount].now.sh`
2. Vercel will create an URL with random hash for each deployments: `[ProjectName]-[hash].now.sh`
3. If we deploy to production environment, then both URLs (`[ProjectName].now.sh`, `[ProjectName].[VercelAccount].now.sh`) will be linked to this deployment.
4. If we deploy to preview environment, then only `[ProjectName].[VercelAccount].now.sh` will be linked to this deployment.
5. Development is for our local environment.

|                                        | Production | Preview | Development |
| :------------------------------------- | :--------: | :-----: | :---------: |
| `[ProjectName].now.sh`                 |     v      |    x    |      X      |
| `[ProjectName].[VercelAccount].now.sh` |     v      |    v    |      X      |
| `[ProjectName]-[hash].now.sh`          |     v      |    v    |      X      |
| `localhost:xxxx`                       |     x      |    x    |      V      |

And of course we can customize the domain by click `View Domains`.  
![control](https://i.imgur.com/BHEConD.png)

Furthermore, we can bind the domain with a specific git branch.  
![domain with branch](https://i.imgur.com/TPWXgpj.png)

### Set environment variables at Vercel

We can set different environment variables for all the three environments.  
![environment variables setting](https://i.imgur.com/J5Azhip.png)

Vercel provides a few [system environment variables](https://vercel.com/docs/v2/build-step#system-environment-variables) for us.  
![system environment variables](https://i.imgur.com/ASP02WA.png)

### Set environment variables at Next.js

After finished the setting of the environment variables at Vercel, now let's checking how to apply those variables in the Next.js project.
(In this article, we use `.env` for environment variables. It is for Next.js versions 9.4 and up. If you’re using an older version of Next.js, check [Environment Variables in next.config.js](https://nextjs.org/docs/api-reference/next.config.js/environment-variables).)

To apply environment variables in the Next.js project, we need to create a `.env.local` file at the root folder.

```
DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword
NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk
```

Or we can choose to download the variables from the Vercel.

1. Install Vercel cli

```shell
npm i -g vercel
or
yarn global add vercel
```

2. Download development environment variables

```shell
vercel env pull .env.local
```

And we can bind the download command with the script of start the local server. This will make sure we always apply the latest variables.

```json
{
  "scripts": {
    "predev": "vercel env pull .env.local",
    "dev": "next",
    ...
  }
}
```

Because Next.js is a server-side render framework, the environment variables have a little different between client (browser) and server side.

1. server (node.js)
   It loads `process.env.xxx` into the Node.js environment automatically allowing us to use them in Next.js data fetching methods (getStaticProps, getServerSideProps) and API routes.

   ```javascript
   export async function getStaticProps() {
     const db = await myDB.connect({
       host: process.env.DB_HOST,
       username: process.env.DB_USER,
       password: process.env.DB_PASS,
     });
     // ...
   }
   ```

2. client (browser)
   If we want to use those variables at client side, then we need to prefix the variable with `NEXT_PUBLIC_`. This will allowing us to use those variables anywhere in our code.

   ```javascript
   import setupAnalyticsService from "../lib/my-analytics-service";

   setupAnalyticsService(process.env.NEXT_PUBLIC_ANALYTICS_ID);

   export default function HomePage() {
     return <h1>Hello World</h1>;
   }
   ```

   ⚠ We need to be care when prefix the variable with `NEXT_PUBLIC_`. Never public the important information like the token or password.

### Deploy the Application to Different Environments

The last part of this article is about how to deploy our application to the preview and production environment. It's pretty easy by using Vercel cli.

1. Deploy to preview environment

```shell
vercel
```

2 Deploy to production environment

```shell
vercel --prod
```

Expect manually deploy through cli, if we create the project by git provider, then Vercel will handle the deploy automatically.

- Vercel will deploy every push by default. This includes pushes and pull requests made to branches.
- When we push and merge to the default branch (commonly "master"), it will trigger the production deployment.

## Reference

- [Vercel Document](https://vercel.com/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/v2/build-step#environment-variables)
- [Vercel Git Integrations](https://vercel.com/docs/v2/git-integrations)

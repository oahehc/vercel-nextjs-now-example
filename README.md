# Vercel (Zeit Now) & Next.js

How to create multiple environments for our application by using Next.js and Vercel (Zeit Now).

## Start a Next.js project and Deploy Through Vercel

1. Init a Next.js project

```shell
npx create-next-app [ProjectName]
```

2. Create repository at GitHub, GitLab, or Bitbucket. And link to our project.

```shell
git remote add origin git@github.com:[GitHubAccount]/[ProjectName].git
git push -u origin master
```

3. Import Git Repository to Vercel

- [select the git provider](https://vercel.com/docs)
  ![deploy to vercel](https://i.imgur.com/C2KPpbi.png)
- connect to your git provider
- import the project
  ![import project](https://i.imgur.com/7B9QYhd.png)
  select the repository to update the access setting.
  ![repository access](https://i.imgur.com/aI7XVJJ.png)
- leave all the settings as default
  Because we use the Next.js template without any customization, Vercel will identify the project and provide the correct default settings automatically.  
  ![settings](https://i.imgur.com/L7pas4W.png)
- click the link to check our application after the status change from `Building` to `Ready`
  ![deploy status](https://i.imgur.com/WwpPrG0.png)

Now, we have deployed our application online. Next, let's check how to create multiple environments for our application.

## Apply Environment Variables for Multiple Environments

### The environments provide by Vercel: Production, Preview, and Development

We will see that Vercel provides multiple links for the deployment.  
![link environments](https://i.imgur.com/XtcrS4Q.png)

And there are three different environments in Vercel.  
![vercel environment](https://i.imgur.com/qjZWNu9.png)

So, what's the relationship between those links and the environments (production, preview, development)?

1. Vercel default provide two URLs for each project: `[ProjectName].now.sh` and `[ProjectName].[VercelAccount].now.sh`
2. Vercel will create an URL with a random hash for each deployment: `[ProjectName]-[hash].now.sh`
3. If we deploy to the production environment, then both URLs (`[ProjectName].now.sh`, `[ProjectName].[VercelAccount].now.sh`) will be linked to this deployment.
4. If we deploy to the preview environment, then only `[ProjectName].[VercelAccount].now.sh` will be linked to this deployment.
5. Development is for our local environment.

|                                        | Production | Preview | Development |
| :------------------------------------- | :--------: | :-----: | :---------: |
| `[ProjectName].now.sh`                 |     v      |    x    |      X      |
| `[ProjectName].[VercelAccount].now.sh` |     v      |    v    |      X      |
| `[ProjectName]-[hash].now.sh`          |     v      |    v    |      X      |
| `localhost:xxxx`                       |     x      |    x    |      V      |

And of course we can customize the URL by clicking `View Domains`.  
![control](https://i.imgur.com/BHEConD.png)

Furthermore, we can bind the domain with a specific git branch.  
![domain with branch](https://i.imgur.com/TPWXgpj.png)

### Set environment variables at Vercel

We can set different environment variables for all three environments.  
`Dashboard > Project > Settings > General`
![environment variables setting](https://i.imgur.com/18szFVq.png)

Vercel provides a few [system environment variables](https://vercel.com/docs/v2/build-step#system-environment-variables) for us.  
![system environment variables](https://i.imgur.com/ASP02WA.png)

### Set environment variables at Next.js

After finishing the setting of the environment variables at Vercel, now let's check how to apply those variables in the Next.js project.  
_(In this article, we use `.env` for environment variables. It is for Next.js versions 9.4 and up. If you’re using an older version of Next.js, check [Environment Variables in next.config.js](https://nextjs.org/docs/api-reference/next.config.js/environment-variables).)_

To apply environment variables in the Next.js project, we need to create a `.env.local` file at the root folder.

```
DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword
NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk
```

Or we can download the variables from the Vercel.

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

And we can bind the download command with the dev script. This will make sure we always apply the latest variables.

```json
{
  "scripts": {
    "predev": "vercel env pull .env.local",
    "dev": "next",
    ...
  }
}
```

Because Next.js is a server-side render framework, the environment variables have a little difference between the client (browser) and server-side.

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
   If we want to use those variables at the client-side, then we need to prefix the variable with `NEXT_PUBLIC_`. This will allow us to use those variables anywhere in our code.

   ```javascript
   import setupAnalyticsService from "../lib/my-analytics-service";

   setupAnalyticsService(process.env.NEXT_PUBLIC_ANALYTICS_ID);

   export default function HomePage() {
     return <h1>Hello World</h1>;
   }
   ```

   ⚠ We need to be careful when prefixing the variable with `NEXT_PUBLIC_`. Never public important information like the token or password.

## Deploy the Application to Different Environments

The last part of this article is about how to deploy our application to the preview and production environment. This is quite straightforward by using Vercel Cli.

1. Deploy to preview environment

```shell
vercel
```

2. Deploy to production environment

```shell
vercel --prod
```

Except manually deploy through Vercel Cli, if we create the project by git provider, then Vercel will handle the deploy automatically.

- Pushing or merging to the default branch (commonly "master") will trigger the production deployment.
- Pushing or pull requests made to branches will trigger preview deployment.
  ![branch-preview](https://i.imgur.com/RveAI2L.png)

---

## Reference

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Document](https://vercel.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/v2/build-step#environment-variables)
- [Vercel Git Integrations](https://vercel.com/docs/v2/git-integrations)

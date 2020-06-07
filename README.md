# Vercel (Zeit Now) & Next.js

How to apply multiple environments for our application by using Next.js and Vercel(Zeit Now).

## Step by Step

1. Init a Next.js project

```
npx create-next-app [ProjectName]
```

2. Create repository at GitHub, GitLab, or Bitbucket. Then link with our project.

```
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

## Reference

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/v2/build-step#environment-variables)
- [Vercel document](https://vercel.com/docs)

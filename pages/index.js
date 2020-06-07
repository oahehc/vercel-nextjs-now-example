import React from "react";

const envVariables = [
  { name: "URL", clientValue: process.env.VERCEL_URL, serverKey: "url" },
  {
    name: "Branch",
    clientValue: process.env.VERCEL_GITHUB_COMMIT_REF,
    serverKey: "branch",
  },
  {
    name: "Commit",
    clientValue: process.env.VERCEL_GITHUB_COMMIT_SHA,
    serverKey: "commit",
  },
  {
    name: "NEXT_PUBLIC_ENVIRONMENT",
    clientValue: process.env.NEXT_PUBLIC_ENVIRONMENT,
    serverKey: "env",
  },
];

const Home = (props) => (
  <div>
    <div className="hero">
      {envVariables.map(({ name, clientValue, serverKey }) => (
        <div key={serverKey}>
          {name}: {clientValue} | {props[serverKey]}
        </div>
      ))}
    </div>
    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
    `}</style>
  </div>
);

export async function getStaticProps() {
  return {
    props: {
      url: process.env.VERCEL_URL,
      env: process.env.NEXT_PUBLIC_ENVIRONMENT,
      branch: process.env.VERCEL_GITHUB_COMMIT_REF,
      commit: process.env.VERCEL_GITHUB_COMMIT_SHA,
    },
  };
}

export default Home;

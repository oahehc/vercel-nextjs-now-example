import React from "react";

const envVariables = [
  { name: "URL", value: process.env.VERCEL_URL },
  { name: "ENVIRONMENT", value: process.env.ENVIRONMENT },
  { name: "Branch", value: process.env.VERCEL_GITHUB_COMMIT_REF },
  { name: "Commit", value: process.env.VERCEL_GITHUB_COMMIT_SHA },
];

const Home = () => (
  <div>
    <div className="hero">
      {envVariables.map(({ name, value }, index) => (
        <div key={index}>
          {name}: {value}
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

export default Home;

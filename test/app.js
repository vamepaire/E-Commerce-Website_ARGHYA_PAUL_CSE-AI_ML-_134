"use strict";

const autocannon = require("autocannon");

const urls = [
  "http://localhost:3000",
  "http://localhost:3000/owners/register",
  "http://localhost:3000/owners/login",
  "http://localhost:3000/owners/logout",
];

urls.forEach((url) => {
  const instance = autocannon(
    {
      url,
      duration: 90,
      connections: 100,
    },
    (err, result) => {
      if (err) {
        console.error("Error:", err);
      } else {
        console.log(`URL: ${url}`);
        console.log("Number of Requests:", result.requests.total);
        console.log("Duration:", result.duration);
      }
    }
  );

  autocannon.track(instance, {
    renderResultsTable: false,
  });
});

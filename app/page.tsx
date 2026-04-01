import React from "react";

const page = () => {
  console.log(process.env.NEXT_PUBLIC_APPWRITE_URL);

  return <h1>A blog app with appwriter</h1>;
};

export default page;

"use client";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";

const page = () => {
  return (
    <LogoutLink>
      <button className="p-4 bg-red-300 rounded-2xl">Logout</button>
    </LogoutLink>
  );
};

export default page;

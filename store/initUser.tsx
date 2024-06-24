"use client";

import { User } from "@supabase/supabase-js";
import React, { useEffect, useRef } from "react";
import { useUser } from "./user";

export default function initUser({ user }: { user: User | null }) {
  const initState = useRef(false);

  useEffect(() => {
    if (initState.current && user) {
      useUser.setState({ user });
    }
    initState.current = true;
    //eslint-disable-next-line
  }, []);
  return <></>;
}

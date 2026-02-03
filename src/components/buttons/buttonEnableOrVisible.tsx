import Spinner from "@/components/assets/spinner";
import React, { useState } from "react";

interface PropsButtonEnableOrVisible {
  disable: boolean;
  loading: boolean;
  type: "submit" | "reset" | "button" | undefined;
  text:string
}

export default function ButtonEnableOrVisible({
  disable,
  loading,
  type,
  text
}: PropsButtonEnableOrVisible) {

  return (
    <button
      type={type}
      disabled={!disable}
      className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center text-white transition cursor-pointer ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-[#001c47] hover:bg-[#02122a]"
      }`}
    >
      {loading ? <Spinner color="white" /> :text}
    </button>
  );
}

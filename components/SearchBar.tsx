"use client";

import React, { FormEvent, useState } from "react";
import { scrapeAndStoreProduct } from "@/lib/actions";

const isValidAmazonProductUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname;

    if (
      host.includes("amazon.com") ||
      host.includes("amazon.") ||
      host.endsWith("amazon")
    ) {
      return true;
    }
  } catch (error: any) {
    console.log("problem validating url", error?.message);
    return false;
  }

  return false;
};
const SearchBar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    console.log("value", searchPrompt);

    const isValidLink =
      isValidAmazonProductUrl(searchPrompt);

    if (!isValidLink) {
      setLoading(false);
      return alert("Please provide a valid Amazon link");
    }

    try {
      const product = await scrapeAndStoreProduct(
        searchPrompt
      );

      setLoading(false);
    } catch (error: any) {
      console.log("problem with search", error.message);
      setLoading(false);
    }
  };
  return (
    <form
      className='flex flex-wrap gap-4 mt-12'
      onSubmit={handleSubmit}
    >
      <input
        className='searchbar-input'
        type='text'
        placeholder='Enter product link'
        onChange={(e) => setSearchPrompt(e.target.value)}
        value={searchPrompt}
      />
      <button
        disabled={searchPrompt === "" || loading}
        className='searchbar-btn'
        type='submit'
      >
        {loading ? "Searching" : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;

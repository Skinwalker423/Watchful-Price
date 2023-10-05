"use server";

import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  const username = String(process.env.BRIGHTDATA_USERNAME);
  const password = String(process.env.BRIGHTDATA_PASSWORD);
  const host = String(process.env.BRIGHTDATA_HOST);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host,
    port,
    rejectUnauthorized: false,
  };

  try {
    const response = await axios.get(url, options);
    console.log(
      "this is the response data:",
      response.data
    );
  } catch (error: any) {
    throw new Error(
      `failed to scrape product: ${error.message}`
    );
  }
}

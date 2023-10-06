"use server";

import axios from "axios";
import * as cheerio from "cheerio";
import { extractPrice } from "../utils";

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

    const $ = cheerio.load(response.data);
    const title = $("#productTitle").text().trim();
    const price = $("span.a-price-whole").text().trim();

    const currentPrice = extractPrice(
      $("#attach-base-product-price"),
      $(".a-price.a-text-price"),
      $(".priceToPay span.a-offscreen"),
      $("a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base")
    );

    console.log(
      "title and price of macbook",
      title,
      currentPrice
    );
  } catch (error: any) {
    throw new Error(
      `failed to scrape product: ${error.message}`
    );
  }
}

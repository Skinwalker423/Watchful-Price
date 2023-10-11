"use server";

import axios from "axios";
import * as cheerio from "cheerio";
import {
  extractCurrency,
  extractPrice,
  extractQty,
} from "../utils";

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
      $(".priceToPay span.a-price-whole"),
      $(".a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base")
    );

    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );

    const status = $("#availability span");

    const outOfStock =
      status.text().trim().toLowerCase() ===
      "currently unavailable";

    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "";

    const parsedImages = JSON.parse(images);
    const imgUrlsArr = Object.keys(parsedImages);
    console.log("image", imgUrlsArr);

    const currency = extractCurrency($(".a-price-symbol"));

    const discountRate = $(".savingsPercentage")
      .text()
      .replace(/[-%]/g, "");

    const category = $("");

    console.log(
      "title current price, and original price of macbook",
      title,
      currentPrice,
      originalPrice,
      currency,
      discountRate
    );
    if (outOfStock) {
      console.log("out of stock", outOfStock);
    } else {
      const qty = extractQty(status);
      console.log("currently in stock", qty);
    }
  } catch (error: any) {
    throw new Error(
      `failed to scrape product: ${error.message}`
    );
  }
}

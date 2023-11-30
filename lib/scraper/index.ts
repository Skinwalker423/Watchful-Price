"use server";

import axios from "axios";
import * as cheerio from "cheerio";
import {
  extractCurrency,
  extractDescription,
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

    const qty = extractQty(status);

    const outOfStock =
      status.text().trim().toLowerCase() ===
      "currently unavailable";

    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "";

    const parsedImages = JSON.parse(images);
    const imgUrlsArr = Object.keys(parsedImages);

    const currency = extractCurrency($(".a-price-symbol"));

    const discountRate = $(".savingsPercentage")
      .text()
      .replace(/[-%]/g, "");

    const totalRatingsText = $(
      ".a-row.a-spacing-medium.averageStarRatingNumerical span.a-size-base.a-color-secondary"
    );

    const totalRatings = extractQty(totalRatingsText);

    const avgRatingsText = $(
      ".a-size-base.a-nowrap span.a-size-medium.a-color-base"
    );
    const avgRating = extractPrice(avgRatingsText);

    const description = extractDescription($);

    const data = {
      url,
      currency: currency || "$",
      image: imgUrlsArr[0],
      title,
      currentPrice:
        Number(currentPrice) || Number(originalPrice),
      originalPrice:
        Number(originalPrice) || Number(currentPrice),
      lowestPrice:
        Number(currentPrice) || Number(originalPrice),
      highestPrice:
        Number(originalPrice) || Number(currentPrice),
      average:
        Number(currentPrice) || Number(originalPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      category: "category",
      reviewsCount: Number(totalRatings),
      stars: Number(avgRating),
      outOfStock: outOfStock,
      description,
    };

    console.log("data", data);

    return data;
  } catch (error: any) {
    throw new Error(
      `failed to scrape product: ${error.message}`
    );
  }
}

export function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();

    if (priceText) {
      const cleanPrice = priceText.replace(/[^\d.]/g, "");

      let firstPrice;

      if (cleanPrice) {
        firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
      }

      return firstPrice || cleanPrice;
    }
  }

  return "";
}

export function extractQty(elements: any) {
  const qtyText = elements.text().trim();

  if (qtyText) {
    const cleanPrice = qtyText.replace(/[^\d]/g, "");

    return cleanPrice;
  }

  return "";
}

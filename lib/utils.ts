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

export function extractQty(element: any) {
  const qtyText = element.text().trim();

  if (qtyText) {
    const cleanPrice = qtyText.replace(/[^\d]/g, "");

    return cleanPrice;
  }

  return "";
}

export function extractCurrency(element: any) {
  const currencyText = element.text().trim().slice(0, 1);

  if (currencyText) {
    return currencyText;
  }

  return "";
}

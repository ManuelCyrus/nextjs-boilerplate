type IvaCalculationResult = {
  baseTributavel: number      // preço sem IVA
  iva: number                // valor do IVA
  totalComIva: number        // preço final
}


export function calculateFinalPrice(
  unitPrice: number,
  quantity: number,
  ivaRate: number =14,
  priceIncludesIva: boolean = false
): IvaCalculationResult {
  const totalPrice = unitPrice * quantity
  const taxa = ivaRate/100;

  if (priceIncludesIva) {
    // Preço COM IVA incluído
    const baseTributavel = +(totalPrice / (1 + taxa)).toFixed(2)
    const iva = +(totalPrice - baseTributavel).toFixed(2)

    return {
      baseTributavel,
      iva,
      totalComIva: +totalPrice.toFixed(2),
    }
  }

  // Preço SEM IVA
  const baseTributavel = +totalPrice.toFixed(2)
  const iva = +(baseTributavel * ivaRate).toFixed(2)
  const totalComIva = +(baseTributavel + iva).toFixed(2)

  return {
    baseTributavel,
    iva,
    totalComIva,
  }
}


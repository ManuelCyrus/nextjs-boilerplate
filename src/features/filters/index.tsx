

// function for search in inputs...
export const  FilterInputs =(list: any[], valueSearch: string) =>{
  const text = valueSearch.toLowerCase();

  return Array.isArray(list)?list.filter((item) => {
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(text)
    );
  }):[];
}

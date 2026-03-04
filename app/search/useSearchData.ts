import { useState } from "react";
import type { SearchData } from "./types";

const EMPTY_SEARCH: SearchData = { recent: [] };

export function useSearchData(initial: SearchData = EMPTY_SEARCH) {
  const [data, setData] = useState<SearchData>(initial);
  return { data, setData };
}

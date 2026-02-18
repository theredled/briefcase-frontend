"use client"
import {useSearchParams} from "next/dist/client/components/navigation";
import {useSearch} from "@/search-context";

export function SearchBar() {
    const { setQuery } = useSearch();

    return (
      <div>
        <input className="search-input" id="search-input"
          type="search"
          placeholder="Rechercher..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    );
}
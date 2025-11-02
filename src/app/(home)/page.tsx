"use client";

import { useEffect } from "react";
import { usePaginatedQuery } from "convex/react";
import { useSearchParam } from "@/hooks/use-search-param";

import { Navbar } from "./navbar";
import { DocumentsTable } from "./documents-table";
import { TemplatesGallery } from "./templates-gallery";
import { api } from "../../../convex/_generated/api";

const Home = () => {
  const [search] = useSearchParam();
  const { 
    results, 
    status, 
    loadMore
  } = usePaginatedQuery(api.documents.get, { search }, { initialNumItems: 5 });

  useEffect(() => {
  // Handle back/forward navigation
  const handleNavigation = () => {
    window.location.href = '/?from=logo';
    // window.location.reload();
  };
  window.addEventListener('popstate', handleNavigation);

  // Handle logo navigation
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('from') === 'logo') {
    // Remove the 'from' parameter to prevent infinite reloads
    urlParams.delete('from');
    window.history.replaceState({}, '', `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`);
    window.location.reload();
  }

  return () => {
    window.removeEventListener('popstate', handleNavigation);
  };
}, []);

  return ( 
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplatesGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
   );
}
 
export default Home;
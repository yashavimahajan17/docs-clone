"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";

import { Room } from "./room";
import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Toolbar } from "./toolbar";
import { api } from "../../../../convex/_generated/api";
import { useEffect } from "react";

interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
};

export const Document = ({ preloadedDocument }: DocumentProps) => {
  const document = usePreloadedQuery(preloadedDocument);

  useEffect(() => {
    // Handle back/forward navigation
    const handleNavigation = () => {
      window.location.href = '/?from=dashboard';
      // window.location.reload();
    };
    window.addEventListener('popstate', handleNavigation);
  
    // Handle logo navigation
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('from') === 'dashboard') {
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
    <Room>
      <div className="min-h-screen bg-[#FAFBFD]">
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
          <Navbar data={document} />
          <Toolbar />
        </div>
        <div className="pt-[114px] print:pt-0">
          <Editor initialContent={document.initialContent} />
        </div>
      </div>
    </Room>
   );
};

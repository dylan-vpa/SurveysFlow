import { Card } from "~/components/ui/card"; 
import { useEffect } from "react";
import { Search, X } from "lucide-react";

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const card = document.getElementById("search-card");
      if (card && !card.contains(event.target as Node)) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onOpenChange]);

  return (
    <div className={`fixed z-10 transition-opacity duration-200 ${open ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}>
      {open && (
        <>
          <div className="fixed inset-0 bg-black" /> 
          <Card 
            id="search-card" 
            className="fixed top-1/2 left-1/2 w-96 p-0 bg-white rounded-lg transform -translate-x-1/2 -translate-y-1/2 opacity-100"
          >
            <div className="flex items-center p-2 mt-2">
              <Search className="w-4 h-4 mr-2" />
              <input 
                placeholder="Escribe tu búsqueda..." 
                className=" flex-grow border-none outline-none bg-transparent" 
              />
              <button 
                className="ml-2 p-0 bg-transparent border-none text-gray-800" 
                onClick={() => onOpenChange(false)}
              >
                <X className="w-4 h-4" /> 
              </button>
            </div>
            <div className="p-2">
              <ul>
                <li className="py-2 px-4 mb-2 rounded-lg hover:bg-gray-200 transition-colors">Surveys</li>
                <li className="py-2 px-4 mb-2 rounded-lg hover:bg-gray-200 transition-colors">Analytics</li>
                <li className="py-2 px-4 mb-2 rounded-lg hover:bg-gray-200 transition-colors">Seetings</li>
              </ul>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
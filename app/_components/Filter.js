"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Filter() {
  // Obținem parametrii din URL pentru a gestiona filtrele aplicate
  const searchParams = useSearchParams(); // Parametrii de căutare din URL (ex: ?capacity=4)
  const router = useRouter(); // Folosim router-ul pentru a naviga fără reîncărcarea paginii
  const pathname = usePathname(); // Folosim path-ul curent al paginii (ex: "/cabins")

  const activeFilter = searchParams.get("capacity") ?? "all"; // Setăm filtrul activ pe baza parametrilor din URL

  function handleFilter(filter) {
    // Creăm o instanță de URLSearchParams pe baza URL-ului curent
    const params = new URLSearchParams(searchParams);

    // Actualizăm sau adăugăm parametrul 'capacity'
    params.set("capacity", filter);

    // Înlocuim URL-ul curent fără a reîncărca pagina
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      {/* Butoane pentru fiecare opțiune de filtrare */}
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      } px-5 py-2 hover:bg-primary-700`} // Aplica stilul pentru butonul activ
      onClick={() => handleFilter(filter)} // Modifică filtrul la click
    >
      {children} {/* Textul butonului */}
    </button>
  );
}

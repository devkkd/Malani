"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/website/ProductCard";
import Container from "@/components/website/Container";

function CollectionPageInner() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category");

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [techniques, setTechniques] = useState([]);
  const [seasons, setSeasons] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTechnique, setSelectedTechnique] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Load filter options
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [catRes, techRes, seasonRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/techniques`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/seasons`),
        ]);
        const [catData, techData, seasonData] = await Promise.all([
          catRes.json(), techRes.json(), seasonRes.json(),
        ]);
        if (catData.success) {
          setCategories(catData.data);
          // Auto-select category from URL slug
          if (categorySlug) {
            const match = catData.data.find(c => c.slug === categorySlug);
            if (match) setSelectedCategory(match._id);
          }
        }
        if (techData.success) setTechniques(techData.data);
        if (seasonData.success) setSeasons(seasonData.data);
      } catch (err) {
        console.error("Failed to load filters", err);
      }
    };
    fetchFilters();
  }, [categorySlug]);

  // Fetch ALL products once (client-side filtering is more reliable)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?limit=500`);
        const data = await res.json();
        if (data.success) setAllProducts(data.data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Client-side filtering
  const products = allProducts.filter((p) => {
    if (selectedCategory && p.category?._id !== selectedCategory) return false;
    if (selectedTechnique && p.technique?._id !== selectedTechnique) return false;
    if (selectedSeason && p.season?._id !== selectedSeason) return false;
    return true;
  });

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedTechnique("");
    setSelectedSeason("");
  };

  const hasActiveFilters = selectedCategory || selectedTechnique || selectedSeason;

  const activeFilterLabels = [
    selectedCategory && categories.find((c) => c._id === selectedCategory)?.name,
    selectedTechnique && techniques.find((t) => t._id === selectedTechnique)?.name,
    selectedSeason && seasons.find((s) => s._id === selectedSeason)?.name,
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#FFFEF5]">
      {/* Page Hero */}
      <div className="pt-10 pb-8 border-b border-[#666141]/10">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl text-black leading-tight">
                Our Collection
              </h1>
              <p className="text-2xl md:text-3xl text-[#666141] font-normal opacity-90">
                Handcrafted with Heritage &amp; Heart
              </p>
              {/* {!loading && (
                <p className="text-sm text-black pt-1">
                  {products.length} {products.length === 1 ? "product" : "products"} found
                </p>
              )} */}
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 self-start border border-[#666141]/30 text-[#666141] px-4 py-2.5 rounded-full text-sm"
            >
              <SlidersHorizontal size={16} />
              Filters
              {hasActiveFilters && (
                <span className="w-5 h-5 bg-[#666141] text-white text-[10px] rounded-full flex items-center justify-center">
                  {activeFilterLabels.length}
                </span>
              )}
            </button>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-8">
          {/* Desktop Filters Row */}
          <div className="hidden md:flex items-center gap-3 mb-8 flex-wrap">
            <span className="text-sm text-gray-500 mr-1">Filter by:</span>
            <FilterDropdown label="Category" value={selectedCategory} options={categories} onChange={setSelectedCategory} />
            <FilterDropdown label="Technique" value={selectedTechnique} options={techniques} onChange={setSelectedTechnique} />
            <FilterDropdown label="Season" value={selectedSeason} options={seasons} onChange={setSelectedSeason} />
            {hasActiveFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#666141] transition-colors ml-1">
                <X size={14} /> Clear all
              </button>
            )}
          </div>

          {/* Mobile Filters Panel */}
          {showFilters && (
            <div className="md:hidden mb-6 p-5 bg-white rounded-xl border border-[#666141]/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#666141]">Filters</span>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="text-xs text-gray-500 hover:text-[#666141]">Clear all</button>
                )}
              </div>
              <MobileSelect label="Category" value={selectedCategory} options={categories} onChange={setSelectedCategory} />
              <MobileSelect label="Technique" value={selectedTechnique} options={techniques} onChange={setSelectedTechnique} />
              <MobileSelect label="Season" value={selectedSeason} options={seasons} onChange={setSelectedSeason} />
            </div>
          )}

          {/* Active filter chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-6">
              {activeFilterLabels.map((label) => (
                <span key={label} className="inline-flex items-center gap-1.5 bg-[#E9E4B5] text-[#666141] text-xs px-3 py-1.5 rounded-full">
                  {label}
                </span>
              ))}
            </div>
          )}

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-[#E9E4B5]/50 rounded-sm mb-3" />
                  <div className="h-3 bg-[#E9E4B5]/50 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-[#E9E4B5]/50 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-2xl text-[#666141]/40 mb-3">No products found</p>
              <p className="text-sm text-gray-400 mb-6">Try adjusting or clearing your filters</p>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-sm text-[#666141] border border-[#666141]/30 px-6 py-2.5 rounded-full hover:bg-[#666141] hover:text-white transition-colors">
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 items-stretch">
              {products.map((product, i) => (
                <ProductCard key={product._id} product={product} priority={i < 4} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

function FilterDropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o._id === value);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm transition-colors ${
          value ? "bg-[#666141] text-white border-[#666141]" : "bg-white text-gray-700 border-[#666141]/20 hover:border-[#666141]/50"
        }`}
      >
        {selected ? selected.name : label}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-[#666141]/10 rounded-xl shadow-xl z-20 py-1.5 overflow-hidden">
            <button
              onClick={() => { onChange(""); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${!value ? "text-[#666141] font-medium bg-[#E9E4B5]/30" : "text-gray-600 hover:bg-[#FFFEF5]"}`}
            >
              All {label}s
            </button>
            {options.map((opt) => (
              <button
                key={opt._id}
                onClick={() => { onChange(opt._id); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${value === opt._id ? "text-[#666141] font-medium bg-[#E9E4B5]/30" : "text-gray-600 hover:bg-[#FFFEF5]"}`}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function MobileSelect({ label, value, options, onChange }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1.5">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-[#FFFEF5] border border-[#666141]/20 text-sm text-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#666141]/30 pr-8"
        >
          <option value="">All {label}s</option>
          {options.map((opt) => (
            <option key={opt._id} value={opt._id}>{opt.name}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

export default function CollectionPage() {
  return (
    <Suspense fallback={null}>
      <CollectionPageInner />
    </Suspense>
  );
}

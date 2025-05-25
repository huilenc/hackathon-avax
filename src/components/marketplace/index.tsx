import MarketplaceCard from "./card";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 12;

export default async function Marketplace({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const supabase = createSupabaseBrowserClient();

  // Get total count
  const { count } = await supabase
    .from("portfolio")
    .select("*", { count: "exact", head: true });

  console.log("count******", count);

  // Get paginated data
  const { data: portfolios, error } = await supabase
    .from("portfolio")
    .select("*")
    .range((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE - 1)
    .order("created_at", { ascending: false });

  console.log("portfolios******", portfolios);

  if (error) {
    console.error(error);
    return <div>Error loading portfolios</div>;
  }

  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {portfolios?.map((portfolio) => (
          <MarketplaceCard key={portfolio.id} portfolio={portfolio} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`?page=${currentPage > 1 ? currentPage - 1 : 1}`}
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => {
                const pageNumber = i + 1;
                // Show first page, last page, and pages around current page
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 &&
                    pageNumber <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        href={`?page=${pageNumber}`}
                        isActive={currentPage === pageNumber}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })}

              <PaginationItem>
                <PaginationNext
                  href={`?page=${currentPage < totalPages ? currentPage + 1 : totalPages}`}
                  aria-disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* No Results */}
      {(!portfolios || portfolios.length === 0) && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold">No portfolios found</h3>
          <p className="text-muted-foreground">
            Check back later for new portfolios
          </p>
        </div>
      )}
    </div>
  );
}

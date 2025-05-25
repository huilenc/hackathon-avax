import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Portfolio } from "@/types/database.types";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

export default function MarketplaceCard({
  portfolio,
}: {
  portfolio: Portfolio;
}) {
  return (
    <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg group">
      <CardContent className="p-0">
        {/* Portfolio Image with AVAX Coin */}
        <div className="relative aspect-video">
          {/* AVAX Coin */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-8 z-10 w-8 h-8 transition-all duration-500 group-hover:translate-y-[120%]">
            <Image
              src="/avax-coin.png"
              alt="AVAX Coin"
              width={32}
              height={32}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Main Portfolio Image */}
          <Image
            src={portfolio.image_url || "/placeholder.svg"}
            alt={`Portfolio by ${portfolio.user_id}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg line-clamp-1">
                {portfolio.name || "Freelancer Portfolio"}
              </h3>
              <span className="text-sm font-medium text-green-600">
                ${formatCurrency(portfolio.rate)}/hr
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {portfolio.description}
            </p>
          </div>

          {/* Hire Button */}
          <Link href={`/hire/${portfolio.id}`} className="block">
            <Button className="w-full">Hire Now</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

import { ArrowUpRight } from "lucide-react";

import { Button } from "../ui/button";
import Link from "next/link";

const SupportTeamLink = () => (
  <Link href="#">
    <Button variant="link" size="link" className="text-text-accent">
      Тех підтримка <ArrowUpRight />
    </Button>
  </Link>
);

export default SupportTeamLink;

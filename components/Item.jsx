import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function Item({ title, description }) {
  return (
    <Card>
      <CardHeader>
        <img src="https://placehold.co/500x500" alt="" className="rounded-lg" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="gap-4 justify-evenly">
        <Button className="w-full">
          <Link href="#">View</Link>
        </Button>
        <Button className="w-full" variant="outline">
          <Link href="#">Add to Cart</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

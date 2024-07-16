import Hero from "@/components/Hero";
import Item from "@/components/Item";

import { data } from "@/lib/data";

export default function Home() {
  return (
    <main className="min-h-screen container mx-auto mt-8">
      <Hero />
      <section className="my-12">
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          All Products
        </h2>
        <small className="text-sm font-medium leading-none">
          Give your wardrobe a fresh look with our latest collection.
        </small>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item, index) => (
            <Item key={index} {...item} />
          ))}
        </div>
      </section>
    </main>
  );
}

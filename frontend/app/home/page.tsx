"use client";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// Simulate the API response you provided
const res = await fetch('http://localhost:1337/api/catogaries?populate[items][populate]=image');
const data = await res.json();
const baseUrl = 'http://localhost:1337';

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  return (
    <section className="text-black-500 body-font">
      <div>
        <nav className="flex gap-4 mb-8">
          {data.data.map((cat: any) => (
            <button
              key={cat.id}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => {
                const el = document.getElementById(`cat-${cat.id}`);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              type="button"
            >
              {cat.name}
            </button>
          ))}
        </nav>
      </div>
      <div className="container px-4 py-8 mx-auto">
        {data.data.map((cat: any, idx: number) => (
          <div key={cat.id} id={`cat-${cat.id}`} className="mb-16">
            <h2 className="text-2xl font-bold mb-6">{cat.name}</h2>
            <div className="flex flex-wrap justify-center -mx-2">
              {cat.items && cat.items.length > 0 ? (
                cat.items.map((item: any) => (
                  <Dialog key={item.id} open={selectedItem?.id === item.id} onOpenChange={(open) => !open && setSelectedItem(null)}>
                    <DialogTrigger asChild>
                      <div
                        className="p-2 w-full md:w-1/2 lg:w-1/3 cursor-pointer"
                        onClick={() => setSelectedItem(item)}
                      >
                        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                          <Image
                            priority={true}
                            src={
                              item.image?.formats?.small?.url
                                ? `${baseUrl}${item.image.formats.small.url}`
                                : "https://dummyimage.com/500x300"
                            }
                            alt={item.name}
                            width={500}
                            height={300}
                          />
                          <div className="p-6">
                            <h3 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                              {item.catogary}
                            </h3>
                            <h1 className="title-font text-lg font-medium text-black mb-3">
                              {item.name}
                            </h1>
                            <p className="leading-relaxed mb-3">{item.description}</p>
                            <div className="flex-row items-center flex-wrap">
                              <div className="flex items-center flex-wrap">
                                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                                  Add to cart
                                </button>
                              </div>
                              <div className="flex items-center flex-wrap ml-4">
                                <span className="font-semibold">Price: {item.price}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{item.name}</DialogTitle>
                        <DialogDescription>
                          {item.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col items-center gap-4">
                        <Image
                          src={
                            item.image?.formats?.medium?.url
                              ? `${baseUrl}${item.image.formats.medium.url}`
                              : "https://dummyimage.com/500x300"
                          }
                          alt={item.name}
                          width={350}
                          height={350}
                          className="rounded"
                        />
                        {/* Example options, you can customize as needed */}
                        <div className="w-full">
                          <label className="block mb-2 font-semibold">Choose Size:</label>
                          <select className="w-full border rounded px-2 py-1 mb-4">
                            <option>Regular</option>
                            <option>Large</option>
                          </select>
                          <label className="block mb-2 font-semibold">Extras:</label>
                          <div className="flex gap-4 mb-4">
                            <label>
                              <input type="checkbox" className="mr-1" /> Cheese
                            </label>
                            <label>
                              <input type="checkbox" className="mr-1" /> Jalapeños
                            </label>
                          </div>
                        </div>
                        <div className="font-bold text-lg">Price: {item.price}</div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded">
                            Add to Cart
                          </button>
                        </DialogClose>
                        <DialogClose asChild>
                          <button className="bg-gray-300 px-4 py-2 rounded">
                            Cancel
                          </button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ))
              ) : (
                <div className="text-gray-400">No items in this category.</div>
              )}
            </div>
            {idx !== data.data.length - 1 && <br />}
          </div>
        ))}
      </div>
    </section>
  );
}

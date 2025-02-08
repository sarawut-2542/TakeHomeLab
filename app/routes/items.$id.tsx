import { json, LoaderFunction, useLoaderData } from "@remix-run/react";
import { useParams } from "react-router-dom";

interface Item {
  id: number;
  category: string;
  name: string;
  description: string;
}


export const loader: LoaderFunction = async ({ params }) => {
  const response = await fetch(`http://localhost:5000/api/items/${params.id}`);
  if (!response.ok) {
    throw new Response("Item Not Found", { status: 404 });
  }
  const item: Item = await response.json();
  return json(item);
};

export default function ItemDetail() {
  const item = useLoaderData<Item>();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">{item.name}</h1>
      <p className="text-lg text-center text-gray-600">{item.category}</p>
      <p className="mt-4 text-center">{item.description}</p>
      <div className="mt-6 text-center">
        <a href="/" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Back</a>
      </div>
    </div>
  );
}

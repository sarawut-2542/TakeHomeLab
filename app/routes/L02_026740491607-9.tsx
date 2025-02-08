import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}

const ProductForm: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  // เพิ่มสินค้าใหม่
  const addProduct = () => {
    if (name && price) {
      const newProduct: Product = {
        id: products.length + 1,
        name,
        price: parseFloat(price),
        image: image || undefined,
      };
      setProducts([...products, newProduct]);
      clearForm();
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  // ล้างข้อมูลฟอร์ม
  const clearForm = () => {
    setName("");
    setPrice("");
    setImage("");
  };

  // ยืนยันการลบสินค้า
  const confirmDelete = (id: number) => {
    setShowPopup(true);
    setProductToDelete(id);
  };

  // ลบสินค้า
  const deleteProduct = () => {
    if (productToDelete !== null) {
      setProducts(products.filter((product) => product.id !== productToDelete));
      setShowPopup(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="p-5 flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-lg font-bold mb-4 bg-sky-500 text-white p-2 rounded text-center">เพิ่มข้อมูลสินค้า</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">ชื่อสินค้า</label>
          <input
            type="text"
            placeholder="ชื่อสินค้า"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">ราคา</label>
          <input
            type="number"
            placeholder="ราคา"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">รูปภาพ</label>
          <input
            type="text"
            placeholder="URL รูปภาพ"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={addProduct}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          บันทึก
        </button>
        <button
          onClick={clearForm}
          className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
        >
          เคลียร์
        </button>
      </div>

      <table className="mt-5 w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-blue-500">
            <th className="border border-gray-200 p-2">No.</th>
            <th className="border border-gray-200 p-2">ชื่อสินค้า</th>
            <th className="border border-gray-200 p-2">ราคา</th>
            <th className="border border-gray-200 p-2">รูปภาพสินค้า</th>
            <th className="border border-gray-200 p-2">ดำเนินการ</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} className="text-center">
              <td className="border border-gray-200 p-2">{index + 1}</td>
              <td className="border border-gray-200 p-2">{product.name}</td>
              <td className="border border-gray-200 p-2">{product.price.toFixed(2)}</td>
              <td className="border border-gray-200 p-2">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-12 h-12 mx-auto" />
                ) : (
                  "ไม่มีรูปภาพ"
                )}
              </td>
              <td className="border border-gray-200 p-2">
                <button
                  onClick={() => confirmDelete(product.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <p className="mb-4">คุณต้องการลบสินค้านี้หรือไม่?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={deleteProduct}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                ยืนยัน
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductForm;

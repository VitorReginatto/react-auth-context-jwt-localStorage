import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Products = () => {

  useEffect(() => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
      try {
        const response = await api.post("/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    }

    fetchProducts();
  }, []);

  return (


    <div>
      <Link to="/">Home</Link>
      <p>Produtos</p>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>


        </tbody>
      </table>
    </div>
  );
};

export default Products;

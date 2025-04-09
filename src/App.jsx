import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Input, Pagination } from "antd";
import ProductCard from "./components/ProductCard";
import SidebarFilters from "./components/SidebarFilters";
import "./App.css";

const { Content, Sider } = Layout;
const { Search } = Input;

const App = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 1000],
    rating: 0,
    search: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const fetchProducts = async () => {
    setIsLoading(true);
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setProducts(data);
    setIsLoading(false);
  };

  const fetchCategories = async () => {
    setIsCategoriesLoading(true);
    const res = await fetch("https://fakestoreapi.com/products/categories");
    const data = await res.json();
    setCategories(data);
    setIsCategoriesLoading(false);
  };

  const applyFilters = () => {
    let result = products;
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }
    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );
    result = result.filter((p) => p.rating?.rate >= filters.rating);
    result = result.filter((p) =>
      p.title.toLowerCase().includes(filters.search.toLowerCase())
    );
    setFilteredProducts(result);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({ category: "", priceRange: [0, 1000], rating: 0, search: "" });
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={300} theme="light">
        <SidebarFilters
          filters={filters}
          setFilters={setFilters}
          categories={categories}
          clearFilters={clearFilters}
          isCategoriesLoading={isCategoriesLoading}
        />
      </Sider>
      <Layout>
        <Content style={{ padding: "20px" }}>
          <Search
            placeholder="Search products"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            style={{ marginBottom: "20px", maxWidth: 400 }}
            allowClear
          />
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <Row gutter={[16, 16]}>
                {paginatedProducts.map((product) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
              <Pagination
                current={currentPage}
                total={filteredProducts.length}
                pageSize={pageSize}
                onChange={(page) => setCurrentPage(page)}
                style={{ marginTop: 30, textAlign: "center" }}
              />
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;

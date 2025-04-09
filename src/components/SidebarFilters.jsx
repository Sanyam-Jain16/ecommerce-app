import React from "react";
import { Divider, Radio, Slider, Rate, Button } from "antd";
import "./SidebarFilters.css";

const SidebarFilters = ({
  filters,
  setFilters,
  categories,
  clearFilters,
  isCategoriesLoading,
}) => {
  return (
    <div style={{ padding: 20 }}>
      <h3>Categories</h3>
      {isCategoriesLoading ? (
        <h6>Loading...</h6>
      ) : (
        <Radio.Group
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, category: e.target.value }))
          }
          value={filters.category}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {categories.map((cat) => (
            <Radio key={cat} value={cat}>
              {cat}
            </Radio>
          ))}
        </Radio.Group>
      )}

      <Divider />

      <h3>Price Range</h3>
      <Slider
        range
        max={1000}
        step={10}
        value={filters.priceRange}
        onChange={(value) =>
          setFilters((prev) => ({ ...prev, priceRange: value }))
        }
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>${filters.priceRange[0]}</span>
        <span>${filters.priceRange[1]}</span>
      </div>

      <Divider />

      <h3>Rating</h3>
      <Rate
        allowClear
        value={filters.rating}
        onChange={(value) => setFilters((prev) => ({ ...prev, rating: value }))}
      />

      <Divider />

      <Button onClick={clearFilters} block danger>
        Clear Filters
      </Button>
    </div>
  );
};

export default SidebarFilters;

import React from "react";
import { Segmented } from "antd";

const Categories: React.FC = () => (
  <Segmented
    options={[
      { label: "All", value: "1" },
      { label: "Meat", value: "2" },
      { label: "Vegetarian", value: "3" },
      { label: "Grilled", value: "4" },
      { label: "Spicy", value: "5" },
      { label: "Finished", value: "6" },
    ]}
    style={{
        borderRadius: "30px"
    }}
  />
);

export default Categories;

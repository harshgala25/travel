import React, { useState, useEffect } from "react";

function Packages() {

  const [packages, setPackages] = useState([]);
  const [selected, setSelected] = useState([]);
  const [current, setCurrent] = useState("");
  const [search, setSearch] = useState("");

  // Load packages from public folder
  useEffect(() => {

    fetch("/packages.json")
      .then((res) => res.json())
      .then((data) => {
        setPackages(data.packages);
      })
      .catch((err) => console.log(err));

  }, []);

  const handleSelect = (pkg) => {
    setCurrent(pkg);
  };

  useEffect(() => {
    if (current) {
      setSelected((prev) => [...prev, current]);
    }
  }, [current]);

  const filteredPackages = packages.filter((pkg) =>
    pkg.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center" }}>✈️ Travel Packages</h2>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search Package..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "8px",
            border: "1px solid gray"
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center"
        }}
      >
        {filteredPackages.map((pkg, index) => (
          <div
            key={index}
            onClick={() => handleSelect(pkg)}
            style={{
              width: "220px",
              padding: "15px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              cursor: "pointer",
              background: "#f8fafc",
              transition: "0.3s"
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <h4>{pkg}</h4>
            <p>Click to select</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3>✅ Selected Packages</h3>

        {selected.length === 0 ? (
          <p>No packages selected</p>
        ) : (
          <ul>
            {selected.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Packages;

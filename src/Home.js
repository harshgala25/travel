import React, { useState, useEffect } from "react";

const images = [
  "https://picsum.photos/id/1018/900/400",
  "https://picsum.photos/id/1015/900/400",
  "https://picsum.photos/id/1019/900/400"
];

function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>🌍 Discover Your Next Adventure</h1>
      <p>Explore the world with best travel packages curated for you.</p>

      <img
        src={images[index]}
        alt="travel"
        style={{
          width: "90%",
          maxWidth: "900px",
          height: "400px",
          borderRadius: "15px",
          marginTop: "20px",
          transition: "0.6s",
          boxShadow: "0 6px 20px rgba(0,0,0,0.3)"
        }}
      />
    </div>
  );
}

export default Home;

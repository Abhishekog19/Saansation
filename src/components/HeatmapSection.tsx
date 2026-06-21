import React, { useState, useEffect } from "react";
import aqI from "../assets/AQI.png"
import aqI1 from "../assets/no2.png"
import aqI2 from "../assets/o3.png"
import aqI3 from "../assets/PM2.5.png"
import aqI4 from "../assets/PM10.png"

type HeatmapImage = {
  name: string;
  src: string;
  gradient: string;
  scaleLabels: string[];
};

const heatmapData: HeatmapImage[] = [
  {
    name: "AQI",
    src: aqI,
    gradient: "linear-gradient(to top, RGB(255, 230, 179),RGB(255, 204, 128),RGB(255, 178, 77),RGB(255, 153, 26),RGB(255, 128, 0),RGB(230, 102, 0) )",
    scaleLabels: ["500+", "300", "200", "100", "50", "0"],
  },
  {
    name: "PM2.5",
    src: aqI3,
    gradient: "linear-gradient(to top, RGB(204, 229, 255),  RGB(153, 204, 255), RGB(102, 178, 255), RGB(51, 153, 255),RGB(0, 128, 255),RGB(0, 102, 204),RGB(0, 76, 153))",
    scaleLabels: [">250 μg/m3", "150 μg/m3", "100 μg/m3", "50 μg/m3", "25 μg/m3", "0 μg/m3"],
  },
  {
    name: "PM10",
    src: aqI4,
    gradient: "linear-gradient(to top, RGB(230, 204, 255), RGB(204, 153, 255), RGB(178, 102, 255), RGB(153, 51, 255), RGB(128, 0, 255), RGB(102, 0, 204), RGB(76, 0, 153))",
    scaleLabels: ["430 μg/m³", "250 μg/m³", "150 μg/m³", "100 μg/m³", "50 μg/m³", "0 μg/m³"],
  },
  {
    name: "NO2",
    src: aqI1,
    gradient: "linear-gradient(to top, RGB(255, 204, 204), RGB(255, 153, 153), RGB(255, 102, 102), RGB(255, 51, 51), RGB(255, 0, 0), RGB(204, 0, 0), RGB(153, 0, 0))",
    scaleLabels: ["400 μg/m³", "300 μg/m³", "200 μg/m³", "100 μg/m³", "50 μg/m³", "0 μg/m³"],
  },
  {
    name: "O3",
    src: aqI2,
    gradient: "linear-gradient(to top, RGB(204, 255, 204), RGB(153, 255, 153), RGB(102, 255, 102), RGB(51, 204, 51), RGB(0, 153, 0), RGB(0, 128, 0), RGB(0, 76, 0))",
    scaleLabels: ["300 μg/m³", "200 μg/m³", "150 μg/m³", "100 μg/m³", "50 μg/m³", "0 μg/m³"],
  },
];

const containerStyle: React.CSSProperties = {
  maxWidth: "880px",
  width: "90%",
  background: "#fff",
  borderRadius: 10,
  padding: 20,
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  margin: "18px auto",
  fontFamily:
    "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue'",
};

const topRowStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  marginBottom: 8,
};

const selectStyle: React.CSSProperties = {
  padding: "6px 8px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  fontSize: 14,
};

const imageWrapperStyle: React.CSSProperties = {
  flex: "0 0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const imgStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 500,
  height: "auto",
  objectFit: "contain",
  borderRadius: 6,
  boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
  background: "#fafafa",
  border: "1px solid #eee",
};

const legendWrapperStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: "0 0 70px",
  marginTop: 12,
};

const gradientBoxStyle = (gradient: string): React.CSSProperties => ({
  width: 64,
  marginRight: 18,
  height: 200,
  borderRadius: 6,
  background: gradient,
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
});

const scaleLabelsStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: 200,
  fontSize: 18,
  lineHeight: "28px",
  color: "#555",
};

const HeatmapSectionInline: React.FC = () => {
  const [selected, setSelected] = useState<string>("AQI");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const current = heatmapData.find((h) => h.name === selected)!;

  // Detect screen width to toggle mobile layout
  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: 12,
        background: "#f3f4f6",
      }}
    >
      <div
        style={{
          width: window.innerWidth < 768 ? "92%" : "60%",
          maxWidth: 880,
          minWidth: 320,
          background: "#fff",
          borderRadius: 10,
          padding: window.innerWidth < 768 ? 14 : 20,
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          margin: "18px auto",
          fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue'",
        }}
      >
        {/* Section Heading */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <h1
            style={{
              fontSize: window.innerWidth < 768 ? 22 : 28,
              fontWeight: "bold",
              backgroundImage: "linear-gradient(to right, #2563eb, #16a34a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              margin: 0,
            }}
          >
            Air Quality Heatmaps
          </h1>
          <div
            style={{
              width: 100,
              height: 4,
              margin: "8px auto 0",
              borderRadius: 4,
              background: "linear-gradient(to right, #3b82f6, #22c55e)",
            }}
          />
        </div>

        {/* Dropdown */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            style={{
              padding: "6px 8px",
              borderRadius: 6,
              border: "1px solid #d1d5db",
              fontSize: 14,
            }}
          >
            {heatmapData.map((h) => (
              <option key={h.name} value={h.name}>
                {h.name}
              </option>
            ))}
          </select>
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: window.innerWidth < 768 ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              flex: "0 0 auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={current.src}
              alt={`${current.name} heatmap`}
              style={{  
                width: window.innerWidth < 768 ? "100%" : 480,
                height: "auto",
                borderRadius: 8,
                objectFit: "contain",
                boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
              }}
            />
          </div>

          {/* Scale */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: window.innerWidth < 768 ? 16 : 0,
              width: window.innerWidth < 768 ? "100%" : "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 8,
                fontWeight: 600,
                fontSize: window.innerWidth < 768 ? 14 : 16,
                color: "#374151",
                gap: 6,
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 3,
                  backgroundImage: current.gradient,
                }}
              />
              Heatmap Scale for {current.name}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: window.innerWidth < 768 ? 80 : 50,
                  height: 200,
                  borderRadius: 6,
                  background: current.gradient,
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: 200,
                  marginLeft: 12,
                  fontSize: window.innerWidth < 768 ? 12 : 14,
                  color: "#555",
                }}
              >
                {current.scaleLabels.map((lbl, i) => (
                  <div key={i}>{lbl}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default HeatmapSectionInline;
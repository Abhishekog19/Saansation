# साँसATION — AI-Driven Pollution Dashboard for Delhi-NCR

> Real-time air quality intelligence for citizens and policymakers. Know the source. Predict the spike. Act before it's too late.

**🏆 Smart India Hackathon 2025 | PS ID: SIH25216 | Theme: Clean & Green Technology**
**Team: Ctrl_Alt_Defeat01 (Team ID: 71656)**

**🌐 Live Demo: [ctrl-alt-defeat-jk2x.vercel.app](https://ctrl-alt-defeat-jk2x.vercel.app)**

---

## The Problem

Delhi-NCR is one of the most polluted airsheds in the world — and the data to fix it already exists. The problem is that it's scattered, delayed, and inaccessible to the people who need it most.

CPCB and DPCC monitoring stations go offline, creating data gaps. Satellite feeds and IoT sensors operate in isolation. Government agencies make policy decisions without real-time source attribution — reacting to crises instead of preventing them. Citizens have no reliable, localised way to understand their exposure or participate in solutions.

The result: pollution spikes that could have been predicted and mitigated go unaddressed until they become emergencies.

**साँसATION was built to fix this.**

---

## What It Is

साँसATION is a two-sided AI-powered pollution intelligence platform built for Delhi-NCR:

- **Policy Dashboard** — for city authorities and policymakers: live AQI, AI-identified pollution sources, hotspot maps, forecasts, and a What-If policy simulator
- **Citizen App** — for residents: localised AQI, personalised health alerts, eco-recommendations, and gamified engagement that rewards eco-friendly behaviour

Both sides feed into each other — citizen reports improve the AI model, and policy actions show up in citizen-facing alerts.

---

## Core Capabilities

### 📡 Multi-Source Data Ingestion

साँसATION pulls from five data streams simultaneously:

| Source | Data |
|---|---|
| CPCB / DPCC stations | Official AQI readings, pollutant levels (PM2.5, PM10, NO₂, SO₂, CO, O₃) |
| IMD | Meteorological data — wind, humidity, temperature |
| Satellite (MODIS / Sentinel) | Aerosol optical depth, fire hotspots for stubble burning detection |
| Traffic APIs | Vehicular density and congestion signals |
| IoT sensors | Low-cost sensor coverage in undermonitored NCR zones |

When CPCB/DPCC stations go offline (a known problem), the system falls back to OpenAQ API and applies data imputation, displaying a **data confidence score** on the dashboard so policymakers know exactly how reliable each reading is.

### 🧠 AI-Powered Source Attribution

The core AI capability: identifying *where* the pollution is coming from, not just measuring how bad it is.

The system classifies pollution sources into categories — vehicular emissions, industrial discharge, construction dust, stubble burning, and weather-driven events — using deep learning models trained on historical CPCB data, satellite AOD readings, and emission inventories (EDGAR, CAMS).

**Source attribution pipeline:**
```
Raw sensor + satellite data
  → Clean & filter (handle missing stations)
  → Aggregate by time & location
  → Standardize for AI pipeline (CSV/JSON)
  → Source attribution model (AI-based)
  → Predict AQI + pollutant levels (ML models)
  → Confidence-scored output to dashboard
```

Model architecture: **Hybrid LSTM + Random Forest** with continuous retraining on live data — handles sudden spikes (Diwali, dust storms) better than static models.

### 🔮 Predictive Forecasting

**LSTM / ARIMA time-series models** forecast AQI and pollutant levels days in advance, giving authorities time to act before conditions deteriorate.

Predictions surface as:
- Hour-by-hour AQI forecasts for each NCR zone
- Emerging hotspot identification
- Early alerts when a spike is projected to exceed thresholds

### ⚙️ Policy Simulator — What-If Engine

The standout feature of the platform. Authorities can simulate emission reduction scenarios and see the projected impact on AQI in real time — without waiting for real-world outcomes.

Examples:
- "What if we implement odd-even vehicle restrictions in Gurugram this week?"
- "What would a 30% reduction in industrial emissions in Faridabad do to PM2.5 levels?"
- "How much would AQI improve if stubble burning alerts are issued 48 hours in advance?"

The simulator runs the proposed change through the predictive model and returns projected AQI deltas per zone, giving policymakers defensible, data-backed justification for interventions.

### 🗺️ Visualization Layer

The Policy Dashboard renders:
- **Live AQI heatmap** across Delhi-NCR zones
- **Pollution source breakdown** per area (what percentage is vehicles vs. industry vs. burning)
- **Trend charts** — 24hr, 7-day, monthly pollutant timelines
- **Hotspot alerts** — zones that are predicted to spike within 24 hours
- **Data confidence indicators** — so authorities know when to supplement with satellite data

Built with **Recharts** for live, interactive chart rendering directly in the browser.

### 🌱 Citizen App — Engagement + Accountability

The citizen-facing side isn't just informational — it's designed to drive behaviour change:

- **Localised AQI** — zone-specific readings, not just a Delhi-wide average
- **Health alerts** — personalised notifications based on location and pollution levels
- **Eco-recommendations** — context-aware tips ("Air quality is hazardous near your route — consider WFH today")
- **Community reporting** — citizens can flag visible pollution sources (construction sites, burning, industrial smoke), feeding ground-truth signals back into the AI model
- **Clean Credits** — gamified rewards system: citizens earn credits for eco-friendly actions (using public transport, reporting violations, completing eco-challenges), redeemable for discounts or recognition

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        DATA ACQUISITION                         │
│  CPCB/DPCC stations → Satellite (MODIS/Sentinel) → IMD/Traffic │
│  IoT sensors → OpenAQ fallback → Unified cloud database        │
└─────────────────────────────┬───────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                        DATA PROCESSING                          │
│  Clean & impute → Aggregate by time/location                   │
│  → Standardize (CSV/JSON) → AI pipeline input                  │
└─────────────────────────────┬───────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                         AI / ML LAYER                           │
│  Source attribution (deep learning)                            │
│  AQI forecasting (LSTM / ARIMA / hybrid LSTM+RF)               │
│  Model evaluation & retraining (MLflow)                        │
│  Django REST API → frontend & citizen app                      │
└──────────────┬──────────────────────────────┬───────────────────┘
               ↓                              ↓
┌──────────────────────────┐    ┌─────────────────────────────────┐
│     POLICY DASHBOARD     │    │          CITIZEN APP            │
│  Live AQI heatmap        │    │  Localised AQI + health alerts  │
│  Source breakdown        │    │  Eco-recommendations            │
│  Hotspot alerts          │    │  Community pollution reports    │
│  Forecasts               │    │  Clean Credits gamification     │
│  What-If simulator       │    │  Interactive eco-challenges     │
└──────────────────────────┘    └─────────────────────────────────┘
               ↓                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      IMPACT & FEEDBACK LOOP                     │
│  Measure AQ improvements → Log citizen feedback                │
│  → Retrain AI models → Better predictions                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### UI Layer
| Technology | Purpose |
|---|---|
| React + TypeScript | Frontend framework |
| Tailwind CSS | Styling |
| Recharts / Chart.js | AQI charts, trend graphs, heatmaps |

### Backend Layer
| Technology | Purpose |
|---|---|
| Django | Primary backend + admin |
| Node.js | Real-time event handling |
| Python | Data processing & AI pipeline |
| FastAPI | High-performance ML model serving |

### Data Storage & Processing
| Technology | Purpose |
|---|---|
| PostgreSQL | Primary database |
| PostGIS | Geospatial queries (zone-level AQI, hotspot mapping) |
| Celery | Background task queue (data ingestion, model retraining) |

### AI / ML Layer
| Technology | Purpose |
|---|---|
| PyTorch | Deep learning models (source attribution) |
| NumPy / Pandas | Data processing pipeline |
| MLflow | Model versioning, evaluation, and retraining |
| Django REST Framework | Model-serving API |

### Miscellaneous
| Technology | Purpose |
|---|---|
| Firebase | Real-time citizen alerts + push notifications |
| Grafana | Internal monitoring dashboards |
| Tableau | Policy-level data visualization |

### Deployment
- **Frontend**: Vercel
- **Backend**: Cloud-hosted (Django + Node)
- **Database**: PostgreSQL + PostGIS

---

## Data Sources

| Source | URL | Purpose |
|---|---|---|
| CPCB Real-Time AQI | [cpcb.nic.in](https://cpcb.nic.in/real-time-air-qulity-data/) | Official AQI + pollutant data |
| NAQI — CPCB | [cpcb.nic.in/National-Air-Quality-Index](https://cpcb.nic.in/National-Air-Quality-Index/) | AQI parameters and methodology |
| CCR Portal — CPCB | [airquality.cpcb.gov.in/ccr](https://airquality.cpcb.gov.in/ccr/) | Delhi-NCR real-time monitoring |
| Open Government Data | [data.gov.in](https://data.gov.in/resource/real-time-air-quality-index-various-locations) | Open AQI + meteorological datasets |
| OpenAQ | [openaq.org](https://openaq.org) | Fallback when CPCB stations go offline |
| MODIS / Sentinel | ESA / NASA | Satellite AOD, fire hotspot detection |
| EDGAR / CAMS | EU Copernicus | Emission inventories for missing industrial data |

---

## Research Foundation

The AI models are grounded in peer-reviewed research:

- **AirTrace-SA** — deep learning architecture for air pollution source attribution (MDPI, 2025)
- **AI-Based Air Pollution Forecasting** — comprehensive review of LSTM, ARIMA, and hybrid models for AQI prediction (Springer Journal of Big Data, 2024)

---

## Impact

| Dimension | Impact |
|---|---|
| **Public Health** | Citizens can avoid high-pollution zones with real-time, localised alerts |
| **Policy** | Policymakers get source-attributed, AI-backed insights for targeted interventions |
| **Industrial Accountability** | AI source tracking identifies major polluters for regulatory action |
| **Proactive Planning** | Predictive forecasts allow mitigation before spikes become crises |
| **Environmental Awareness** | Gamified engagement builds sustainable habits at the citizen level |
| **Scalability** | Architecture designed to extend to other polluted cities and national AQI networks |

---

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- PostgreSQL with PostGIS extension

### Frontend

```bash
git clone https://github.com/Abhishekog19/Saansation.git
cd Saansation
npm install
npm run dev
```

### Backend (separate repository)
```bash
git clone https://github.com/Abhishekog19/Ctrl-alt-Defeat.git
cd Ctrl-alt-Defeat
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

---

## Related Repositories

| Repo | Purpose |
|---|---|
| [Abhishekog19/Saansation](https://github.com/Abhishekog19/Saansation) | Frontend dashboard (this repo) |
| [Abhishekog19/Ctrl-alt-Defeat](https://github.com/Abhishekog19/Ctrl-alt-Defeat) | Full system — backend, AI pipeline, datasets, documentation |

---

## Team — Ctrl_Alt_Defeat01

**Smart India Hackathon 2025 | Team ID: 71656**
**Problem Statement: SIH25216 | Theme: Clean & Green Technology**

Built by [@Abhishekog19](https://github.com/Abhishekog19) and team.

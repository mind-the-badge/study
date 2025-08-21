## Data Sources Disclosed

This graphic is built from the **“National contributions to climate change”** dataset (Jones et al., 2024) hosted on Zenodo (DOI 10.5281/zenodo.14054503). Our World in Data (OWID) ingests the release and republishes a tidy version in its **CO₂ & Greenhouse-Gas** repository. :contentReference[oaicite:0]{index=0}

### Underlying inventories
* **Fossil CO₂** – Global Carbon Budget 2024 (Andrew & Peters; Friedlingstein et al.).
* **Land-use CO₂** – Houghton & colleagues / LUH2.
* **CH₄ and N₂O** – PRIMAP-hist v2.5 (Gütschow et al.). :contentReference[oaicite:1]{index=1}

### Processing chain
1. Convert annual emissions to cumulative **CO₂-equivalents** with IPCC AR6 GWP★ factors.
2. Translate cumulative CO₂-eq into °C via the best-estimate **TCRE**.
3. Publish the resulting country × gas × source tables—and the full ETL code—in the OWID GitHub repo: <https://github.com/owid/co2-data>. :contentReference[oaicite:2]{index=2}

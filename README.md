# Industrial Production Dashboard

A complete web application for monitoring four simulated presses with real-time KPI tracking and TRS (OEE) calculations.

## Features

- **Real-time Monitoring**: Auto-refresh every 5 seconds to simulate OPC updates
- **KPI Calculations**: Disponibilité, Performance, Qualité, and TRS (OEE)
- **Time Filtering**: Filter data by day, week, or custom date range
- **Data Export**: Export production reports to CSV
- **Interactive Dashboard**: 
  - Global view with aggregated KPIs
  - Individual press monitoring
  - Production charts and comparisons
  - Machine status indicators

## Setup Instructions

### 1. Database Setup

Run the SQL scripts to create tables and seed sample data:

\`\`\`bash
# Create tables
mysql -u root -p < scripts/create-tables.sql

# Seed sample data
mysql -u root -p < scripts/seed-sample-data.sql
\`\`\`

### 2. Environment Configuration

Copy `.env.example` to `.env` and configure your MySQL connection:

\`\`\`env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=industrial_production
\`\`\`

### 3. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 4. Run the Application

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Structure

Each press has 4 tables:
- `pressX_pb`: Pieces Bonnes (good parts)
- `pressX_pm`: Pieces Mauvaises (bad parts)
- `pressX_mem`: Machine En Marche (running status)
- `pressX_cm`: Consommation Matière (material consumption)

## API Endpoints

- `GET /api/press/[id]/kpi?start=&end=` - Get KPIs for a specific press
- `GET /api/press/global/kpi?start=&end=` - Get global KPIs for all presses
- `GET /api/press/[id]/data?table=&start=&end=` - Get raw data for a specific table

## KPI Formulas

### Disponibilité (Availability)
\`\`\`
Disponibilité = Temps Exécution / Temps Production Planifié
\`\`\`

### Performance
\`\`\`
Performance = (Temps Cycle Idéal × Nb Pièces Totales) / Temps Exécution (sec)
\`\`\`

### Qualité (Quality)
\`\`\`
Qualité = Nb Pièces Bonnes / Nb Pièces Totales
\`\`\`

### TRS (OEE)
\`\`\`
TRS = Disponibilité × Performance × Qualité
\`\`\`

## Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: shadcn/ui, Tailwind CSS
- **Charts**: Recharts
- **Database**: MySQL with mysql2 driver
- **Icons**: Lucide React

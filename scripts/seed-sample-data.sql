-- Seed sample data for testing
USE industrial_production;

-- Sample data for Press 1 (last 8 hours of operation)
-- Good pieces produced
INSERT INTO press1_pb (DateTime, Value, Quality) VALUES
  (DATE_SUB(NOW(), INTERVAL 8 HOUR), 0, 1),
  (DATE_SUB(NOW(), INTERVAL 7 HOUR), 250, 1),
  (DATE_SUB(NOW(), INTERVAL 6 HOUR), 500, 1),
  (DATE_SUB(NOW(), INTERVAL 5 HOUR), 750, 1),
  (DATE_SUB(NOW(), INTERVAL 4 HOUR), 1000, 1),
  (DATE_SUB(NOW(), INTERVAL 3 HOUR), 1250, 1),
  (DATE_SUB(NOW(), INTERVAL 2 HOUR), 1500, 1),
  (DATE_SUB(NOW(), INTERVAL 1 HOUR), 1750, 1),
  (NOW(), 1850, 1);

-- Bad pieces
INSERT INTO press1_pm (DateTime, Value, Quality) VALUES
  (DATE_SUB(NOW(), INTERVAL 8 HOUR), 0, 1),
  (DATE_SUB(NOW(), INTERVAL 7 HOUR), 10, 1),
  (DATE_SUB(NOW(), INTERVAL 6 HOUR), 25, 1),
  (DATE_SUB(NOW(), INTERVAL 5 HOUR), 35, 1),
  (DATE_SUB(NOW(), INTERVAL 4 HOUR), 50, 1),
  (DATE_SUB(NOW(), INTERVAL 3 HOUR), 65, 1),
  (DATE_SUB(NOW(), INTERVAL 2 HOUR), 80, 1),
  (DATE_SUB(NOW(), INTERVAL 1 HOUR), 95, 1),
  (NOW(), 100, 1);

-- Machine status (1=running, 0=stopped)
INSERT INTO press1_mem (DateTime, Value, Quality) VALUES
  (DATE_SUB(NOW(), INTERVAL 8 HOUR), 1, 1),
  (DATE_SUB(NOW(), INTERVAL 7 HOUR), 1, 1),
  (DATE_SUB(NOW(), INTERVAL 6 HOUR), 0, 1),
  (DATE_SUB(NOW(), INTERVAL 5 HOUR), 1, 1),
  (DATE_SUB(NOW(), INTERVAL 4 HOUR), 1, 1),
  (DATE_SUB(NOW(), INTERVAL 3 HOUR), 1, 1),
  (DATE_SUB(NOW(), INTERVAL 2 HOUR), 0, 1),
  (DATE_SUB(NOW(), INTERVAL 1 HOUR), 1, 1),
  (NOW(), 1, 1);

-- Material consumption
INSERT INTO press1_cm (DateTime, Value, Quality) VALUES
  (DATE_SUB(NOW(), INTERVAL 8 HOUR), 0, 1),
  (DATE_SUB(NOW(), INTERVAL 7 HOUR), 50, 1),
  (DATE_SUB(NOW(), INTERVAL 6 HOUR), 100, 1),
  (DATE_SUB(NOW(), INTERVAL 5 HOUR), 150, 1),
  (DATE_SUB(NOW(), INTERVAL 4 HOUR), 200, 1),
  (DATE_SUB(NOW(), INTERVAL 3 HOUR), 250, 1),
  (DATE_SUB(NOW(), INTERVAL 2 HOUR), 300, 1),
  (DATE_SUB(NOW(), INTERVAL 1 HOUR), 350, 1),
  (NOW(), 390, 1);

-- Similar data for Press 2
INSERT INTO press2_pb (DateTime, Value, Quality) VALUES
  (DATE_SUB(NOW(), INTERVAL 8 HOUR), 0, 1),
  (DATE_SUB(NOW(), INTERVAL 4 HOUR), 900, 1),
  (NOW(), 1920, 1);

INSERT INTO press2_pm (DateTime, Value, Quality) VALUES
  (DATE_SUB(NOW(), INTERVAL 8 HOUR), 0, 1),
  (NOW(), 80, 1);

INSERT INTO press2_mem (DateTime, Value, Quality) VALUES
  (DATE_SUB(NOW(), INTERVAL 8 HOUR), 1, 1),
  (DATE_SUB(NOW(), INTERVAL 6 HOUR), 0, 1),
  (DATE_SUB(NOW(), INTERVAL 5 HOUR), 1, 1),
  (NOW(), 1, 1);

INSERT INTO press2_cm (DateTime, Value, Quality) VALUES
  (DATE_SUB(NOW(), INTERVAL 8 HOUR), 0, 1),
  (NOW(), 400, 1);

-- Similar data for Press 3
INSERT INTO press3_pb (DateTime, Value, Quality) VALUES
  (DATE_SUB(NOW(), INTERVAL 8 HOUR), 0, 1),
  (NOW(), 1800, 1);

INSERT INTO press3_pm (DateTime, Value, Quality) VALUES
  (DATE_SUB(NOW(), INTERVAL 8 HOUR), 0, 1),
  (NOW(), 120, 1);

INSERT INTO press3_mem (DateTime, Value, Quality) VALUES
  (DATE_SUB(NOW(), INTERVAL 8 HOUR), 1, 1),
  (NOW(), 1, 1);

INSERT INTO press3_cm (DateTime, Value, Quality) VALUES
  (DATE_SUB(NOW(), INTERVAL 8 HOUR), 0, 1),
  (NOW(), 380, 1);

-- Similar data for Press 4
INSERT INTO press4_pb (DateTime, Value, Quality) VALUES
  (DATE_SUB(NOW(), INTERVAL 8 HOUR), 0, 1),
  (NOW(), 1750, 1);

INSERT INTO press4_pm (DateTime, Value, Quality) VALUES
  (DATE_SUB(NOW(), INTERVAL 8 HOUR), 0, 1),
  (NOW(), 150, 1);

INSERT INTO press4_mem (DateTime, Value, Quality) VALUES
  (DATE_SUB(NOW(), INTERVAL 8 HOUR), 1, 1),
  (DATE_SUB(NOW(), INTERVAL 3 HOUR), 0, 1),
  (DATE_SUB(NOW(), INTERVAL 2 HOUR), 1, 1),
  (NOW(), 1, 1);

INSERT INTO press4_cm (DateTime, Value, Quality) VALUES
  (DATE_SUB(NOW(), INTERVAL 8 HOUR), 0, 1),
  (NOW(), 370, 1);

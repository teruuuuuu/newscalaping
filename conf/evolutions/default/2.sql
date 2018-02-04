CREATE TABLE "link_text" (
  "id" SERIAL PRIMARY KEY,
  "link_id" int NOT NULL,
  "text" text NOT NULL,
  "result" int NOT NULL,
  "result_status" text NOT NULL,
  "add_date" timestamp
);


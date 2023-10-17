DROP TABLE IF EXISTS flags;

CREATE TABLE
  flags (
    id serial PRIMARY KEY,
    title varchar(100) NOT NULL UNIQUE,
    description text,
    is_active boolean DEFAULT false NOT NULL,
    created_at timestamp
    with
      time zone NOT NULL DEFAULT current_timestamp
  );

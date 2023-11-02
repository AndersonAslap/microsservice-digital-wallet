-- BANCO WALLET_DB

CREATE TABLE clients (
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE accounts (
    id VARCHAR PRIMARY KEY,
    client_id VARCHAR NOT NULL,
    balancer int,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients (id)
);

CREATE TABLE transactions (
    id VARCHAR PRIMARY KEY,
    accountFrom_id VARCHAR NOT NULL,
    accountTo_id VARCHAR NOT NULL,
    amount int,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (accountFrom_id) REFERENCES accounts (id),
    FOREIGN KEY (accountTo_id) REFERENCES accounts (id)
);


--
# E-Commerce-App-with-Dockerized-Multi-Tier-Architecture

Here’s a detailed advanced Docker project along with example code snippets:

---

### **Project Name**: "E-Commerce App with Dockerized Multi-Tier Architecture"

---

### **Overview**  
This project includes a Dockerized multi-tier application comprising:  
- **Frontend**: React.js (served with Nginx)  
- **Backend**: Node.js with Express.js  
- **Database**: PostgreSQL  

---

### **Technologies Used**  
- **Frontend**: React.js  
- **Backend**: Node.js with Express.js  
- **Database**: PostgreSQL  
- **Tools**: Docker, Docker Compose, Nginx, Prometheus, Grafana  

---

### **Folder Structure**  
```plaintext
ecommerce-app/
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── src/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── config.js
├── db/
│   └── init.sql
├── docker-compose.yml
└── README.md
```

---

### **Frontend: React.js + Nginx**  

#### `frontend/Dockerfile`  
```dockerfile
# Multi-stage build
FROM node:18 AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build

# Serve with Nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### `frontend/nginx.conf`  
```nginx
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri /index.html;
    }
}
```

---

### **Backend: Node.js with Express**  

#### `backend/Dockerfile`  
```dockerfile
FROM node:18
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
EXPOSE 5000
CMD ["node", "server.js"]
```

#### `backend/package.json`  
```json
{
  "name": "ecommerce-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.10.0"
  }
}
```

#### `backend/server.js`  
```javascript
const express = require('express');
const { Pool } = require('pg');
const app = express();
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'ecommerce',
  password: 'password',
  port: 5432,
});

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.get('/products', async (req, res) => {
  const result = await pool.query('SELECT * FROM products');
  res.json(result.rows);
});

app.listen(5000, () => console.log('Backend running on port 5000'));
```

---

### **Database: PostgreSQL**  

#### `db/init.sql`  
```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL
);

INSERT INTO products (name, price) VALUES
('Product 1', 10.99),
('Product 2', 20.99),
('Product 3', 30.99);
```

---

### **Docker Compose File**  

#### `docker-compose.yml`  
```yaml
version: "3.9"
services:
  frontend:
    build:
      context: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: ecommerce
    volumes:
      - db_data:/var/lib/postgresql/data
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql

volumes:
  db_data:
```

---

### **Running the Project**  

1. **Clone the Repository**:  
   ```bash
   git clone https://github.com/your-repo/ecommerce-app.git
   cd ecommerce-app
   ```

2. **Build and Run Containers**:  
   ```bash
   docker-compose up --build
   ```

3. **Access the Application**:  
   - **Frontend**: [http://localhost:3000](http://localhost:3000)  
   - **Backend**: [http://localhost:5000](http://localhost:5000)  

4. **Database**:  
   - Connect to PostgreSQL using a client like DBeaver or pgAdmin:  
     - Host: `localhost`  
     - Port: `5432`  
     - User: `postgres`  
     - Password: `password`  

---

### **Monitoring (Prometheus & Grafana)**  
1. Add Prometheus and Grafana services to `docker-compose.yml`.  
2. Use a pre-configured Prometheus config file and Grafana dashboards.  

Would you like me to assist with adding **Prometheus and Grafana** for monitoring or further features like **Kubernetes deployment**?

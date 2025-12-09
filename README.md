# Proyecto final - Redes

API HTTP + aplicación TCP en Node.js para el proyecto final de Redes.

## API HTTP (chuycitos)

- `GET /`  
  - Descripción: Obtiene la lista de todos los chuycitos.  
  - Códigos: 200.

- `GET /:id`  
  - Descripción: Obtiene un chuy por su ID.  
  - Códigos: 200, 404.

- `POST /`  
  - Descripción: Crea un nuevo chuy.  
  - Cuerpo (JSON): `{ "name": "Nombre del chuy", "city": "Ciudad" }`  
  - Códigos: 201, 400.

- `PUT /:id`  
  - Descripción: Actualiza un chuy existente.  
  - Cuerpo (JSON): `{ "name": "Nuevo nombre", "city": "Nueva ciudad" }`  
  - Códigos: 200, 400, 404.

- `DELETE /:id`  
  - Descripción: Elimina un chuy por ID.  
  - Códigos: 200, 404.

### Ejecutar API


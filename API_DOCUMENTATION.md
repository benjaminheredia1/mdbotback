# Documentación API - Sistema de Gestión Hospitalaria

Base URL: `http://localhost:3000`

## 📋 Índice

- [Autenticación](#autenticación)
- [Usuarios](#usuarios)
- [Quejas](#quejas)
- [Felicitaciones](#felicitaciones)
- [Solicitudes](#solicitudes)

---

## 🔐 Autenticación

### Registro de Usuario
```http
POST /usuario/create
```

**Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Respuesta:**
```json
{
  "message": "User created successfully"
}
```

**Validaciones:**
- `email`: debe ser un email válido
- `password`: mínimo 8 caracteres

---

### Login
```http
POST /usuario/login
```

**Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Respuesta:**
```json
{
  "message": "Login exitoso"
}
```

**Validaciones:**
- `email`: debe ser un email válido
- `password`: mínimo 8 caracteres

---

## 👥 Usuarios

### Listar Todos los Usuarios
```http
GET /usuario/findAll
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "email": "usuario1@ejemplo.com",
    "createdAt": "2025-12-10T00:00:00.000Z"
  },
  {
    "id": 2,
    "email": "usuario2@ejemplo.com",
    "createdAt": "2025-12-10T00:00:00.000Z"
  }
]
```

---

## 😠 Quejas

### Listar Todas las Quejas
```http
GET /quejas
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "descripcion": "La consulta fue muy demorada",
    "estado": "PENDIENTE",
    "area_medica": "General",
    "respuesta": null,
    "id_persona": 1,
    "createdAt": "2025-12-10T00:00:00.000Z",
    "persona": {
      "id": 1,
      "nombre": "Juan Perez",
      "hcCode": "HC123456"
    }
  }
]
```

### Obtener una Queja por ID
```http
GET /quejas/:id
```

**Ejemplo:** `GET /quejas/1`

**Respuesta:** Misma estructura que el array anterior, pero un solo objeto.

### Crear Nueva Queja
```http
POST /quejas
```

**Body:**
```json
{
  "descripcion": "Descripción de la queja (mínimo 10 caracteres)",
  "id_persona": 1,
  "area_medica": "Urgencias"
}
```

**Respuesta:**
```json
{
  "id": 3,
  "descripcion": "Descripción de la queja",
  "estado": "PENDIENTE",
  "area_medica": "Urgencias",
  "respuesta": null,
  "id_persona": 1,
  "createdAt": "2025-12-10T12:00:00.000Z"
}
```

### Actualizar Queja
```http
PUT /quejas/:id
```

**Body (todos los campos son opcionales):**
```json
{
  "descripcion": "Nueva descripción",
  "area_medica": "Pediatría",
  "estado": "EN_PROCESO"
}
```

**Estados válidos:** `PENDIENTE`, `EN_PROCESO`, `RESUELTO`

### Revisar y Resolver Queja
```http
PATCH /quejas/:id/revisar
```

**Body:**
```json
{
  "respuesta": "Se revisó el caso y se resolvió contactando al médico responsable. Se tomaron medidas correctivas."
}
```

**Nota:** Este endpoint automáticamente cambia el estado a `RESUELTO`.

**Respuesta:**
```json
{
  "id": 1,
  "descripcion": "La consulta fue muy demorada",
  "estado": "RESUELTO",
  "area_medica": "General",
  "respuesta": "Se revisó el caso y se resolvió contactando al médico responsable.",
  "id_persona": 1,
  "createdAt": "2025-12-10T00:00:00.000Z"
}
```

### Eliminar Queja
```http
DELETE /quejas/:id
```

**Respuesta:**
```json
{
  "message": "Queja deleted successfully"
}
```

---

## 😊 Felicitaciones

### Listar Todas las Felicitaciones
```http
GET /felicitacion
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "descripcion": "Excelente atención del personal",
    "area_medica": "General",
    "Respuesta": null,
    "id_persona": 1,
    "createdAt": "2025-12-10T00:00:00.000Z",
    "persona": {
      "id": 1,
      "nombre": "Juan Perez",
      "hcCode": "HC123456"
    }
  }
]
```

### Obtener una Felicitación por ID
```http
GET /felicitacion/:id
```

**Ejemplo:** `GET /felicitacion/1`

### Crear Nueva Felicitación
```http
POST /felicitacion
```

**Body:**
```json
{
  "descripcion": "El personal fue muy amable y profesional (mínimo 10 caracteres)",
  "area_medica": "Urgencias",
  "id_persona": 1
}
```

**Respuesta:**
```json
{
  "id": 2,
  "descripcion": "El personal fue muy amable y profesional",
  "area_medica": "Urgencias",
  "Respuesta": null,
  "id_persona": 1,
  "createdAt": "2025-12-10T12:00:00.000Z"
}
```

### Actualizar Felicitación
```http
PUT /felicitacion/:id
```

**Body (todos los campos son opcionales):**
```json
{
  "descripcion": "Nueva descripción",
  "area_medica": "Pediatría"
}
```

### Revisar Felicitación
```http
PATCH /felicitacion/:id/revisar
```

**Body:**
```json
{
  "Respuesta": "Muchas gracias por su felicitación. La compartiremos con todo el equipo de urgencias."
}
```

**Respuesta:**
```json
{
  "id": 1,
  "descripcion": "Excelente atención del personal",
  "area_medica": "General",
  "Respuesta": "Muchas gracias por su felicitación. La compartiremos con todo el equipo.",
  "id_persona": 1,
  "createdAt": "2025-12-10T00:00:00.000Z"
}
```

### Eliminar Felicitación
```http
DELETE /felicitacion/:id
```

**Respuesta:**
```json
{
  "message": "Felicitacion deleted successfully"
}
```

---

## 📝 Solicitudes

### Listar Todas las Solicitudes
```http
GET /solicitud
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "descripcion": "Solicitud de cita médica",
    "area_medica": "Cardiología",
    "estado": "PENDIENTE",
    "Respuesta": null,
    "id_persona": 1,
    "createdAt": "2025-12-10T00:00:00.000Z",
    "persona": {
      "id": 1,
      "nombre": "Juan Perez",
      "hcCode": "HC123456"
    }
  }
]
```

### Obtener una Solicitud por ID
```http
GET /solicitud/:id
```

**Ejemplo:** `GET /solicitud/1`

### Crear Nueva Solicitud
```http
POST /solicitud
```

**Body:**
```json
{
  "descripcion": "Necesito agendar una cita con el cardiólogo (mínimo 10 caracteres)",
  "id_persona": 1,
  "area": "Cardiología"
}
```

**Respuesta:**
```json
{
  "id": 2,
  "descripcion": "Necesito agendar una cita con el cardiólogo",
  "area_medica": "Cardiología",
  "estado": "PENDIENTE",
  "Respuesta": null,
  "id_persona": 1,
  "createdAt": "2025-12-10T12:00:00.000Z"
}
```

### Actualizar Solicitud
```http
PUT /solicitud/:id
```

**Body (todos los campos son opcionales):**
```json
{
  "descripcion": "Nueva descripción",
  "area": "Neurología",
  "estado": "EN_PROCESO"
}
```

**Estados válidos:** `PENDIENTE`, `EN_PROCESO`, `RESUELTO`

### Revisar y Resolver Solicitud
```http
PATCH /solicitud/:id/revisar
```

**Body:**
```json
{
  "Respuesta": "Se agendó la cita médica para el día 15 de diciembre a las 10:00 AM en el área de cardiología."
}
```

**Nota:** Este endpoint automáticamente cambia el estado a `RESUELTO`.

**Respuesta:**
```json
{
  "id": 1,
  "descripcion": "Solicitud de cita médica",
  "area_medica": "Cardiología",
  "estado": "RESUELTO",
  "Respuesta": "Se agendó la cita médica para el día 15 de diciembre a las 10:00 AM.",
  "id_persona": 1,
  "createdAt": "2025-12-10T00:00:00.000Z"
}
```

### Eliminar Solicitud
```http
DELETE /solicitud/:id
```

**Respuesta:**
```json
{
  "message": "Solicitud deleted successfully"
}
```

---

## 📊 Estados Disponibles

| Estado | Descripción |
|--------|-------------|
| `PENDIENTE` | Registro creado, esperando revisión |
| `EN_PROCESO` | Se está trabajando en el caso |
| `RESUELTO` | Caso finalizado con respuesta |

---

## ⚠️ Códigos de Error Comunes

| Código | Descripción |
|--------|-------------|
| `404` | Registro no encontrado |
| `404` | Persona no existe (al crear) |
| `400` | Validación fallida (campos inválidos) |
| `500` | Error interno del servidor |

---

## 🔍 Validaciones

### Quejas
- `descripcion`: mínimo 10 caracteres, máximo 500
- `area_medica`: requerido
- `id_persona`: número entero positivo
- `respuesta`: mínimo 10 caracteres, máximo 1000 (al revisar)

### Felicitaciones
- `descripcion`: mínimo 10 caracteres, máximo 500
- `area_medica`: mínimo 3 caracteres, máximo 100
- `id_persona`: número entero positivo
- `Respuesta`: mínimo 10 caracteres, máximo 1000 (al revisar)

### Solicitudes
- `descripcion`: mínimo 10 caracteres, máximo 500
- `area`: requerido (string)
- `id_persona`: número entero positivo
- `Respuesta`: mínimo 10 caracteres, máximo 1000 (al revisar)

---

## 💡 Notas Importantes

1. **Revisión automática**: Los endpoints `/revisar` cambian automáticamente el estado a `RESUELTO` (excepto Felicitaciones que no tienen estado).

2. **Relaciones**: Todos los endpoints de listado incluyen los datos de la `persona` relacionada.

3. **Nombres de campos**: Nota que algunos usan `respuesta` (minúscula) y otros `Respuesta` (mayúscula) según el schema de Prisma. Esto se debe mantener así por compatibilidad con la base de datos.

4. **IDs en URL**: Los parámetros `:id` en la URL deben ser números enteros positivos.

5. **Validación de Persona**: Al crear quejas, felicitaciones o solicitudes, se valida que la persona con `id_persona` exista en la base de datos.

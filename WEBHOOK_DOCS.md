# Documentación de API REST - MD Bot

Esta documentación describe los endpoints REST disponibles para integración con el frontend.

## Base URL

```
Producción: https://mdbotback.vercel.app
Local: http://localhost:3000
```

---

## Endpoints GET (Consultar Datos)

### 1. Listar Quejas

Obtiene todas las quejas con filtros y paginación.

**Endpoint:** `GET /webhook/quejas`

**Query Parameters:**
| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| estado | string | - | Filtrar por estado: `PENDIENTE`, `EN_PROCESO`, `RESUELTO` |
| limit | number | 50 | Cantidad de resultados |
| offset | number | 0 | Saltar N resultados (paginación) |

**Ejemplo:**
```
GET /webhook/quejas?estado=PENDIENTE&limit=10&offset=0
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "descripcion": "Mala atención en emergencias",
      "area_medica": "Emergencias",
      "estado": "PENDIENTE",
      "respuesta": null,
      "id_persona": 1,
      "createdAt": "2024-12-16T15:00:00.000Z",
      "persona": {
        "id": 1,
        "nombre": "Juan Pérez",
        "hcCode": "HC-18669-01"
      }
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 10,
    "offset": 0,
    "hasMore": true
  }
}
```

**JavaScript:**
```javascript
const getQuejas = async (estado = null, limit = 50, offset = 0) => {
  let url = `https://mdbotback.vercel.app/webhook/quejas?limit=${limit}&offset=${offset}`;
  if (estado) url += `&estado=${estado}`;
  
  const response = await fetch(url);
  return response.json();
};

// Uso
const { data, pagination } = await getQuejas('PENDIENTE', 10, 0);
```

---

### 2. Listar Felicitaciones

Obtiene todas las felicitaciones con paginación.

**Endpoint:** `GET /webhook/felicitaciones`

**Query Parameters:**
| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| limit | number | 50 | Cantidad de resultados |
| offset | number | 0 | Saltar N resultados |

**Ejemplo:**
```
GET /webhook/felicitaciones?limit=20
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "descripcion": "Excelente atención del Dr. García",
      "area_medica": "Cardiología",
      "Respuesta": null,
      "id_persona": 2,
      "createdAt": "2024-12-16T14:00:00.000Z",
      "persona": {
        "id": 2,
        "nombre": "María López",
        "hcCode": "HC-18670-02"
      }
    }
  ],
  "pagination": {
    "total": 80,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

**JavaScript:**
```javascript
const getFelicitaciones = async (limit = 50, offset = 0) => {
  const response = await fetch(
    `https://mdbotback.vercel.app/webhook/felicitaciones?limit=${limit}&offset=${offset}`
  );
  return response.json();
};
```

---

### 3. Listar Solicitudes

Obtiene todas las solicitudes con filtros y paginación.

**Endpoint:** `GET /webhook/solicitudes`

**Query Parameters:**
| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| estado | string | - | Filtrar por estado: `PENDIENTE`, `EN_PROCESO`, `RESUELTO` |
| limit | number | 50 | Cantidad de resultados |
| offset | number | 0 | Saltar N resultados |

**Ejemplo:**
```
GET /webhook/solicitudes?estado=EN_PROCESO&limit=10
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "descripcion": "Solicito copia de historia clínica",
      "area_medica": "Archivo",
      "estado": "EN_PROCESO",
      "Respuesta": "Se está procesando su solicitud",
      "id_persona": 3,
      "createdAt": "2024-12-16T10:00:00.000Z",
      "persona": {
        "id": 3,
        "nombre": "Carlos Rodríguez",
        "hcCode": "HC-18671-03"
      }
    }
  ],
  "pagination": {
    "total": 200,
    "limit": 10,
    "offset": 0,
    "hasMore": true
  }
}
```

**JavaScript:**
```javascript
const getSolicitudes = async (estado = null, limit = 50, offset = 0) => {
  let url = `https://mdbotback.vercel.app/webhook/solicitudes?limit=${limit}&offset=${offset}`;
  if (estado) url += `&estado=${estado}`;
  
  const response = await fetch(url);
  return response.json();
};
```

---

### 4. Listar Personas

Obtiene todas las personas registradas.

**Endpoint:** `GET /webhook/personas`

**Query Parameters:**
| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| limit | number | 50 | Cantidad de resultados |
| offset | number | 0 | Saltar N resultados |

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "hcCode": "HC-18669-01",
      "insurance": "EPS Sura",
      "business": "Particular",
      "status": "Activo",
      "area": "Hospitalización",
      "createdAt": "2024-12-15T10:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 500,
    "limit": 50,
    "offset": 0,
    "hasMore": true
  }
}
```

---

### 5. Obtener Queja por ID

**Endpoint:** `GET /webhook/quejas/:id`

**Ejemplo:**
```
GET /webhook/quejas/1
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "descripcion": "Mala atención en emergencias",
    "area_medica": "Emergencias",
    "estado": "PENDIENTE",
    "respuesta": null,
    "id_persona": 1,
    "createdAt": "2024-12-16T15:00:00.000Z",
    "persona": {
      "id": 1,
      "nombre": "Juan Pérez",
      "hcCode": "HC-18669-01"
    }
  }
}
```

---

### 6. Obtener Felicitación por ID

**Endpoint:** `GET /webhook/felicitaciones/:id`

---

### 7. Obtener Solicitud por ID

**Endpoint:** `GET /webhook/solicitudes/:id`

---

### 8. Buscar Persona por hcCode

**Endpoint:** `GET /webhook/persona/hccode/:hcCode`

**Ejemplo:**
```
GET /webhook/persona/hccode/HC-18669-01
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Juan Pérez",
    "hcCode": "HC-18669-01",
    "quejas": [...],
    "felicitaciones": [...],
    "solicitudes": [...]
  }
}
```

---

### 9. Dashboard (Estadísticas)

**Endpoint:** `GET /webhook/dashboard`

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalPersonas": 500,
      "totalQuejas": 150,
      "totalFelicitaciones": 80,
      "totalSolicitudes": 200,
      "quejasPendientes": 45,
      "solicitudesPendientes": 60
    },
    "quejas": [...],
    "felicitaciones": [...],
    "solicitudes": [...]
  }
}
```

---

## Endpoints POST (Crear/Actualizar Datos)

### 1. Crear Queja

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "hcCode": "HC-18669-01",
  "descripcion": "Descripción detallada de la queja",
  "nombrePaciente": "Juan Pérez García",
  "habitacion": "201-A",
  "fechaHora": "2024-12-16T10:30:00Z"
}
```

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| hcCode | string | ✅ | Código de historia clínica |
| descripcion | string | ✅ | Descripción de la queja |
| nombrePaciente | string | ❌ | Nombre del paciente |
| habitacion | string | ❌ | Número de habitación |
| fechaHora | string (ISO 8601) | ❌ | Fecha y hora del incidente |

**Respuesta Exitosa (201):**
```json
{
  "success": true,
  "message": "Queja creada exitosamente",
  "data": {
    "id": 1,
    "hcCode": "HC-18669-01",
    "descripcion": "Descripción detallada de la queja",
    "nombrePaciente": "Juan Pérez García",
    "habitacion": "201-A",
    "fechaHora": "2024-12-16T10:30:00.000Z",
    "estado": "PENDIENTE",
    "createdAt": "2024-12-16T15:00:00.000Z"
  }
}
```

**Ejemplo JavaScript:**
```javascript
const crearQueja = async (queja) => {
  const response = await fetch('https://mdbotback.vercel.app/webhook/queja', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(queja),
  });
  return response.json();
};

// Uso
crearQueja({
  hcCode: 'HC-18669-01',
  descripcion: 'La limpieza no fue adecuada',
  nombrePaciente: 'Juan Pérez',
  habitacion: '201-A'
});
```

---

### 2. Crear Felicitación

Crea una nueva felicitación en el sistema.

**Endpoint:** `POST /webhook/felicitacion`

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "hcCode": "HC-18669-01",
  "descripcion": "Excelente atención del personal de enfermería",
  "nombrePaciente": "María López",
  "habitacion": "305-B",
  "fechaHora": "2024-12-16T14:00:00Z"
}
```

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| hcCode | string | ✅ | Código de historia clínica |
| descripcion | string | ✅ | Descripción de la felicitación |
| nombrePaciente | string | ❌ | Nombre del paciente |
| habitacion | string | ❌ | Número de habitación |
| fechaHora | string (ISO 8601) | ❌ | Fecha y hora |

**Respuesta Exitosa (201):**
```json
{
  "success": true,
  "message": "Felicitación creada exitosamente",
  "data": {
    "id": 1,
    "hcCode": "HC-18669-01",
    "descripcion": "Excelente atención del personal de enfermería",
    "nombrePaciente": "María López",
    "habitacion": "305-B",
    "fechaHora": "2024-12-16T14:00:00.000Z",
    "estado": "PENDIENTE",
    "createdAt": "2024-12-16T15:00:00.000Z"
  }
}
```

**Ejemplo JavaScript:**
```javascript
const crearFelicitacion = async (felicitacion) => {
  const response = await fetch('https://mdbotback.vercel.app/webhook/felicitacion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(felicitacion),
  });
  return response.json();
};
```

---

### 3. Crear Solicitud

Crea una nueva solicitud en el sistema.

**Endpoint:** `POST /webhook/solicitud`

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "hcCode": "HC-18669-01",
  "descripcion": "Solicito cambio de habitación",
  "nombrePaciente": "Carlos Rodríguez",
  "habitacion": "102-C",
  "fechaHora": "2024-12-16T09:00:00Z"
}
```

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| hcCode | string | ✅ | Código de historia clínica |
| descripcion | string | ✅ | Descripción de la solicitud |
| nombrePaciente | string | ❌ | Nombre del paciente |
| habitacion | string | ❌ | Número de habitación |
| fechaHora | string (ISO 8601) | ❌ | Fecha y hora |

**Respuesta Exitosa (201):**
```json
{
  "success": true,
  "message": "Solicitud creada exitosamente",
  "data": {
    "id": 1,
    "hcCode": "HC-18669-01",
    "descripcion": "Solicito cambio de habitación",
    "nombrePaciente": "Carlos Rodríguez",
    "habitacion": "102-C",
    "fechaHora": "2024-12-16T09:00:00.000Z",
    "estado": "PENDIENTE",
    "createdAt": "2024-12-16T15:00:00.000Z"
  }
}
```

**Ejemplo JavaScript:**
```javascript
const crearSolicitud = async (solicitud) => {
  const response = await fetch('https://mdbotback.vercel.app/webhook/solicitud', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(solicitud),
  });
  return response.json();
};
```

---

### 4. Crear/Actualizar Persona

Crea una nueva persona o actualiza si ya existe (basado en `hcCode`).

**Endpoint:** `POST /webhook/persona`

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "hcCode": "HC-18669-01",
  "nombre": "Juan",
  "apellido": "Pérez García",
  "telefono": "+573001234567",
  "habitacion": "201-A"
}
```

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| hcCode | string | ✅ | Código de historia clínica (único) |
| nombre | string | ❌ | Nombre del paciente |
| apellido | string | ❌ | Apellido del paciente |
| telefono | string | ❌ | Teléfono de contacto |
| habitacion | string | ❌ | Número de habitación |

**Respuesta Exitosa (201):**
```json
{
  "success": true,
  "message": "Persona creada/actualizada exitosamente",
  "data": {
    "id": 1,
    "hcCode": "HC-18669-01",
    "nombre": "Juan",
    "apellido": "Pérez García",
    "telefono": "+573001234567",
    "habitacion": "201-A",
    "createdAt": "2024-12-16T15:00:00.000Z",
    "updatedAt": "2024-12-16T15:00:00.000Z"
  }
}
```

**Ejemplo JavaScript:**
```javascript
const crearPersona = async (persona) => {
  const response = await fetch('https://mdbotback.vercel.app/webhook/persona', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(persona),
  });
  return response.json();
};
```

---

### 5. Buscar Persona por hcCode

Busca una persona por su código de historia clínica.

**Endpoint:** `GET /webhook/persona/hccode/:hcCode`

**Parámetros URL:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| hcCode | string | Código de historia clínica |

**Respuesta Exitosa (200):**
```json
{
  "id": 1,
  "hcCode": "HC-18669-01",
  "nombre": "Juan",
  "apellido": "Pérez García",
  "telefono": "+573001234567",
  "habitacion": "201-A",
  "createdAt": "2024-12-16T15:00:00.000Z",
  "updatedAt": "2024-12-16T15:00:00.000Z"
}
```

**Respuesta No Encontrado (404):**
```json
{
  "statusCode": 404,
  "message": "Persona no encontrada",
  "error": "Not Found"
}
```

**Ejemplo JavaScript:**
```javascript
const buscarPersona = async (hcCode) => {
  const response = await fetch(`https://mdbotback.vercel.app/webhook/persona/hccode/${hcCode}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      return null; // Persona no encontrada
    }
    throw new Error('Error al buscar persona');
  }
  
  return response.json();
};

// Uso
const persona = await buscarPersona('HC-18669-01');
if (persona) {
  console.log('Persona encontrada:', persona);
} else {
  console.log('Persona no existe');
}
```

---

### 6. Actualizar Estado

Actualiza el estado de una queja, felicitación o solicitud.

**Endpoint:** `POST /webhook/estado`

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "id": 1,
  "tipo": "queja",
  "estado": "EN_REVISION",
  "comentario": "Se está revisando el caso"
}
```

| Campo | Tipo | Requerido | Valores Permitidos |
|-------|------|-----------|-------------------|
| id | number | ✅ | ID de la entidad |
| tipo | string | ✅ | `queja`, `felicitacion`, `solicitud` |
| estado | string | ✅ | `PENDIENTE`, `EN_REVISION`, `RESUELTO`, `CERRADO` |
| comentario | string | ❌ | Comentario opcional |

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "message": "Estado actualizado exitosamente",
  "data": {
    "id": 1,
    "estado": "EN_REVISION",
    "updatedAt": "2024-12-16T16:00:00.000Z"
  }
}
```

**Ejemplo JavaScript:**
```javascript
const actualizarEstado = async (id, tipo, estado, comentario = null) => {
  const response = await fetch('https://mdbotback.vercel.app/webhook/estado', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, tipo, estado, comentario }),
  });
  return response.json();
};

// Uso
actualizarEstado(1, 'queja', 'RESUELTO', 'Caso resuelto satisfactoriamente');
```

---

### 7. Obtener Dashboard

Obtiene estadísticas generales del sistema.

**Endpoint:** `GET /webhook/dashboard`

**Respuesta Exitosa (200):**
```json
{
  "quejas": {
    "total": 150,
    "pendientes": 45,
    "enRevision": 30,
    "resueltas": 75
  },
  "felicitaciones": {
    "total": 80,
    "pendientes": 10,
    "revisadas": 70
  },
  "solicitudes": {
    "total": 200,
    "pendientes": 60,
    "enProceso": 50,
    "completadas": 90
  },
  "personas": {
    "total": 500
  }
}
```

**Ejemplo JavaScript:**
```javascript
const obtenerDashboard = async () => {
  const response = await fetch('https://mdbotback.vercel.app/webhook/dashboard');
  return response.json();
};

// Uso
const stats = await obtenerDashboard();
console.log('Total quejas:', stats.quejas.total);
```

---

## Integración Completa - React/Next.js

### Hook personalizado para webhooks

```typescript
// hooks/useWebhook.ts
import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mdbotback.vercel.app';

interface WebhookResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const useWebhook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = async <T>(
    endpoint: string,
    method: 'GET' | 'POST' = 'GET',
    body?: object
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(`${API_URL}${endpoint}`, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Métodos específicos
  const crearQueja = (data: {
    hcCode: string;
    descripcion: string;
    nombrePaciente?: string;
    habitacion?: string;
    fechaHora?: string;
  }) => request<WebhookResponse<any>>('/webhook/queja', 'POST', data);

  const crearFelicitacion = (data: {
    hcCode: string;
    descripcion: string;
    nombrePaciente?: string;
    habitacion?: string;
    fechaHora?: string;
  }) => request<WebhookResponse<any>>('/webhook/felicitacion', 'POST', data);

  const crearSolicitud = (data: {
    hcCode: string;
    descripcion: string;
    nombrePaciente?: string;
    habitacion?: string;
    fechaHora?: string;
  }) => request<WebhookResponse<any>>('/webhook/solicitud', 'POST', data);

  const crearPersona = (data: {
    hcCode: string;
    nombre?: string;
    apellido?: string;
    telefono?: string;
    habitacion?: string;
  }) => request<WebhookResponse<any>>('/webhook/persona', 'POST', data);

  const buscarPersonaPorHcCode = (hcCode: string) =>
    request<any>(`/webhook/persona/hccode/${hcCode}`);

  const actualizarEstado = (data: {
    id: number;
    tipo: 'queja' | 'felicitacion' | 'solicitud';
    estado: 'PENDIENTE' | 'EN_REVISION' | 'RESUELTO' | 'CERRADO';
    comentario?: string;
  }) => request<WebhookResponse<any>>('/webhook/estado', 'POST', data);

  const obtenerDashboard = () => request<any>('/webhook/dashboard');

  return {
    loading,
    error,
    crearQueja,
    crearFelicitacion,
    crearSolicitud,
    crearPersona,
    buscarPersonaPorHcCode,
    actualizarEstado,
    obtenerDashboard,
  };
};
```

### Ejemplo de uso en componente

```tsx
// components/QuejaForm.tsx
import { useState } from 'react';
import { useWebhook } from '@/hooks/useWebhook';

export default function QuejaForm() {
  const { crearQueja, loading, error } = useWebhook();
  const [formData, setFormData] = useState({
    hcCode: '',
    descripcion: '',
    nombrePaciente: '',
    habitacion: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const resultado = await crearQueja(formData);
    
    if (resultado?.success) {
      alert('Queja creada exitosamente');
      // Resetear formulario o redirigir
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Código HC (ej: HC-18669-01)"
        value={formData.hcCode}
        onChange={(e) => setFormData({ ...formData, hcCode: e.target.value })}
        required
      />
      
      <textarea
        placeholder="Descripción de la queja"
        value={formData.descripcion}
        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
        required
      />
      
      <input
        type="text"
        placeholder="Nombre del paciente"
        value={formData.nombrePaciente}
        onChange={(e) => setFormData({ ...formData, nombrePaciente: e.target.value })}
      />
      
      <input
        type="text"
        placeholder="Habitación"
        value={formData.habitacion}
        onChange={(e) => setFormData({ ...formData, habitacion: e.target.value })}
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar Queja'}
      </button>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
```

---

## Clase de Servicio (Vanilla JS/TypeScript)

```typescript
// services/webhookService.ts
class WebhookService {
  private baseUrl: string;

  constructor(baseUrl = 'https://mdbotback.vercel.app') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Quejas
  async crearQueja(data: {
    hcCode: string;
    descripcion: string;
    nombrePaciente?: string;
    habitacion?: string;
  }) {
    return this.request('/webhook/queja', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Felicitaciones
  async crearFelicitacion(data: {
    hcCode: string;
    descripcion: string;
    nombrePaciente?: string;
    habitacion?: string;
  }) {
    return this.request('/webhook/felicitacion', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Solicitudes
  async crearSolicitud(data: {
    hcCode: string;
    descripcion: string;
    nombrePaciente?: string;
    habitacion?: string;
  }) {
    return this.request('/webhook/solicitud', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Personas
  async crearPersona(data: {
    hcCode: string;
    nombre?: string;
    apellido?: string;
    telefono?: string;
    habitacion?: string;
  }) {
    return this.request('/webhook/persona', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async buscarPersonaPorHcCode(hcCode: string) {
    return this.request(`/webhook/persona/hccode/${hcCode}`);
  }

  // Estados
  async actualizarEstado(data: {
    id: number;
    tipo: 'queja' | 'felicitacion' | 'solicitud';
    estado: 'PENDIENTE' | 'EN_REVISION' | 'RESUELTO' | 'CERRADO';
    comentario?: string;
  }) {
    return this.request('/webhook/estado', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Dashboard
  async obtenerDashboard() {
    return this.request('/webhook/dashboard');
  }
}

// Exportar instancia única
export const webhookService = new WebhookService();
```

---

## Códigos de Error

| Código | Descripción |
|--------|-------------|
| 200 | Operación exitosa |
| 201 | Recurso creado exitosamente |
| 400 | Datos inválidos en la solicitud |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

---

## Variables de Entorno Recomendadas

```env
# .env.local (Next.js)
NEXT_PUBLIC_API_URL=https://mdbotback.vercel.app

# .env (React con Vite)
VITE_API_URL=https://mdbotback.vercel.app
```

---

## WebSocket - Conexión en Tiempo Real

El backend emite eventos WebSocket cada vez que se crea o actualiza una queja, felicitación o solicitud. Esto permite que tu frontend reciba actualizaciones instantáneas.

> ⚠️ **Nota**: Los WebSockets **NO funcionan en Vercel** (serverless). Para usar esta funcionalidad en producción, el backend debe estar desplegado en **Railway**, **Render**, **Fly.io** o similar.

### Instalación

```bash
npm install socket.io-client
```

### Conexión Básica

```typescript
import { io, Socket } from 'socket.io-client';

// URL del backend (usar Railway/Render en producción para WebSockets)
const SOCKET_URL = 'http://localhost:3000'; // o tu URL de producción

const socket: Socket = io(SOCKET_URL, {
  transports: ['websocket', 'polling'],
  autoConnect: true,
});

// Verificar conexión
socket.on('connect', () => {
  console.log('✅ Conectado al WebSocket:', socket.id);
});

socket.on('disconnect', () => {
  console.log('❌ Desconectado del WebSocket');
});

socket.on('connect_error', (error) => {
  console.error('Error de conexión:', error);
});
```

### Eventos Disponibles

| Evento | Descripción | Payload |
|--------|-------------|---------|
| `nueva-queja` | Se creó una nueva queja | Objeto Queja completo |
| `queja-actualizada` | Se actualizó una queja | Objeto Queja actualizado |
| `nueva-felicitacion` | Se creó una nueva felicitación | Objeto Felicitación completo |
| `felicitacion-actualizada` | Se actualizó una felicitación | Objeto Felicitación actualizado |
| `nueva-solicitud` | Se creó una nueva solicitud | Objeto Solicitud completo |
| `solicitud-actualizada` | Se actualizó una solicitud | Objeto Solicitud actualizado |
| `nueva-persona` | Se creó una nueva persona | Objeto Persona completo |
| `persona-actualizada` | Se actualizó una persona | Objeto Persona actualizado |
| `dashboard-update` | Cualquier actualización del sistema | `{ type: string, payload: any }` |

### Escuchar Eventos

```typescript
// Escuchar nuevas quejas
socket.on('nueva-queja', (queja) => {
  console.log('Nueva queja recibida:', queja);
  // Actualizar tu estado/UI
  // Ejemplo: setQuejas(prev => [queja, ...prev]);
});

// Escuchar quejas actualizadas
socket.on('queja-actualizada', (queja) => {
  console.log('Queja actualizada:', queja);
  // Actualizar la queja en tu estado
});

// Escuchar nuevas felicitaciones
socket.on('nueva-felicitacion', (felicitacion) => {
  console.log('Nueva felicitación:', felicitacion);
});

// Escuchar nuevas solicitudes
socket.on('nueva-solicitud', (solicitud) => {
  console.log('Nueva solicitud:', solicitud);
});

// Escuchar TODAS las actualizaciones del dashboard
socket.on('dashboard-update', (data) => {
  console.log('Dashboard update:', data.type, data.payload);
  
  switch (data.type) {
    case 'nueva-queja':
      // Actualizar contador de quejas
      break;
    case 'nueva-felicitacion':
      // Actualizar contador de felicitaciones
      break;
    case 'nueva-solicitud':
      // Actualizar contador de solicitudes
      break;
  }
});
```

### Hook Completo para React/Next.js

```typescript
// hooks/useSocket.ts
import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000';

interface Queja {
  id: number;
  descripcion: string;
  area_medica: string;
  estado: string;
  persona: any;
  createdAt: string;
}

interface Felicitacion {
  id: number;
  descripcion: string;
  area_medica: string;
  persona: any;
  createdAt: string;
}

interface Solicitud {
  id: number;
  descripcion: string;
  area_medica: string;
  estado: string;
  persona: any;
  createdAt: string;
}

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastQueja, setLastQueja] = useState<Queja | null>(null);
  const [lastFelicitacion, setLastFelicitacion] = useState<Felicitacion | null>(null);
  const [lastSolicitud, setLastSolicitud] = useState<Solicitud | null>(null);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    socketInstance.on('connect', () => {
      console.log('✅ Socket conectado:', socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('❌ Socket desconectado');
      setIsConnected(false);
    });

    // Escuchar eventos
    socketInstance.on('nueva-queja', (queja: Queja) => {
      console.log('📢 Nueva queja:', queja);
      setLastQueja(queja);
    });

    socketInstance.on('queja-actualizada', (queja: Queja) => {
      console.log('📝 Queja actualizada:', queja);
      setLastQueja(queja);
    });

    socketInstance.on('nueva-felicitacion', (felicitacion: Felicitacion) => {
      console.log('🎉 Nueva felicitación:', felicitacion);
      setLastFelicitacion(felicitacion);
    });

    socketInstance.on('nueva-solicitud', (solicitud: Solicitud) => {
      console.log('📋 Nueva solicitud:', solicitud);
      setLastSolicitud(solicitud);
    });

    setSocket(socketInstance);

    // Cleanup al desmontar
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Suscribirse a un canal específico
  const subscribe = useCallback((room: string) => {
    if (socket) {
      socket.emit('subscribe', room);
    }
  }, [socket]);

  // Desuscribirse de un canal
  const unsubscribe = useCallback((room: string) => {
    if (socket) {
      socket.emit('unsubscribe', room);
    }
  }, [socket]);

  return {
    socket,
    isConnected,
    lastQueja,
    lastFelicitacion,
    lastSolicitud,
    subscribe,
    unsubscribe,
  };
};
```

### Ejemplo de Componente con WebSocket

```tsx
// components/Dashboard.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { useWebhook } from '@/hooks/useWebhook';

interface DashboardStats {
  quejas: number;
  felicitaciones: number;
  solicitudes: number;
}

export default function Dashboard() {
  const { isConnected, lastQueja, lastFelicitacion, lastSolicitud } = useSocket();
  const { obtenerDashboard } = useWebhook();
  const [stats, setStats] = useState<DashboardStats>({
    quejas: 0,
    felicitaciones: 0,
    solicitudes: 0,
  });
  const [recentItems, setRecentItems] = useState<any[]>([]);

  // Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      const dashboard = await obtenerDashboard();
      if (dashboard) {
        setStats({
          quejas: dashboard.quejas?.total || 0,
          felicitaciones: dashboard.felicitaciones?.total || 0,
          solicitudes: dashboard.solicitudes?.total || 0,
        });
      }
    };
    loadData();
  }, []);

  // Actualizar cuando llega una nueva queja
  useEffect(() => {
    if (lastQueja) {
      setStats(prev => ({ ...prev, quejas: prev.quejas + 1 }));
      setRecentItems(prev => [
        { type: 'queja', data: lastQueja, timestamp: new Date() },
        ...prev.slice(0, 9),
      ]);
    }
  }, [lastQueja]);

  // Actualizar cuando llega una nueva felicitación
  useEffect(() => {
    if (lastFelicitacion) {
      setStats(prev => ({ ...prev, felicitaciones: prev.felicitaciones + 1 }));
      setRecentItems(prev => [
        { type: 'felicitacion', data: lastFelicitacion, timestamp: new Date() },
        ...prev.slice(0, 9),
      ]);
    }
  }, [lastFelicitacion]);

  // Actualizar cuando llega una nueva solicitud
  useEffect(() => {
    if (lastSolicitud) {
      setStats(prev => ({ ...prev, solicitudes: prev.solicitudes + 1 }));
      setRecentItems(prev => [
        { type: 'solicitud', data: lastSolicitud, timestamp: new Date() },
        ...prev.slice(0, 9),
      ]);
    }
  }, [lastSolicitud]);

  return (
    <div className="p-6">
      {/* Indicador de conexión */}
      <div className="mb-4 flex items-center gap-2">
        <div 
          className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} 
        />
        <span>{isConnected ? 'Conectado en tiempo real' : 'Desconectado'}</span>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-red-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Quejas</h3>
          <p className="text-3xl font-bold">{stats.quejas}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Felicitaciones</h3>
          <p className="text-3xl font-bold">{stats.felicitaciones}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Solicitudes</h3>
          <p className="text-3xl font-bold">{stats.solicitudes}</p>
        </div>
      </div>

      {/* Actividad reciente (en tiempo real) */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Actividad en Tiempo Real</h3>
        <ul className="space-y-2">
          {recentItems.map((item, index) => (
            <li 
              key={index} 
              className={`p-3 rounded-lg ${
                item.type === 'queja' ? 'bg-red-50 border-l-4 border-red-500' :
                item.type === 'felicitacion' ? 'bg-green-50 border-l-4 border-green-500' :
                'bg-blue-50 border-l-4 border-blue-500'
              }`}
            >
              <span className="font-semibold capitalize">{item.type}:</span>{' '}
              {item.data.descripcion?.substring(0, 100)}...
              <span className="text-sm text-gray-500 ml-2">
                {item.timestamp.toLocaleTimeString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

### Notificaciones Toast con WebSocket

```tsx
// components/ToastNotifications.tsx
'use client';

import { useEffect } from 'react';
import { useSocket } from '@/hooks/useSocket';
import { toast, Toaster } from 'react-hot-toast'; // npm install react-hot-toast

export default function ToastNotifications() {
  const { lastQueja, lastFelicitacion, lastSolicitud } = useSocket();

  useEffect(() => {
    if (lastQueja) {
      toast.error(`Nueva Queja: ${lastQueja.descripcion?.substring(0, 50)}...`, {
        icon: '⚠️',
        duration: 5000,
      });
    }
  }, [lastQueja]);

  useEffect(() => {
    if (lastFelicitacion) {
      toast.success(`Nueva Felicitación: ${lastFelicitacion.descripcion?.substring(0, 50)}...`, {
        icon: '🎉',
        duration: 5000,
      });
    }
  }, [lastFelicitacion]);

  useEffect(() => {
    if (lastSolicitud) {
      toast(`Nueva Solicitud: ${lastSolicitud.descripcion?.substring(0, 50)}...`, {
        icon: '📋',
        duration: 5000,
      });
    }
  }, [lastSolicitud]);

  return <Toaster position="top-right" />;
}
```

### Variables de Entorno para WebSocket

```env
# .env.local (Next.js)
NEXT_PUBLIC_API_URL=https://mdbotback.vercel.app
NEXT_PUBLIC_SOCKET_URL=https://tu-backend-railway.up.railway.app

# Para desarrollo local
# NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
```

---

## Flujo Completo: API + WebSocket

```
┌─────────────┐      POST /webhook/queja      ┌─────────────┐
│   n8n /     │ ─────────────────────────────▶│   Backend   │
│  Frontend   │                               │   NestJS    │
└─────────────┘                               └──────┬──────┘
                                                     │
                                                     │ 1. Guarda en DB
                                                     │ 2. Emite WebSocket
                                                     ▼
                                              ┌─────────────┐
                                              │  WebSocket  │
                                              │   Server    │
                                              └──────┬──────┘
                                                     │
                         emit('nueva-queja')         │
                    ┌────────────────────────────────┼────────────────────────────────┐
                    ▼                                ▼                                ▼
            ┌─────────────┐                  ┌─────────────┐                  ┌─────────────┐
            │  Cliente 1  │                  │  Cliente 2  │                  │  Cliente N  │
            │  (Browser)  │                  │  (Browser)  │                  │  (Browser)  │
            └─────────────┘                  └─────────────┘                  └─────────────┘
```

---

## CORS

Los endpoints de webhook están configurados para aceptar solicitudes desde cualquier origen. No necesitas configuración adicional de CORS en tu frontend.

El WebSocket tiene CORS configurado para:
- `https://mdbotfront.vercel.app`
- `http://localhost:3000`
- `http://localhost:3001`
- `http://localhost:5173`

---

## Notas Importantes

1. **Sin autenticación**: Los endpoints `/webhook/*` son públicos y no requieren token JWT.

2. **WebSockets en Producción**: Los WebSockets **NO funcionan en Vercel** (serverless). Para tiempo real necesitas:
   - **Railway** (recomendado)
   - **Render**
   - **Fly.io**
   - **Heroku**

3. **Validación**: Todos los datos son validados con Zod. Si envías datos inválidos, recibirás un error 400 con detalles.

4. **hcCode único**: El campo `hcCode` es único para personas. Si creas una persona con un `hcCode` existente, se actualizará en lugar de crear una nueva.

5. **Eventos automáticos**: Cada vez que usas los endpoints POST del webhook, el backend automáticamente emite el evento WebSocket correspondiente a todos los clientes conectados.

import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: [
      'https://mdbotfront.vercel.app',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5173',
    ],
    credentials: true,
  },
})
@Injectable()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedClients: Map<string, Socket> = new Map();

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
    this.connectedClients.set(client.id, client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
    this.connectedClients.delete(client.id);
  }

  // Emitir cuando se crea una nueva queja
  emitNewQueja(queja: any) {
    this.server.emit('nueva-queja', queja);
  }

  // Emitir cuando se actualiza una queja
  emitUpdateQueja(queja: any) {
    this.server.emit('queja-actualizada', queja);
  }

  // Emitir cuando se crea una nueva felicitación
  emitNewFelicitacion(felicitacion: any) {
    this.server.emit('nueva-felicitacion', felicitacion);
  }

  // Emitir cuando se actualiza una felicitación
  emitUpdateFelicitacion(felicitacion: any) {
    this.server.emit('felicitacion-actualizada', felicitacion);
  }

  // Emitir cuando se crea una nueva solicitud
  emitNewSolicitud(solicitud: any) {
    this.server.emit('nueva-solicitud', solicitud);
  }

  // Emitir cuando se actualiza una solicitud
  emitUpdateSolicitud(solicitud: any) {
    this.server.emit('solicitud-actualizada', solicitud);
  }

  // Emitir cuando se crea/actualiza una persona
  emitNewPersona(persona: any) {
    this.server.emit('nueva-persona', persona);
  }

  emitUpdatePersona(persona: any) {
    this.server.emit('persona-actualizada', persona);
  }

  // Evento genérico para cualquier actualización
  emitDashboardUpdate(data: { type: string; payload: any }) {
    this.server.emit('dashboard-update', data);
  }

  // Cliente puede suscribirse a un canal específico
  @SubscribeMessage('subscribe')
  handleSubscribe(client: Socket, room: string) {
    client.join(room);
    console.log(`Cliente ${client.id} suscrito a: ${room}`);
    return { success: true, room };
  }

  @SubscribeMessage('unsubscribe')
  handleUnsubscribe(client: Socket, room: string) {
    client.leave(room);
    console.log(`Cliente ${client.id} desuscrito de: ${room}`);
    return { success: true, room };
  }
}

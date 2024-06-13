import { WebSocketGateway } from '@nestjs/websockets';
import { ThreadService } from '../services';

@WebSocketGateway({ cors: true })
export class ThreadGateway {
  constructor(private readonly threadService: ThreadService) {}
}

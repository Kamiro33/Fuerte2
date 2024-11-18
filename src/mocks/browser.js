import { setupWorker } from 'msw';
import { handlers } from './handlers';

// Configura el worker con los manejadores simulados
export const worker = setupWorker(...handlers);
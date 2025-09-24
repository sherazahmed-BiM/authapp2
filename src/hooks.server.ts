// src/hooks.server.ts
import { handle as authHandle } from './auth';
import { sequence } from '@sveltejs/kit/hooks';

// If you have other hooks, combine them with sequence
export const handle = sequence(authHandle);

// Or if this is your only hook:
// export { handle } from './auth';
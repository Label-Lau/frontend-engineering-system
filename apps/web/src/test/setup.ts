import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';

import { server } from './mocks/server';

// 在所有测试用例之前
beforeAll(() => {
  // MSW 3 起，未匹配的请求/WebSocket 帧统一叫 frame：
  // 选项从 onUnhandledRequest 改名为 onUnhandledFrame
  server.listen({ onUnhandledFrame: 'error' });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

// 在所有测试用例结束后
afterAll(() => {
  server.close();
});

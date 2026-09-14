import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

/**
 * 全局唯一的 QueryClient 实例。
 *
 * - 负责管理应用中所有 React Query 的缓存、请求状态与重试逻辑。
 * - 在模块顶层创建一次，保证整个应用生命周期内共享同一份缓存，
 *   避免在组件渲染过程中重复实例化导致缓存丢失或内存泄漏。
 * - 如需自定义默认行为（如 staleTime、retry 次数、错误重试策略等），
 *   可在 `new QueryClient({ defaultOptions: { queries: { ... } } })` 中配置。
 */
const queryClient = new QueryClient();

/**
 * AppProviders 组件接收的属性。
 *
 * `children`：由父级传入、需要被各 Provider 包裹的子节点（通常是整个应用树）。
 */
type AppProvidersProps = {
  children: ReactNode;
};

/**
 * 应用级 Provider 聚合入口。
 *
 * 职责：把所有需要贯穿全局的 Provider（如 React Query、路由、主题、
 * 权限、国际化等）集中挂载到这一处，避免在入口文件里层层嵌套。
 *
 * 当前仅接入 React Query，后续如需新增 Provider，直接在 return 中
 * 向外包裹即可，例如：
 *
 *   return (
 *     <ThemeProvider>
 *       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
 *     </ThemeProvider>
 *   );
 *
 * 使用方式：在应用根组件（如 app/layout 或入口处）用 <AppProviders> 包裹整个应用树。
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}

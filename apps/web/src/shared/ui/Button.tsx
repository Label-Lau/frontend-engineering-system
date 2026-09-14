import type { ComponentPropsWithoutRef } from 'react';

import { getButtonClassName, type ButtonSize, type ButtonVariant } from '@/shared/ui/button-styles';

/**
 * Button 的 props。
 *
 * 前半部分 `ComponentPropsWithoutRef<'button'>` 的意思是：
 * “把原生 `<button>` 支持的全部属性都继承过来”。
 * 这样调用方可以直接写 `<Button disabled />`、`<Button aria-label="关闭" />`、
 * `<Button onClick={...} />`，而不需要我们在这里把几十个原生属性逐个手写，
 * 浏览器以后新增属性也能自动跟上。
 *
 * 为什么是 `WithoutRef`（去掉 ref）而不是 `ComponentProps`：
 * `ref` 是 React 用来拿到真实 DOM 元素的特殊属性，需要配合 `forwardRef` 之类的写法才会生效。
 * 当前这个 Button 并没有处理 `ref`，如果把它算进 props，就等于类型上“声称支持”，
 * 实际调用方写了 `ref` 却没有任何效果。所以这里主动把 `ref` 排除掉。
 * 将来若确实需要支持 ref，再改用 `forwardRef` 或 `ComponentPropsWithRef`。
 *
 * 末尾的 `& { ... }` 表示在原生属性之外，再补充 Button 自己新增的属性。
 */
type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  /** 视觉样式，默认 `'primary'` */
  variant?: ButtonVariant;
  /** 尺寸，默认 `'md'` */
  size?: ButtonSize;
};

/**
 * 基础按钮组件：在原生 `<button>` 之上提供 variant / size 两套视觉配置，
 * 其余原生属性（type、disabled、onClick、aria-* 等）全部原样透传给真实 DOM。
 *
 * @example
 * ```tsx
 * // 输入：默认用法
 * <Button onClick={handleSave}>保存</Button>
 * // 输出：variant=primary、size=md、type=button 的主色按钮
 *
 * // 输入：指定样式并透传原生属性
 * <Button variant="danger" size="sm" disabled aria-label="删除">
 *   删除
 * </Button>
 * // 输出：危险色小号按钮，且 disabled / aria-label 在真实 DOM 上正常生效
 * ```
 */
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  // HTML 中 <button> 不写 type 时默认为 submit，会意外提交所在表单，因此这里兜底为 'button'
  type = 'button',
  ...props // 剩余的原生属性，原样透传给下面的 <button>
}: ButtonProps) {
  return (
    // className 与 variant / size 一起交给 getButtonClassName 拼装成最终 class
    <button className={getButtonClassName({ variant, size, className })} type={type} {...props} />
  );
}

// 导出一个 Button 组件示例
export const Button = ({ children, onClick }) => {
  return <button style={{ padding: '8px 16px', color: '#fff', background: '#1890ff' }} onClick={onClick}>{children}</button>;
};
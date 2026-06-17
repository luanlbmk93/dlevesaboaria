import LoginForm from '@/components/admin/LoginForm';

export default function AdminLoginPage() {
  return (
    <div className="login-page">
      <div className="login-card">
        <h1>D&apos;Leve Admin</h1>
        <p>Painel de gerenciamento de produtos</p>
        <LoginForm />
      </div>
    </div>
  );
}

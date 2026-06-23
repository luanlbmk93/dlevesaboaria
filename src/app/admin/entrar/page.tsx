import LoginForm from '@/components/admin/LoginForm';

export default function AdminLoginPage() {
  return (
    <div className="login-page">
      <div className="login-card">
        <h1>D&apos;Leve — Painel</h1>
        <p>Entre para gerenciar os produtos da loja</p>
        <LoginForm />
      </div>
    </div>
  );
}

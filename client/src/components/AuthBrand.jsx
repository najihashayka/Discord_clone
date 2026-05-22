export default function AuthBrand({ description, features }) {
  return (
    <div className="auth-brand">
      <div className="auth-logo">
        <div className="auth-logo-icon">D</div>
        <h1>Discord Clone</h1>
      </div>
      <p>{description}</p>
      <ul className="auth-features">
        {features.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

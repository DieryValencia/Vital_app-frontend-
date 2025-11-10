function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          VitalApp Frontend
        </h1>
        <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-card-foreground mb-2">
            ✅ Tailwind CSS Configurado Correctamente
          </h2>
          <p className="text-muted-foreground">
            Si puedes ver este texto con estilos, Tailwind está funcionando.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
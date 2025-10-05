import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@float-vibe-foundry/design-system';

export default function HomePage() {
  return (
    <main className="bg-bg-secondary min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-display-sm text-text-primary">
              Risk Metrics Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text-secondary">
              Post-trade operational risk management dashboard prototype
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

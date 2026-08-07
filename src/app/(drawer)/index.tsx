import { HomeDashboard } from '@/components/home/HomeDashboard';
import { useBootstrapCountryDetection } from '@/hooks/useBootstrapCountryDetection';

export default function HomeScreen() {
  useBootstrapCountryDetection();
  return <HomeDashboard />;
}

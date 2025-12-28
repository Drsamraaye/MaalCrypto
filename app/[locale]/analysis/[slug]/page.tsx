import DynamicPostPage from '@/components/DynamicPostPage';

export default function AnalysisDetailsPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    return <DynamicPostPage params={params} type="ANALYSIS" />;
}

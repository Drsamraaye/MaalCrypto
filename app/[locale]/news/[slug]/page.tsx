import DynamicPostPage from '@/components/DynamicPostPage';

export default function NewsDetailsPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    return <DynamicPostPage params={params} type="NEWS" />;
}

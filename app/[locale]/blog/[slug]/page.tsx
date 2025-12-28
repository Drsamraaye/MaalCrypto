import DynamicPostPage from '@/components/DynamicPostPage';

export default function BlogDetailsPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    return <DynamicPostPage params={params} type="BLOG" />;
}

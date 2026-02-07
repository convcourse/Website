import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    const t = useTranslations('NotFound');

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface-50 px-4">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-primary-200 mb-4">404</h1>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('title')}</h2>
                <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto">
                    {t('description')}
                </p>
                <Link href="/">
                    <Button variant="glow" size="lg">
                        {t('homeButton')}
                    </Button>
                </Link>
            </div>
        </div>
    );
}

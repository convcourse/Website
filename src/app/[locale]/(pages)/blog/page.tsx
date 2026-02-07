import { useTranslations } from 'next-intl';
import { Calendar, User, ArrowRight, BookOpen, TrendingUp, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Metadata needs to be handled separately or dynamically if needed, 
// but for now we keep the page component structure.

export default function BlogPage() {
  const t = useTranslations('Blog');

  const categories = [
    'all',
    'ai_education',
    'technology',
    'success_stories',
    'trends',
    'privacy',
    'blockchain'
  ];

  // Helper to get posts from translations
  // In a real app with dynamic content, this would come from a CMS or API.
  // Here we simulate it by mapping over a known range or structure.
  // Since we can't easily iterate over translation keys without knowing them,
  // we'll hardcode the IDs we added to the JSON.
  const blogPosts = [1, 2, 3, 4, 5, 6].map(id => ({
    id,
    title: t(`Posts.${id - 1}.title`),
    excerpt: t(`Posts.${id - 1}.excerpt`),
    author: t(`Posts.${id - 1}.author`),
    date: '2024-03-15', // Hardcoded for now as it wasn't in JSON for all
    category: t(`Posts.${id - 1}.category`),
    readTime: t(`Posts.${id - 1}.readTime`),
    featured: id === 1,
    image: '/api/placeholder/600/400'
  }));

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('Hero.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('Hero.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full text-sm font-medium border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
              >
                {t(`Categories.${category}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('Featured.title')}</h2>
          </div>

          {blogPosts
            .filter(post => post.featured)
            .map(post => (
              <div key={post.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium">
                      {post.category}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(post.date).toLocaleDateString('es-ES')}
                    </span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {post.title}
                  </h3>

                  <p className="text-lg text-gray-600 mb-6">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{post.author}</span>
                    </div>

                    <Button>
                      {t('Featured.readArticle')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="order-1 lg:order-2">
                  <div className="aspect-video bg-gradient-to-br from-primary-100 to-purple-100 rounded-2xl flex items-center justify-center">
                    <Brain className="h-20 w-20 text-primary-600" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('Recent.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('Recent.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts
              .filter(post => !post.featured)
              .map(post => (
                <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-blue-600" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(post.date).toLocaleDateString('es-ES')}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                        <span className="text-sm text-gray-700">{post.author}</span>
                      </div>

                      <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              {t('Newsletter.title')}
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              {t('Newsletter.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('Newsletter.placeholder')}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button className="bg-white text-primary-600 hover:bg-gray-100">
                {t('Newsletter.button')}
              </Button>
            </div>

            <p className="text-sm text-primary-200 mt-4">
              {t('Newsletter.disclaimer')}
            </p>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('Topics.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('Topics.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('Topics.ai.title')}</h3>
              <p className="text-gray-600 mb-4">{t('Topics.ai.description')}</p>
              <span className="text-sm text-blue-600 font-medium">{t('Topics.ai.count')}</span>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('Topics.success.title')}</h3>
              <p className="text-gray-600 mb-4">{t('Topics.success.description')}</p>
              <span className="text-sm text-green-600 font-medium">{t('Topics.success.count')}</span>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('Topics.resources.title')}</h3>
              <p className="text-gray-600 mb-4">{t('Topics.resources.description')}</p>
              <span className="text-sm text-purple-600 font-medium">{t('Topics.resources.count')}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
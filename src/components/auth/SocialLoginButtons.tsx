'use client';

import { Button } from '@/components/ui/button';
import { Github, Chrome } from 'lucide-react';
import { trackEvent } from '@/components/Analytics';

interface SocialLoginButtonsProps {
  onSocialLogin?: (provider: string) => void;
}

export function SocialLoginButtons({ onSocialLogin }: SocialLoginButtonsProps) {
  const handleSocialLogin = (provider: string) => {
    trackEvent('login_attempt', { method: provider });
    if (onSocialLogin) {
      onSocialLogin(provider);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        className="w-full h-12 text-sm font-medium border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all"
        onClick={() => handleSocialLogin('google')}
      >
        <Chrome className="mr-3 h-5 w-5" />
        Continuar con Google
      </Button>
      
      <Button
        type="button"
        variant="outline"
        className="w-full h-12 text-sm font-medium border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all"
        onClick={() => handleSocialLogin('github')}
      >
        <Github className="mr-3 h-5 w-5" />
        Continuar con GitHub
      </Button>
    </div>
  );
}

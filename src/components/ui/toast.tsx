'use client';

import { Toast as ToastPrimitive } from '@base-ui/react/toast';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastVariant = 'success' | 'error' | 'info';

export const toastManager = ToastPrimitive.createToastManager();

export const toast = {
  success(title: string, description?: string) {
    return toastManager.add({
      title,
      description,
      type: 'success',
      priority: 'low',
      timeout: 4000,
    });
  },
  error(title: string, description?: string) {
    return toastManager.add({
      title,
      description,
      type: 'error',
      priority: 'high',
      timeout: 5500,
    });
  },
  info(title: string, description?: string) {
    return toastManager.add({
      title,
      description,
      type: 'info',
      priority: 'low',
      timeout: 4000,
    });
  },
};

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager();

  return (
    <ToastPrimitive.Portal>
      <ToastPrimitive.Viewport
        aria-label="Notifications"
        className="pointer-events-none fixed top-5 left-1/2 z-[100] flex w-full max-w-[440px] -translate-x-1/2 flex-col items-center gap-2.5 px-4 outline-none"
      >
        {toasts.map((item) => {
          const variant: ToastVariant =
            item.type === 'error'
              ? 'error'
              : item.type === 'info'
                ? 'info'
                : 'success';

          return (
            <ToastPrimitive.Root
              key={item.id}
              toast={item}
              swipeDirection={['up', 'right']}
              data-slot="toast"
              data-variant={variant}
              className={cn(
                'pointer-events-auto relative flex w-full items-start gap-3 rounded-[18px] border px-4 py-3.5 shadow-lg shadow-black/[0.08] backdrop-blur-xl transition-all duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[limited]:hidden data-[starting-style]:-translate-y-2 data-[starting-style]:scale-95 data-[starting-style]:opacity-0',
                variant === 'success' &&
                  'border-[#1b7f4b]/25 bg-[#f2fbf6]/95 text-[#135331]',
                variant === 'error' &&
                  'border-[#c92a2a]/25 bg-[#fff5f5]/95 text-[#9b1c1c]',
                variant === 'info' &&
                  'border-[var(--apple-hairline)] bg-white/95 text-[var(--apple-ink)]',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full',
                  variant === 'success' && 'bg-[#1b7f4b] text-white',
                  variant === 'error' && 'bg-[#c92a2a] text-white',
                  variant === 'info' && 'bg-[var(--apple-primary)] text-white',
                )}
              >
                {variant === 'success' ? (
                  <CheckCircle2 className="size-3.5" />
                ) : variant === 'error' ? (
                  <AlertCircle className="size-3.5" />
                ) : (
                  <Info className="size-3.5" />
                )}
              </span>

              <ToastPrimitive.Content className="min-w-0 flex-1 pr-1">
                <ToastPrimitive.Title
                  data-slot="toast-title"
                  className="text-[14px] leading-[1.35] font-semibold tracking-[-0.224px]"
                >
                  {item.title}
                </ToastPrimitive.Title>
                {item.description ? (
                  <ToastPrimitive.Description
                    data-slot="toast-description"
                    className={cn(
                      'mt-0.5 text-[13px] leading-[1.4] tracking-[-0.12px]',
                      variant === 'success' && 'text-[#1b6b40]',
                      variant === 'error' && 'text-[#b42323]',
                      variant === 'info' && 'text-[var(--apple-ink-muted-80)]',
                    )}
                  >
                    {item.description}
                  </ToastPrimitive.Description>
                ) : null}
              </ToastPrimitive.Content>

              <ToastPrimitive.Close
                aria-label="Close notification"
                data-slot="toast-close"
                className={cn(
                  'inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors',
                  variant === 'success' &&
                    'text-[#1b6b40]/80 hover:bg-[#1b7f4b]/12 hover:text-[#135331]',
                  variant === 'error' &&
                    'text-[#b42323]/80 hover:bg-[#c92a2a]/12 hover:text-[#9b1c1c]',
                  variant === 'info' &&
                    'text-[var(--apple-ink-muted-48)] hover:bg-[var(--apple-divider-soft)] hover:text-[var(--apple-ink)]',
                )}
              >
                <X aria-hidden="true" className="size-3.5" />
              </ToastPrimitive.Close>
            </ToastPrimitive.Root>
          );
        })}
      </ToastPrimitive.Viewport>
    </ToastPrimitive.Portal>
  );
}

export function Toaster() {
  return (
    <ToastPrimitive.Provider toastManager={toastManager} timeout={4000} limit={3}>
      <ToastList />
    </ToastPrimitive.Provider>
  );
}

'use client';

import { cn } from '@/lib/utils';
import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';
import Link from 'next/link';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div
      className={cn('flex flex-col gap-0', className)}
      style={{ fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", Tahoma, sans-serif', fontSize: '11px' }}
      {...props}
    >
      {/* Window Chrome */}
      <div
        style={{
          border: '2px solid',
          borderColor: '#ffffff #808080 #808080 #ffffff',
          boxShadow: '1px 1px 0px #000000',
          background: '#d4d0c8',
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            background: 'linear-gradient(to right, #000080, #1084d0)',
            padding: '3px 6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            userSelect: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Windows icon */}
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <rect x="1" y="1" width="6" height="6" fill="#ff0000" />
              <rect x="9" y="1" width="6" height="6" fill="#00ff00" />
              <rect x="1" y="9" width="6" height="6" fill="#0000ff" />
              <rect x="9" y="9" width="6" height="6" fill="#ffff00" />
            </svg>
            <span style={{ color: '#ffffff', fontWeight: 'bold', fontSize: '11px' }}>
              Вход в систему
            </span>
          </div>
          {/* Window controls */}
          <div style={{ display: 'flex', gap: '2px' }}>
            {['_', '□', '✕'].map((sym, i) => (
              <button
                key={i}
                aria-hidden="true"
                tabIndex={-1}
                style={{
                  width: '16px',
                  height: '14px',
                  background: '#d4d0c8',
                  border: '1px solid',
                  borderColor: '#ffffff #808080 #808080 #ffffff',
                  color: '#000000',
                  fontSize: '9px',
                  cursor: 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1,
                  padding: 0,
                }}
              >
                {sym}
              </button>
            ))}
          </div>
        </div>

        {/* Window Body */}
        <div style={{ padding: '12px 16px 16px' }}>
          {/* Logo / Header area */}
          <div
            style={{
              border: '2px solid',
              borderColor: '#808080 #ffffff #ffffff #808080',
              background: '#ffffff',
              padding: '10px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            {/* Windows 2000 style logo block */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', flexShrink: 0 }}>
              <div style={{ width: '18px', height: '18px', background: '#ff0000' }} />
              <div style={{ width: '18px', height: '18px', background: '#00aa00' }} />
              <div style={{ width: '18px', height: '18px', background: '#0000ff' }} />
              <div style={{ width: '18px', height: '18px', background: '#ffcc00' }} />
            </div>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#000080' }}>BloggerFeed</div>
              <div style={{ fontSize: '10px', color: '#444444' }}>Введите учётные данные для входа</div>
            </div>
          </div>

          <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Username field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <label htmlFor="username" style={{ color: '#000000', fontSize: '11px' }}>
                Логин:
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="emilys"
                required
                disabled={isPending}
                style={{
                  border: '2px solid',
                  borderColor: '#808080 #ffffff #ffffff #808080',
                  background: '#ffffff',
                  padding: '2px 4px',
                  fontSize: '11px',
                  color: '#000000',
                  outline: 'none',
                  height: '22px',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Password field */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <label htmlFor="password" style={{ color: '#000000', fontSize: '11px' }}>
                Пароль:
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                disabled={isPending}
                style={{
                  border: '2px solid',
                  borderColor: '#808080 #ffffff #ffffff #808080',
                  background: '#ffffff',
                  padding: '2px 4px',
                  fontSize: '11px',
                  color: '#000000',
                  outline: 'none',
                  height: '22px',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Error message */}
            {errorMessage && (
              <div
                style={{
                  border: '2px solid',
                  borderColor: '#808080 #ffffff #ffffff #808080',
                  background: '#fff0f0',
                  padding: '4px 8px',
                  fontSize: '11px',
                  color: '#cc0000',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {/* Warning icon */}
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" flexShrink="0">
                  <polygon points="8,1 15,14 1,14" fill="#ffff00" stroke="#000000" strokeWidth="1" />
                  <text x="8" y="12" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#000000">!</text>
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Horizontal separator */}
            <div
              style={{
                borderTop: '1px solid #808080',
                borderBottom: '1px solid #ffffff',
                margin: '4px 0',
              }}
            />

            {/* Buttons row */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
              <Win2kButton type="submit" disabled={isPending} primary>
                {isPending ? 'Вход...' : 'OK'}
              </Win2kButton>
              <Win2kButton type="button" asLink href="/">
                Отмена
              </Win2kButton>
            </div>
          </form>

          {/* Hint area */}
          <div
            style={{
              marginTop: '10px',
              border: '2px solid',
              borderColor: '#808080 #ffffff #ffffff #808080',
              background: '#ffffd0',
              padding: '6px 8px',
              fontSize: '10px',
              color: '#444444',
            }}
          >
            <strong>Подсказка:</strong> логин <strong>emilys</strong>, пароль <strong>emilyspass</strong>
          </div>
        </div>
      </div>

      {/* Taskbar-style bottom */}
      <div
        style={{
          background: '#d4d0c8',
          borderTop: '2px solid #ffffff',
          padding: '3px 8px',
          fontSize: '10px',
          color: '#444444',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          boxShadow: '0 1px 0 #808080',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="8" cy="8" r="7" fill="#000080" />
          <text x="8" y="12" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">i</text>
        </svg>
        Требуется авторизация для доступа
      </div>
    </div>
  );
}

/* Windows 2000 style button component */
function Win2kButton({
  children,
  type = 'button',
  disabled = false,
  primary = false,
  asLink,
  href,
  onClick,
}: {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  primary?: boolean;
  asLink?: boolean;
  href?: string;
  onClick?: () => void;
}) {
  const style: React.CSSProperties = {
    minWidth: '72px',
    height: '23px',
    padding: '0 10px',
    background: '#d4d0c8',
    border: '2px solid',
    borderColor: disabled
      ? '#808080 #808080 #808080 #808080'
      : '#ffffff #808080 #808080 #ffffff',
    boxShadow: disabled ? 'none' : '1px 1px 0px #000000',
    fontSize: '11px',
    color: disabled ? '#808080' : '#000000',
    cursor: disabled ? 'default' : 'pointer',
    fontFamily: '"MS Sans Serif", "Microsoft Sans Serif", Tahoma, sans-serif',
    outline: primary ? '1px dotted #000000' : 'none',
    outlineOffset: '-4px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
  };

  if (asLink && href) {
    return (
      <Link href={href} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} style={style} onClick={onClick}>
      {children}
    </button>
  );
}

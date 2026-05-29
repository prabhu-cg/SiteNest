# SiteNest Auth Documentation

## Stack

Email/password auth via Supabase. No OAuth, no magic links, no social providers.

Key files:
- `src/store/authStore.ts` — sign in / sign up / sign out actions, user state
- `src/components/providers/AuthProvider.tsx` — session restore on mount, `onAuthStateChange` listener
- `src/app/auth/page.tsx` — sign in / sign up UI
- `src/app/layout.tsx` — `AuthProvider` wraps the app

---

## Duplicate email signup

Supabase behavior depends on whether **email confirmation is enabled** in project settings:

**Confirmation enabled (default):**
Supabase does not return an error. It silently sends an email to the existing address and returns `{ data: { user, session: null }, error: null }`. Our code sees `!data.session → needsConfirmation = true` and shows the "Check your email" screen. The existing account is untouched. This is intentional — Supabase avoids revealing whether an address is registered.

**Confirmation disabled:**
Supabase returns `error.message = "User already registered"`. Our code catches it, sets `error` in the store, and the red error banner appears on the auth page.

---

## Full auth flow

### Sign Up

| Step | Where | What happens |
|------|-------|--------------|
| Client validates | `auth/page.tsx` | Email format (`type="email"`) + password `minLength={6}` enforced by browser |
| Supabase validates | Server | Email format, password ≥ 6 chars (server-enforced too) |
| Duplicate email | Server | Silently re-sends confirmation (if confirm on) or errors with "User already registered" (if confirm off) |
| Success + confirm on | Store | `user = null`, returns `{ needsConfirmation: true }` → "Check your email" UI |
| Success + confirm off | Store | `user = data.user`, session created → redirects to `/` |
| Error | Store | `error` set → red banner shown, `isLoading` cleared |

Clicking the confirmation link activates the account. Supabase fires `onAuthStateChange` in `AuthProvider`, which sets `user` in the store. If the user is on the auth page, the `useEffect` redirect fires and sends them to `/`.

### Sign In

| Step | Where | What happens |
|------|-------|--------------|
| Client validates | `auth/page.tsx` | Email format + non-empty password |
| Supabase validates | Server | Checks credentials |
| Wrong credentials | Store | `error = "Invalid login credentials"` (same message for wrong password and unknown email — Supabase doesn't reveal which) |
| Email not confirmed | Store | `error = "Email not confirmed"` |
| Success | Store | `user = data.user`, session stored in `localStorage` → redirects to `/` |

### Sign Out

Calls `supabase.auth.signOut()` which clears the session from `localStorage` and revokes the refresh token server-side. `onAuthStateChange` fires with `session = null`, setting `user = null` in the store. The auth guard in `page.tsx` redirects to `/auth`.

### Session persistence (`AuthProvider`)

On every mount, `supabase.auth.getSession()` checks `localStorage` for a stored session. If found and not expired, `user` is restored — no re-login needed. `onAuthStateChange` listens for token refreshes (handled automatically by Supabase), sign-outs, and tab-focus events.

---

## Auth guards

Both protected routes check auth state and redirect unauthenticated users to `/auth`:

```tsx
// src/app/page.tsx and src/app/editor/[projectId]/page.tsx
useEffect(() => {
  if (!authLoading && !user) router.replace('/auth');
}, [user, authLoading, router]);
```

While `authLoading` is true (session being restored), a spinner is shown instead of the page content.

---

## Limits

| Limit | Value | Source |
|-------|-------|--------|
| Password minimum length | 6 characters | Supabase default (also enforced in UI) |
| Sign-up rate limit | 3 requests / hour per IP | Supabase free tier default |
| Email send rate | 30 emails / hour per project | Supabase free tier default |
| Confirmation resend cooldown | 60 seconds | Supabase default |
| Access token (JWT) expiry | 1 hour | Supabase default |
| Refresh token expiry | 7 days (rolling) | Supabase default |

---

## Not implemented

- Password reset / forgot password flow
- Email change or account deletion
- CAPTCHA / bot protection
- Password strength enforcement beyond 6-character minimum
- Email allowlist / domain restriction
- OAuth / social login

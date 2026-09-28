import type { Context } from 'koa';

/**
 * Policy: protect-slug (Page)
 * Prevents changing `slug` via Content API for restricted roles.
 */
export default async function protectSlug(ctx: Context) {
  const method = ctx.method.toUpperCase();
  if (!['POST', 'PUT', 'PATCH'].includes(method)) return true;

  const body = (ctx.request as any).body ?? {};
  const hasDataWrapper = body && typeof body === 'object' && 'data' in body && body.data && typeof body.data === 'object';
  const target = hasDataWrapper ? body.data : body;

  // Users & Permissions role
  const upRole = (ctx.state as any)?.user?.role;
  const upIsRestricted = !!upRole && (
    (typeof upRole.type === 'string' && ['editor','author'].includes(upRole.type.toLowerCase())) ||
    (typeof upRole.name === 'string' && ['editor','author'].includes(upRole.name.toLowerCase()))
  );

  // Admin roles
  const adminRoles = (ctx.state as any)?.user?.roles;
  const adminIsRestricted = Array.isArray(adminRoles) && adminRoles.some((r: any) => {
    const code = (r?.code || r?.name || '').toString().toLowerCase();
    return code.includes('editor') || code.includes('author');
  });

  const isRestrictedRole = upIsRestricted || adminIsRestricted;

  if (target && typeof target === 'object' && ('slug' in target)) {
    if (isRestrictedRole) {
      delete (target as any).slug;
      if (hasDataWrapper) {
        (ctx.request as any).body.data = target;
      } else {
        (ctx.request as any).body = target;
      }
      ctx.state.slugStripped = true;
      ctx.throw(403, 'Authors and Editors are not allowed to modify the slug field.');
    }
  }

  return true;
}

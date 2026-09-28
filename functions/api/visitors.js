/**
 * Cloudflare Pages Function: GET /api/visitors
 *
 * The VISITOR_COUNTER D1 binding is configured in the Cloudflare Pages
 * dashboard. Every successful request increments and returns the counter.
 */
export async function onRequestGet(context) {
  try {
    const result = await context.env.VISITOR_COUNTER
      .prepare('UPDATE visitor_counter SET count = count + 1 WHERE id = 1 RETURNING count')
      .first();

    if (!result) {
      return Response.json(
        { error: 'Visitor counter has not been initialized.' },
        { status: 503, headers: { 'Cache-Control': 'no-store' } },
      );
    }

    return Response.json(
      { count: result.count },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (error) {
    console.error('Visitor counter error', error);
    return Response.json(
      { error: 'Visitor counter is unavailable.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}

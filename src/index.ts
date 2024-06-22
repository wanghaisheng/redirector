/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// get the domain of the request
		// eg example.com, www.example.com, sub.example.com
		const domain = new URL(request.url).hostname;
		// check if the domain is in the KV namespace
		const rules = env.RULES;
		const rule = await rules.get(domain);
		// if the rule exists, permanently redirect to the new domain
		if (rule) {
			return Response.redirect(rule, 301);
		}
		// otherwise, return a 404
		return new Response('Not Found', { status: 404 });
	},
} satisfies ExportedHandler<Env>;

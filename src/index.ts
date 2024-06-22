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

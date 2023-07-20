export default async function (ctx) {
  await ctx.store.dispatch('challenges/loadChallenges');
  return true;
}
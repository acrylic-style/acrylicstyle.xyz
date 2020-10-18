barba.use(barbaPrefetch);

barba.init({
  views: [
    {
      namespace: 'repos',
      afterEnter() {
        refetchRepos();
        snowStorm.stop();
      },
    }
  ]
});

console.log(`Initialized barba for ${location.href}`)

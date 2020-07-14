<template>
  <v-carousel class="rounded-card2" hide-delimiters height="650" :show-arrows-on-hover="true">
    <v-carousel-item
      @click="$router.push('/game/' + 'g_271590')"
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>


<script>
export default {
  data() {
    return {
      items: [
        {
          src:
            "https://cdn.vox-cdn.com/thumbor/ALObOjAcJ3a_Vop_IYD7_yc8kZE=/85x0:1014x619/1200x800/filters:focal(85x0:1014x619)/cdn.vox-cdn.com/assets/2894725/V_OGV_1280x720.jpg"
        },
        {
          src:
            "https://www.oficinadanet.com.br/imagens/post/13969/750xNxcapa-gtav-pc.jpg.pagespeed.ic.f96fd2bf56.jpg"
        },
        {
          src:
            "https://s2.glbimg.com/AntVGwBl_jwH450Ey59jyieFzoo=/0x0:695x391/1000x0/smart/filters:strip_icc()/s.glbimg.com/po/tt2/f/original/2015/04/29/splash4.jpg"
        }
      ]
    };
  }
};
</script>

<style scoped>
.rounded-card2 {
  border-top-left-radius: 10px !important;
  border-bottom-left-radius: 10px !important;
}
</style>


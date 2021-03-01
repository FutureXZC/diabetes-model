<template>
<iframe id="show-iframe"  frameborder=0 scrolling=auto src="http://127.0.0.1:3000/map"></iframe>
</template>

<script>
export default {
  name: 'map',
  mounted(){
    const oIframe = document.getElementById('show-iframe');
    const deviceWidth = document.documentElement.clientWidth;
    const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.width = deviceWidth + 'px';
    oIframe.style.height = deviceHeight + 'px';
  }
}
</script>

<style>

</style>
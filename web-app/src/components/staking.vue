<template>
    <token/>
</template>
 
<script>
import Token from '@/components/token'
export default {
 name: 'staking',
 beforeCreate () {
    console.log('registerWeb3 Action dispatched from casino-dapp.vue')
    this.$store.dispatch('registerWeb3')
  },
 components: {
    'token': Token
 }
}
</script>
 
<style scoped>
 
</style>

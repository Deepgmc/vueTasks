<template>
   <ul class="sidenav app-sidenav" v-bind:class="{open: value}">
      <router-link
         v-for="link in links"
         v-bind:key="link.url"
         tag="li"
         active-class="active"
         v-bind:to="link.url"
         v-bind:exact="link.exact"
      >
         <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
      </router-link>
   </ul>
</template>

<script>
export default {
   props: ['value'],
   data: () => ({
      links: [
         {title: 'Счет', url: '/', exact: true},
         {title: 'История', url: '/history', exact: false},
         {title: 'Планирование', url: '/planning', exact: false},
         {title: 'Новая запись', url: '/record', exact: false},
         {title: 'Категории', url: '/categories', exact: false}
      ]
   })
}
</script>

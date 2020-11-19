import Vue from "vue";

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    metaInfo?: () => any;
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $page: any;
    $metaInfo: any;
    $static: any;
    $route: any;
  }
}

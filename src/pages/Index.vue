<template>
  <Layout>
    <div class="pt-8 md:pt-16">
      <div class="flex flex-col items-center">
        <div class="flex flex-col items-center mb-2 text-ui-primary">
          <h2 class="lab5e mt-10 mb-6 text-center text-6xl">
            <span>lab</span>
            <span class="font-bold text-red-600">5</span>
            <span>e</span>
          </h2>
        </div>
        <h1 class="text-4xl text-center lg:text-5xl">
          Documentation
        </h1>
        <p class="text-xl font-medium text-center">
          We at take pride in great documentation so you can get started as
          quickly and painlessly as possible.
        </p>

        <div class="flex justify-center mt-8">
          <g-link
            to="/docs/"
            class="flex items-center px-6 py-4 ml-auto text-2xl font-bold leading-none text-white border rounded-lg shadow-lg bg-ui-primary border-ui-primary transition-all duration-200 ease-out transform hover:shadow-xl hover:-translate-y-1"
          >
            Get started
            <ArrowRightCircleIcon class="ml-4" size="1x" />
          </g-link>
        </div>
      </div>

      <div
        class="pt-8 mx-auto mt-8 border-t md:mt-16 md:pt-16 border-top border-ui-border max-w-screen-sm"
      ></div>

      <div class="flex flex-wrap justify-center -mx-4">
        <div
          class="flex flex-col items-center w-full px-4 mb-8 text-center md:w-1/2"
        >
          <BoxIcon size="3x" class="mb-6 text-ui-primary" />
          <h3 class="font-bold tracking-wide uppercase text-ui-primary">
            Span
          </h3>
          <p class="text-lg text-left">
            Our IoT Platform which takes care of data traffic from your device
            to your service.
          </p>
        </div>

        <div
          class="flex flex-col items-center w-full px-4 mb-8 text-center md:w-1/2"
        >
          <NavigationIcon size="3x" class="mb-6 text-ui-primary" />
          <h3 class="font-bold tracking-wide uppercase text-ui-primary">
            Places
          </h3>
          <p class="text-lg text-left">
            Our up and coming geopositional service which you can use along side
            with Span to enrich your IoT with positioning events.
          </p>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Logo from "@/components/Logo";
import {
  ArrowRightCircleIcon,
  NavigationIcon,
  MoonIcon,
  BoxIcon,
} from "vue-feather-icons";

export default {
  components: {
    Logo,
    ArrowRightCircleIcon,
    NavigationIcon,
    MoonIcon,
    BoxIcon,
  },

  metaInfo() {
    const title = "Lab5e documentation";
    const description =
      "Get your documentation here for lab5e products such as Span, Places and more.";

    return {
      title: title,
      meta: [
        {
          name: "description",
          content: description,
        },
        {
          key: "og:title",
          property: "og:title",
          content: title,
        },
        {
          key: "twitter:title",
          property: "twitter:title",
          content: title,
        },
        {
          key: "og:description",
          property: "og:description",
          content: description,
        },
        {
          key: "twitter:description",
          property: "twitter:description",
          content: description,
        },
      ],
    };
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}

.lab5e {
  font-size: 7rem;
}
</style>

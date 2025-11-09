export default defineAppConfig({
  shadcnDocs: {
    site: {
      name: "Merica Me",
      description:
        "Beautiful.",
    },
    theme: {
      customizable: true,
      color: "slate",
      radius: 0.5,
    },
    header: {
      title: "shadcn-docs-starter",
      showTitle: true,
      darkModeToggle: true,
      languageSwitcher: {
        enable: false,
        triggerType: "icon",
        dropdownType: "select",
      },
      logo: {
        light: "/logo.svg",
        dark: "/logo-dark.svg",
      },
      nav: [],
      links: [
        {
          icon: "lucide:github",
          to: "https://github.com/isbrandonw/merica-cc.git",
          target: "_blank",
        },
      ],
    },
    aside: {
      useLevel: true,
      collapse: false,
    },
    main: {
      breadCrumb: true,
      showTitle: true,
    },
    footer: {
      credits: "Copyright © 2024",
      links: [
        {
          icon: "lucide:github",
          to: "https://github.com/ZTL-UwU/shadcn-docs-nuxt",
          target: "_blank",
        },
      ],
    },
    toc: {
      enable: true,
      links: [
        {
          title: "Star on GitHub",
          icon: "lucide:star",
          to: "https://github.com/isbrandonw/merica-cc.git",
          target: "_blank",
        },
        {
          title: "Create Issues",
          icon: "lucide:circle-dot",
          to: "https://github.com/isbrandonw/merica-cc.git/issues",
          target: "_blank",
        },
      ],
    },
    search: {
      enable: true,
      inAside: false,
    },
  },
});

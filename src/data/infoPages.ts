import type { Locale } from "@/i18n/config";

export type InfoPageId = "about" | "privacy";

type InfoPageSection = {
  heading: string;
  body: string;
  kind?: "contact";
};

export type InfoPageContent = {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  lede: string;
  sections: InfoPageSection[];
};

export const contactEmail = "tjm.mosquito@gmail.com";
export const xHandle = "msdos41_";

export const infoPageContent: Record<Locale, Record<InfoPageId, InfoPageContent>> = {
  en: {
    about: {
      title: "About",
      description: "About Just One Sip — a daily cocktail poster.",
      eyebrow: "About",
      heading: "One cocktail, staged daily",
      lede: "Just One Sip serves one drink, one visual, one recipe each day. No database to browse, no endless scrolling. Open the page and a new poster-worthy cocktail is waiting.",
      sections: [
        {
          heading: "The Idea",
          body: "Each day's pick follows your local date. Past pours live in the archive whenever you want another look.",
        },
        {
          heading: "Contact",
          kind: "contact",
          body: "Questions or suggestions? Reach out:",
        },
        {
          heading: "Responsible Drinking",
          body: "This site is for inspiration and enjoyment. Drink responsibly, know your limit, and never drink and drive.",
        },
      ],
    },
    privacy: {
      title: "Privacy",
      description: "Privacy policy for Just One Sip.",
      eyebrow: "Privacy",
      heading: "No account, no hidden collection",
      lede: "Just One Sip is a static site. No sign-up required, no user database, no personal data stored on any server.",
      sections: [
        {
          heading: "Your Data",
          body: "We do not collect or store personal data beyond what you choose to share through linked services.",
        },
        {
          heading: "Analytics",
          body: "We use Google Analytics (GA4) for anonymous traffic patterns only. Data is anonymised and used solely to improve the site.",
        },
        {
          heading: "Social Sharing",
          body: "Share buttons link to X and Reddit. Your interaction is governed by their privacy policies. No data is sent until you click.",
        },
        {
          heading: "Future Changes",
          body: "If newsletters, affiliate links, or advertising are added, this policy will be updated. Check back if you have concerns.",
        },
      ],
    },
  },
  "zh-CN": {
    about: {
      title: "关于",
      description: "关于 Just One Sip — 每日一杯鸡尾酒海报。",
      eyebrow: "关于",
      heading: "每日一杯，即兴上演",
      lede: "Just One Sip 每天呈现一杯酒、一张视觉、一份配方。无需浏览数据库，无需无尽滚动。打开页面，便有一杯全新的海报级鸡尾酒在等你。",
      sections: [
        {
          heading: "理念",
          body: "每日推荐由你的本地日期决定。往期作品可在归档中随时回顾。",
        },
        {
          heading: "联系方式",
          kind: "contact",
          body: "有问题或建议？欢迎联系：",
        },
        {
          heading: "理性饮酒",
          body: "本站仅为提供灵感与乐趣。请理性饮酒，了解自己的限度，切勿酒后驾车。",
        },
      ],
    },
    privacy: {
      title: "隐私",
      description: "Just One Sip 的隐私政策。",
      eyebrow: "隐私",
      heading: "无需注册，绝不窥探",
      lede: "Just One Sip 是一个静态站点。无需注册，无用户数据库，无服务器端的个人数据存储。",
      sections: [
        {
          heading: "您的数据",
          body: "除您通过关联服务主动分享外，本站不收集或存储任何个人数据。",
        },
        {
          heading: "分析工具",
          body: "我们使用 Google Analytics (GA4) 仅收集匿名流量数据，用于改进站点体验。",
        },
        {
          heading: "社交分享",
          body: "分享按钮链接至 X 和 Reddit。您的操作受其隐私政策约束。本站不会主动发送任何数据。",
        },
        {
          heading: "未来变更",
          body: "如增加新闻通讯、推广链接或广告等功能，本政策将相应更新。定期查看以了解变化。",
        },
      ],
    },
  },
};

export function getInfoPageContent(locale: Locale, pageId: InfoPageId): InfoPageContent {
  return infoPageContent[locale][pageId];
}

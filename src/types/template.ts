
export interface Template {
  id: string;
  title: string;
  description: string;
  content: string;
}

export interface TemplateGroup {
  title: string;
  templates: Template[];
}

export const legalTemplates: TemplateGroup[] = [
  {
    title: "আদালত সংক্রান্ত",
    templates: [
      {
        id: "bail",
        title: "জামিনের আবেদন",
        description: "ক্রিমিনাল কেসে জামিনের জন্য আবেদন",
        content: `
          <h1>জামিনের আবেদন</h1>
          <p>বরাবর,</p>
          <p>মহামান্য আদালত,</p>
          <p>ঢাকা, বাংলাদেশ।</p>
          <br/>
          <p>বিষয়ঃ জামিনের আবেদন প্রসঙ্গে।</p>
          <br/>
          <p>মহোদয়,</p>
          <p>বিনীত নিবেদন এই যে...</p>
        `
      },
      {
        id: "affidavit",
        title: "হলফনামা",
        description: "সাধারণ হলফনামা টেমপ্লেট",
        content: `
          <h1>হলফনামা</h1>
          <p>আমি, .................., পিতা: ..................</p>
          <p>স্থায়ী ঠিকানা: ..................</p>
          <p>শপথপূর্বক ঘোষণা করিতেছি যে,</p>
        `
      }
    ]
  },
  {
    title: "চুক্তি ও দলিল",
    templates: [
      {
        id: "lease",
        title: "ভাড়ার চুক্তিপত্র",
        description: "বাড়ি/দোকান ভাড়ার চুক্তি",
        content: `
          <h1>ভাড়ার চুক্তিপত্র</h1>
          <p>এই চুক্তিপত্র লিখিত ও সম্পাদিত হইল:</p>
          <br/>
          <p>ভাড়াটিয়ার নাম: ..................</p>
          <p>বাড়িওয়ালার নাম: ..................</p>
        `
      }
    ]
  }
];

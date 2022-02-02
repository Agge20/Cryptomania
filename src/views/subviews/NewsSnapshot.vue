<template>
  <section class="mt-64 flex flex-col items-center justify-center">
    <LargeHeader :text="{ data: 'Latest News' }" />
    <span v-if="error" class="mx-auto text-theme_red text-2xl">{{
      error
    }}</span>
    <div v-if="loading">loading articles...</div>
    <div class="flex flex-wrap content-start justify-center">
      <div v-if="!loading" v-for="article in newsData" class="m-4">
        <NewsCard :article="article" :animate="true" />
      </div>
    </div>
  </section>
</template>

<script>
import { watchEffect, ref } from "@vue/runtime-core";
// components
import NewsCard from "../../components/news/NewsCard.vue";
import LargeHeader from "../../components/headers/LargeHeader.vue";
// hooks
import useGetNews from "../../hooks/get/news/useGetNews";

export default {
  components: {
    NewsCard,
    LargeHeader,
  },
  setup() {
    const { newsSnapshot, getNewsSnapshot, loading, error } = useGetNews();
    const newsData = ref([
      {
        title:
          "Russian region struggles to keep up with Bitcoin mining energy demands",
        desc: "A local energy distributor is working to recover about $800,000 from illicit cryptocurrency miners in Irkutsk Oblast.",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvNjAwZTJiOTYtMjFiNi00ZWE3LWEzNmEtODkyMGRhYzY5MTNmLmpwZw==.jpg",
        url: "https://cointelegraph.com/news/russian-region-struggles-to-keep-up-with-bitcoin-mining-energy-demands",
        date: "Wed, 02 Feb 2022 13:54:31",
        author: "",
      },
      {
        title:
          "All the world’s Bitcoin can only pay 2.43% of $30T US national debt",
        desc: "The latest grim milestone for the U.S. economy means that its national debt total is now 4,000% larger than the Bitcoin market cap.",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvZjA0MGNiNTYtMDE1Yi00Yjg3LThlZTUtNjFmYmY1MDAyM2RmLmpwZw==.jpg",
        url: "https://cointelegraph.com/news/all-the-world-s-bitcoin-can-only-pay-2-43-of-30t-us-national-debt",
        date: "Wed, 02 Feb 2022 13:27:34",
        author: "",
      },
      {
        title:
          "Crypto tax doesn't legalize trading, says Indian tax department chief ",
        desc: "The Indian tax department head said crypto taxation will help the department evaluate the exact depth of the digital asset market.",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvMDZmMDRiZDItNDYxYi00YTBhLWE2MTMtZDdkNDhkMGYzOGFkLmpwZw==.jpg",
        url: "https://cointelegraph.com/news/crypto-tax-doesn-t-legalize-trading-says-indian-tax-department-chief",
        date: "Wed, 02 Feb 2022 12:29:37",
        author: "",
      },
      {
        title:
          "Why did WazirX token (WRX) jump 30% after India announced its big crypto tax?",
        desc: "The Indian government said that it does not treat cryptocurrencies as illegal, clarifying that its transactions remain in a grey area.",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvYTM2ZmZjZGEtNDRhNy00NzkyLWE4OGYtMjM1OGFiNWQzNWQxLmpwZw==.jpg",
        url: "https://cointelegraph.com/news/why-did-wazirx-token-wrx-jump-30-after-india-announced-its-big-crypto-tax",
        date: "Wed, 02 Feb 2022 12:13:32",
        author: "",
      },
      {
        title: "Alphabet exploring blockchain technology for flagship services",
        desc: "Google's parent company is reportedly exploring applying emerging tech to its main products and services.",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvZGM4NzI0MTMtOGQzMy00ZWI4LTliOWYtN2Q4ODUxODZlYmM5LmpwZw==.jpg",
        url: "https://cointelegraph.com/news/alphabet-exploring-blockchain-technology-for-flagship-services",
        date: "Wed, 02 Feb 2022 12:07:22",
        author: "",
      },
      {
        title:
          "US bobsledder feels the Bitcoin rhythm and orange pills his fans ",
        desc: "Johnny Quinn, a U.S. Olympic bobsledder and former football player, is the latest celebrity to join the Bitcoin bandwagon.",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvZDNmOTU3NWEtZDMwZi00OWE5LWEyNDktNjA4NGQ0MmZlOGI0LmpwZw==.jpg",
        url: "https://cointelegraph.com/news/us-bobsledder-feels-the-bitcoin-rhythm-and-orange-pills-his-fans",
        date: "Wed, 02 Feb 2022 11:30:00",
        author: "",
      },
      {
        title:
          "Hodlers beware! New malware targets MetaMask and 40 other crypto wallets",
        desc: "Users have been warned against a new malware designed to steal crypto from browser extension wallets such as MetaMask and Coinbase Wallet.",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvNWFjNDkxOWYtNTgwMC00ODBjLWE4N2UtNmEwNDM0MzExMGI0LmpwZw==.jpg",
        url: "https://cointelegraph.com/news/hodlers-beware-new-malware-targets-metamask-and-40-other-crypto-wallets",
        date: "Wed, 02 Feb 2022 10:23:56",
        author: "",
      },
      {
        title:
          "BTC price faces crucial trend battle as Bitcoin RSI confirms breakout",
        desc: "Bulls have something to celebrate after a classic on-chain metric prints its first major divergence in months.",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvYjdiYTc0YWQtNTJlYy00ZDg3LTg3MWUtYTE2N2FiNzkzZWJjLmpwZw==.jpg",
        url: "https://cointelegraph.com/news/btc-price-faces-crucial-trend-battle-as-bitcoin-rsi-confirms-breakout",
        date: "Wed, 02 Feb 2022 10:09:14",
        author: "",
      },
      {
        title:
          "Diem stablecoin co-founder praises Bitcoin for censorship resistance",
        desc: "Meta’s Diem co-creator, David Marcus, said that he was a “big fan of Bitcoin,” calling it digital gold back in 2019. ",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvZDkzMWRlNDYtZjRjOC00MmZlLTlhMGYtNzVhMWY4MGVhM2FjLmpwZw==.jpg",
        url: "https://cointelegraph.com/news/diem-stablecoin-co-founder-praises-bitcoin-for-censorship-resistance",
        date: "Wed, 02 Feb 2022 10:05:20",
        author: "",
      },
      {
        title: "Colombia clamps down on crypto tax evasion as adoption thrives",
        desc: "Colombia’s tax authority is tightening the screw on Bitcoin and cryptocurrency-related tax evasion against a backdrop of burgeoning cryptocurrency adoption.",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvNTlhMTk4NDUtZDYzZS00ZWM3LThmZjUtZmU1ZTA5ZjZiZDA5LmpwZw==.jpg",
        url: "https://cointelegraph.com/news/colombia-clamps-down-on-crypto-tax-evasion-as-adoption-thrives",
        date: "Wed, 02 Feb 2022 09:50:51",
        author: "",
      },
      {
        title:
          "MicroStrategy lost $146M to Bitcoin impairment charges in Q4 2021",
        desc: "MicroStrategy currently holds a total of 125,051 BTC acquired for $3.78 billion at an average price of $30,200 per Bitcoin.",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvMjJiYmJjODItODNiNC00MDE5LWI4OGYtYzgyZTc4Y2E3MDAxLmpwZw==.jpg",
        url: "https://cointelegraph.com/news/microstrategy-lost-146m-to-bitcoin-impairment-charges-in-q4-2021",
        date: "Wed, 02 Feb 2022 08:45:05",
        author: "",
      },
      {
        title: "FTX acquires Japan's FCA-licensed crypto exchange Liquid",
        desc: "As a part of the deal to comply with Japanese laws, FTX's Japanese users will be moved Quoine's trading platform.",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvNTQ4MDg3NDAtNmNkMi00NTc0LTg3MjctNzEwZDM4NzVhZDI4LmpwZw==.jpg",
        url: "https://cointelegraph.com/news/ftx-acquires-japan-s-fca-licensed-crypto-exchange-liquid",
        date: "Wed, 02 Feb 2022 08:22:50",
        author: "",
      },
      {
        title:
          "Nifty News: Coachella lifetime pass, WildEarth’s wildlife, Worms ditches NFTs after backlash ",
        desc: "The Worms franchise won’t be coming to the blockchain anymore, WildEarth TV has launched NFTs to support wildlife conservation and Rick Flair is set to be tokenized. ",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvNTM0OWNmNzAtZTg3NC00ZGIyLWEyOTUtMTU2OTg3MWM3ZjY3LmpwZw==.jpg",
        url: "https://cointelegraph.com/news/nifty-news-coachella-lifetime-pass-wildearth-s-wildlife-worms-ditches-nfts-after-backlash",
        date: "Wed, 02 Feb 2022 05:59:09",
        author: "",
      },
      {
        title:
          "Kiss this: You can buy Gene Simmons’ Las Vegas mansion with crypto",
        desc: "The Israeli-American musician has been a long-time supporter of crypto, and says he will accept payments in a number of cryptocurrencies including BTC, ETH, and LTC for the sale of his $13.5 million Nevada mansion. ",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvNGY4OWMxNTctODVlNS00NTAxLWE0YzMtMTBjZGYyZWQwMDIwLmpwZw==.jpg",
        url: "https://cointelegraph.com/news/kiss-this-you-can-buy-gene-simmons-las-vegas-mansion-with-crypto",
        date: "Wed, 02 Feb 2022 04:58:36",
        author: "",
      },
      {
        title:
          "Tezos transactions and smart contract activity surge on NFT demand",
        desc: "Smart contract activity in the Tezos ecosystem has surged over the past year as it becomes a magnet for NFT activity.",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvY2JiMDc5NjYtZDk0NS00ZTQ2LTk4MzYtOWMxZDlhYmZjYmI5LmpwZw==.jpg",
        url: "https://cointelegraph.com/news/tezos-transactions-and-smart-contract-activity-surge-on-nft-demand",
        date: "Wed, 02 Feb 2022 04:45:01",
        author: "",
      },
      {
        title:
          "El Salvador relaunches Chivo wallet, plans to deploy 1,500 Bitcoin ATMs",
        desc: "Seeking a permanent solution for over 4 million BTC users, the government of El Salvador focuses on Chivo wallet’s stability and uptime, scalability and social impact. ",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDEvMmU2ZGExN2ItZTRlMy00ZTM2LTk1OTUtNTc1YTgxZGE0YWJhLmpwZw==.jpg",
        url: "https://cointelegraph.com/news/el-salvador-relaunches-chivo-wallet-plans-to-deploy-1-500-bitcoin-atms",
        date: "Wed, 02 Feb 2022 04:28:09",
        author: "",
      },
      {
        title:
          "Willy Woo: ‘Peak fear,’ but on-chain metrics say it’s not a bear market",
        desc: "“No doubt about it, people are really scared, which is typically [...] an opportunity to buy,” Willy Woo said. ",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvZWQ1ZDMyNmItYmI1OC00ODkzLTk1NjktNGM0YTg0ZWY0OThkLmpwZw==.jpg",
        url: "https://cointelegraph.com/news/willy-woo-peak-fear-but-on-chain-metrics-say-it-s-not-a-bear-market",
        date: "Wed, 02 Feb 2022 02:58:50",
        author: "",
      },
      {
        title:
          "Jack Dorsey: Diem was a waste of time, Meta should’ve focused on BTC ",
        desc: "Dorsey said that although Facebook probably started Diem for “the right reasons,” it should’ve used an open-ended protocol like Bitcoin rather than attempting to create its own currency.",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvNDVkNzdiZWEtMzdmOC00ODBkLTkwMzUtOGVjMmRiNDg2MGUxLmpwZw==.jpg",
        url: "https://cointelegraph.com/news/jack-dorsey-diem-was-a-waste-of-time-meta-should-ve-focused-on-btc",
        date: "Wed, 02 Feb 2022 02:34:03",
        author: "",
      },
      {
        title:
          "Vulcan Forged (PYR) rallies after virtual land sales and the Elysium testnet launch",
        desc: "PYR regained its bullish momentum after the launch of the Elysium testnet and the limited release of digital land plots in the VulcanVerse.",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvNTBmYjE3OGQtYmFlZS00MGM2LWFlYjctZDg5NzZiN2VlNThjLmpwZw==.jpg",
        url: "https://cointelegraph.com/news/vulcan-forged-pyr-rallies-after-virtual-land-sales-and-the-elysium-testnet-launch",
        date: "Wed, 02 Feb 2022 00:30:00",
        author: "",
      },
      {
        title: "3 reasons why QuickSwap (QUICK) price spiked by 50%",
        desc: "QUICK price gained 50% shortly after a partnership with CelsiusX proves that the platform is serious about bridging the gap between DeFi and CeFi. ",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvYjk5MjFhZmEtZDAxNi00MmMwLTk3MDAtYjYxNzlkYzhiZjVhLmpwZw==.jpg",
        url: "https://cointelegraph.com/news/3-reasons-why-quickswap-quick-price-spiked-by-50",
        date: "Tue, 01 Feb 2022 23:15:00",
        author: "",
      },
      {
        title:
          "Bitcoin price closes in on $40K, but pro traders are still skeptical ",
        desc: "Traders expect BTC to flip $40,000 back to support soon, but derivatives metrics signal that a different outcome could occur. ",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvNDkzMDAyYWMtNzA5YS00YWJjLWI3YzktODY2NzIxYjk4YTU2LmpwZw==.jpg",
        url: "https://cointelegraph.com/news/bitcoin-price-closes-in-on-40k-but-pro-traders-are-still-skeptical",
        date: "Tue, 01 Feb 2022 21:45:44",
        author: "",
      },
      {
        title:
          "SEC's proposed rule on exchanges could threaten DeFi, says Crypto Mom",
        desc: "“The proposal includes very expansive language, which, together with the chair’s apparent interest in regulating all things crypto, suggests that it could be used to regulate crypto platforms,” said Hester Peirce.",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvZjYwMmRlOTUtNmNjYy00YzBmLWIyNWYtOGY2NmU5OTNlMmRjLmpwZw==.jpg",
        url: "https://cointelegraph.com/news/sec-s-proposed-rule-on-exchanges-could-threaten-defi-says-crypto-mom",
        date: "Tue, 01 Feb 2022 21:35:00",
        author: "",
      },
      {
        title:
          "NYDIG offering allows participating companies to pay employees in Bitcoin",
        desc: "Patrick Sells, the NYDIG's chief innovation officer, said the Bitcoin payment plan was aimed at letting companies offer a benefits package to prospective employees.",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvMTJiNWVlOTktZDk3Yi00OGQxLWEzYjgtMzQ1ZDIwZGY4NDhjLmpwZw==.jpg",
        url: "https://cointelegraph.com/news/nydig-offering-allows-participating-companies-to-pay-employees-in-bitcoin",
        date: "Tue, 01 Feb 2022 20:45:00",
        author: "",
      },
      {
        title: "First cross-chain governance proposal passes on Aave ",
        desc: '"It\'s a major step forward in multi-chain governance systems," said the team at Aave.  ',
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvNTQ0ZjJkZjMtYzg3YS00NDNkLWJmZWItOTgwZDRjNTgxOWJhLmpwZw==.jpg",
        url: "https://cointelegraph.com/news/first-cross-chain-governance-proposal-passes-on-aave",
        date: "Tue, 01 Feb 2022 20:00:00",
        author: "",
      },
      {
        title:
          "ConsenSys acquires MyCrypto to 'improve the security' of its products",
        desc: "MyCrypto and MetaMask will be combining technology and teams to build the ideal wallet. The terms of the deal were not disclosed. ",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvYzgxZTRiNWEtMjFmNi00NDIyLWFiZGItZmNkNWM4MzY1OTY0LmpwZw==.jpg",
        url: "https://cointelegraph.com/news/consensys-acquires-mycrypto-to-improve-the-security-of-its-products",
        date: "Tue, 01 Feb 2022 19:15:00",
        author: "",
      },
      {
        title:
          "New York gubernatorial candidate calls for moratorium on proof-of-work mining",
        desc: "Politicians and activists have often targeted crypto mining operations around Seneca Lake due to the presence of Greenidge Generation's plant.",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvZTQxNjkyMTAtYWM5Yi00ZjAxLTk4N2EtYmYxNDMwMmFjNmVlLmpwZw==.jpg",
        url: "https://cointelegraph.com/news/new-york-gubernatorial-candidate-calls-for-moratorium-on-proof-of-work-mining",
        date: "Tue, 01 Feb 2022 17:35:00",
        author: "",
      },
      {
        title:
          "NFTs are ‘Stayin’ Alive’ as new minting trends, AI and music-based projects thrive",
        desc: "The shift from gas wars to whitelisting, static PFPs to dynamic music and AI-based projects are all proof that the NFT sector is rapidly evolving in 2022. ",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDEvNmUzZWNlYTYtZTNlZS00OWFhLWFjYmUtMTg4Mjk1MWRjYWU3LmpwZw==.jpg",
        url: "https://cointelegraph.com/news/nfts-are-stayin-alive-as-new-minting-trends-ai-and-music-based-projects-thrive",
        date: "Tue, 01 Feb 2022 17:15:00",
        author: "",
      },
      {
        title:
          "Which play-to-earn games are better than Axie Infinity? | Find out now on The Market Report",
        desc: "In this episode of The Market Report, Cointelegraph resident experts discuss which P2E games could replace Axie Infinity as market leaders. ",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvNDZlN2U4NDAtOTU3NC00MmNmLTk2ZGUtMzhjZDdkZDc5MDcyLmpwZw==.jpg",
        url: "https://cointelegraph.com/news/which-play-to-earn-games-are-better-than-axie-infinity-find-out-now-on-the-market-report",
        date: "Tue, 01 Feb 2022 17:00:00",
        author: "",
      },
      {
        title:
          "$1B worth of ETH burned in the past 30 days due to record high OpenSea NFT transactions",
        desc: "Despite the large burn value, the network is still inflationary until its PoS transition scheduled for Q2 or Q3.  ",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvYjcyODdkODItODcxOS00NGJiLWE0MGYtNGUxNGY2NjQxMTZiLmpwZw==.jpg",
        url: "https://cointelegraph.com/news/1b-worth-of-eth-burned-in-the-past-30-days-due-to-record-high-opensea-nft-transactions",
        date: "Tue, 01 Feb 2022 16:15:00",
        author: "",
      },
      {
        title:
          "Blockchain-based decentralized messengers: A privacy pipedream?",
        desc: " While blockchain messengers stand to mitigate many of the privacy issues posed by their centralized counterparts, they still have their fair share of unignorable issues. ",
        image:
          "https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDIvMzg2OWQxYmItNjNkOS00Mjc4LWFhNDYtNzBjNWJhNzRlYTYyLmpwZw==.jpg",
        url: "https://cointelegraph.com/news/blockchain-based-decentralized-messengers-a-privacy-pipedream",
        date: "Tue, 01 Feb 2022 15:54:25",
        author: "",
      },
    ]);
    // fetch news-snapshot data
    //getNewsSnapshot();
    watchEffect(() => {
      // when news data i fetched
      if (newsSnapshot.value.length) {
        // push one article from each news source
        newsSnapshot.value.forEach((article, index) => {
          if (index < 4) {
            newsData.value.push(article);
          } else {
            return;
          }
        });
      }
    });
    return { newsData, loading, error };
  },
};
</script>

<style scoped></style>

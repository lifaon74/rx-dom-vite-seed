
## List of scrapers

url to scrap: https://www.leboncoin.fr/s/ff8c98f0-achat-maison-ville-la-grand

This url requires :

- browser: true
- poxy_type: residential

another: https://www.seloger.com/immobilier/achat/immo-ville-la-grand-74/bien-maison/

### ScrapingAnt

playground: https://app.scrapingant.com/dashboard

credit cost: https://docs.scrapingant.com/api-credits-usage

|  browser  |  poxy_type  | credits |
|:---------:|:-----------:|:-------:|
|   false   | datacenter  |    1    |
|   false   | residential |   50    |
|   true    | datacenter  |   10    |
|   true    | residential |   250   |

pricing: https://scrapingant.com/#pricing

|   plans    | cost |  credits  | #requests (cost 50) | price/request |
|:----------:|:----:|:---------:|:-------------------:|:-------------:|
|    free    |  0   |  10_000   |         200         |       0       |
| Enthusiast |  19  |  100_000  |        2_000        |    0.0095     |
|  Startup   |  49  |  500_000  |       10_000        |    0.0049     |
|  Business  | 259  | 3_000_000 |       60_000        |    0.0043     |

Feedback => works very well, especially with `{ browser: false, poxy_type: residential}`

### ZenScrape


doc: https://docs.webscrapingapi.com/

playground: https://app.webscrapingapi.com/1/playground

credit cost: https://app.zenscrape.com/documentation#requestCosts

|  browser  |  poxy_type  | credits |
|:---------:|:-----------:|:-------:|
|   false   | datacenter  |    1    |
|   false   | residential |   10    |
|   true    | datacenter  |    5    |
|   true    | residential |   25    |

pricing: https://zenscrape.com/#pricingSection

|    plans     | cost |  credits  | #requests (cost 25) | price/request |
|:------------:|:----:|:---------:|:-------------------:|:-------------:|
|     free     |  0   |   1_000   |         40          |       0       |
|    Small     |  30  |  250_000  |       10_000        |     0.003     |
|    Medium    |  90  | 1_000_000 |       40_000        |    0.00225    |
|    Large     | 200  | 3_000_000 |       120_000       |   0.001667    |
| Professional | 300  | 5_000_000 |       200_000       |    0.0015     |

### WebScrapingApi

doc: https://docs.webscrapingapi.com/webscrapingapi/getting-started/api-parameters

playground: https://app.webscrapingapi.com/1/playground

|  browser  |  poxy_type  | credits |
|:---------:|:-----------:|:-------:|
|   false   | datacenter  |    1    |
|   false   | residential |   25    |
|   true    | datacenter  |    1    |
|   true    | residential |   25    |


pricing: https://www.webscrapingapi.com/pricing/

potentially infinite calls with the key: ub4pE2hrt4PwtxI0sCaCJ62Og24aDTe8  ?

|  plans   | cost |  credits  | #requests (cost 25) | price/request |
|:--------:|:----:|:---------:|:-------------------:|:-------------:|
|   free   |  0   |   5_000   |         200         |       0       |
|  Start   |  25  |  250_000  |       10_000        |    0.0025     |
|   Grow   |  95  | 1_000_000 |       40_000        |   0.002375    |
| Business | 245  | 3_000_000 |       120_000       |     0.002     |


Feedback => not expensive but get blocked often


# js-fb2xlsx
Simple library that use Facebook Graph and SheetJS to generate report about fanpage.

### Quick start
Import library, create new object and call grabInformation() method. As the output you should received binary xlsx file. 
```js
const Crawler = new FbCrawler('APP_ACCESS_TOKEN');
Crawler.grabInformation('FANPAGE_ID');
```

Library dependencies:
```
Axios 0.18.0
XLSX 0.12.6
FileSaver 1.1.20151003
```

### License
```
MIT
```

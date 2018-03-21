# js-fb2xlsx
Export some Facebook fanpage information as xlsx file.
Simple library that use Facebook Graph and few SheetJS to generate report about fanpage.

### Quick start
Import library, create new object and call grabInformation() method. As the output you should received binary xlsx file. 
```
const Crawler = new FbCrawler('APP_ACCESS_TOKEN');
Crawler.grabInformation('FANPAGE_ID');
```

### License
```
MIT
```

class FbCrawler {

    /**
     * Setup
     * @param {string} accessToken Standard access token for an app
     */
    constructor(accessToken) {
        this.accessToken = accessToken;
    }

    /**
     * Gather public available information and save them into xlsx file
     * @param  {String} [fanpageId='Facebook'] Fanpage ID (if verified just type name, otherwise should it be numeric)
     */
    grabInformation (fanpageId = 'Facebook') {
        axios.get(`https://graph.facebook.com/v2.12/${fanpageId}?fields=id,name,location,category,description,fan_count,phone&access_token=${this.accessToken}`).then((response) => {
            this.saveInformation(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }

    /**
     * Prepare worksheet
     * @param  {object} data Parsed JSON object from facebook graph
     */
    saveInformation (data) {
        const workbook = XLSX.utils.book_new();
        workbook.Props = {
            Title: data.name,
            Subject: "Insights Report",
            Author: "FbCrawler"
        };

        if ( !data.hasOwnProperty('location') || !data.location.hasOwnProperty('country') ) {
            data.location = {};
            data.location.country = 'N/A';
            data.location.city = 'N/A';
        }

        workbook.SheetNames.push("Report");
        let worksheetData = [
            ['Name: ' , data.name],
            ['Link: ' , `https://facebook.com/${data.id}`],
            ['Description: ' , data.description],
            ['Category: ' , data.category],
            ['Likes: ' , data.fan_count],
            ['Phone: ' , data.phone],
            ['Location: ' , data.location.country + ', ' + data.location.city],
        ];
        let worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        workbook.Sheets["Report"] = worksheet;
        let wbout = XLSX.write(workbook, {bookType:'xlsx',  type: 'binary'});
        console.log(this.wbout);
        saveAs(
            new Blob([this.saveBinary(wbout)],
            {type:"application/octet-stream"}),
            data.name + '.xlsx'
        );
    }

    /**
     * Save and download
     * @param  {object} blob Raw data of worksheet
     * @return {object} Array buffer (xlsx binary file)
     */
    saveBinary(blob) {
        //convert s to arrayBuffer
        let buf = new ArrayBuffer(blob.length);
        //create uint8array as viewer
        let view = new Uint8Array(buf);
        //convert to octet
        for (let i=0; i<blob.length; i++)
            view[i] = blob.charCodeAt(i) & 0xFF;
        return buf;
    }

}

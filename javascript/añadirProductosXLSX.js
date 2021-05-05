function ingresarXLSX(url) {

   var oReq=new XMLHttpRequest();
   oReq.open("GET",url,true);
   oReq.responseType="arraybuffer";
   oReq.onload=function(e){
       var info=readData();
        console.log(info);
        function readData(){
            var arraybuffer=oReq.response;
            var data=new Uint8Array(arraybuffer);
            var arr=new Array();
            for (var i=0; i!=data.length;i++) arr[i]=String.fromCharCode(data[i]);
            var bstr=arr.join("");
            var workbook=XLSX.read(bstr,{type:"binary"});
            var fisrt_sheet_name=work.SheetNames[0];
            var worksheet=workbook.Sheets[fisrt_sheet_name];
            var info=XLSX.utils.sheet_to_json(worksheet,{raw:true});
            return info;

            
        }
   }
   oReq.send();
}
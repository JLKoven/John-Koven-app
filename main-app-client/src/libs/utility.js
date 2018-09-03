export function isJSON(MyTestStr){
    try {
        var json = JSON.parse(MyTestStr);
        if(typeof(MyTestStr) === 'string'){
          if(MyTestStr.length === 0){
            return false;
          }
        }
    }
    catch(e){
        return false;
    }
    return true;
}

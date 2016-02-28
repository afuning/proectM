/**
 * Created by huning on 16/2/28.
 */
module.exports={
    extend: function(){
        var arges = arguments;
        if(arguments.length<2) return;
        var temp = this.clone(arges[0]);
        for(var n = 1;n<arges.length;n++){
            for(var m in arges[n]){
                temp[m] = arges[n][m];
            }
        }
        return temp;
    },
    clone: function(obj){
        if(obj||typeof obj !=='object') return obj;
        var newObj = new Object();
        for(var i in obj){
            newObj[i] = clone(obj[i]);
            return newObj;
        }
    }
}
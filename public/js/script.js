function quick_search(){
    var content = document.getElementById("search").value;
    if(content == '')
        content = 'dokk';
    
    var call_url = 'https://r6-rest-api.herokuapp.com/api/operators?name=' + content;
    
    jQuery.ajax({
      url: call_url,
      dataType: 'json',
      context: document.body
    }).complete(function(data){
        if(data['status'] == 200){
            var d = jQuery.parseJSON(data['responseText']);
            jQuery('#request_output').text(JSON.stringify(d, null, '\t'));
        }
        else if (data['status'] == 404) {
            jQuery('#request_output').text(data['status'] + ' ' + data['statusText']);
        }
    });
}
    